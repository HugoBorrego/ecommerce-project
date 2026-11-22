import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { once } from 'node:events'

test('aplicação compilada: rotas, filtros e API persistente', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'rental-http-test-'))
  const reservation = createServer()
  reservation.listen(0, '127.0.0.1')
  await once(reservation, 'listening')
  const port = reservation.address().port
  await new Promise(resolve => reservation.close(resolve))
  const app = spawn(process.execPath, ['.output/server/index.mjs'], {
    env: { ...process.env, HOST: '127.0.0.1', PORT: String(port), NUXT_REQUESTS_DIR: directory, NUXT_PUBLIC_SITE_URL: 'https://example.test' },
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe']
  })
  let output = ''
  const collect = (data) => {
    output = (output + data.toString()).slice(-3000)
  }
  app.stdout.on('data', collect)
  app.stderr.on('data', collect)
  const base = `http://127.0.0.1:${port}`
  const headers = { 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID() }
  const post = (input, overrides = {}) => fetch(`${base}/api/requests`, { method: 'POST', headers: { ...headers, ...overrides }, body: JSON.stringify(input) })
  try {
    let ready = false
    for (let i = 0; i < 50; i++) {
      try {
        ready = (await fetch(base)).ok
      } catch {
        // O processo ainda pode estar iniciando.
      }
      if (ready) break
      if (app.exitCode !== null) throw new Error(`Servidor encerrou: ${output}`)
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    assert.equal(ready, true, `Servidor não iniciou: ${output}`)

    await t.test('páginas válidas têm idioma, título e descrição', async () => {
      for (const path of ['/', '/vehicles', '/vehicles/1', '/about', '/contact', '/gallery', '/blog', '/faq', '/privacy']) {
        const response = await fetch(base + path)
        assert.equal(response.status, 200, path)
        const html = await response.text()
        assert.match(html, /<html[^>]*lang="pt-BR"/, path)
        assert.match(html, /<title>[^<]+<\/title>/, path)
        assert.match(html, /name="description"/, path)
        assert.doesNotMatch(html, /<uicon[ >]/i, path)
      }
    })

    await t.test('query string filtra no HTML do servidor', async () => {
      const html = await (await fetch(`${base}/vehicles?type=suv`)).text()
      assert.equal((html.match(/<article[ >]/g) || []).length, 2)
      const empty = await (await fetch(`${base}/vehicles?type=pickup`)).text()
      assert.equal((empty.match(/<article[ >]/g) || []).length, 0)
    })

    await t.test('veículos ausentes e IDs malformados retornam 404 HTML', async () => {
      for (const path of ['/vehicles/999', '/vehicles/abc', '/vehicles/1e0', '/missing-page']) {
        const response = await fetch(base + path, { headers: { Accept: 'text/html' } })
        assert.equal(response.status, 404)
        assert.match(await response.text(), /Página não encontrada/)
      }
    })

    await t.test('sitemap e robots usam o domínio configurado', async () => {
      assert.match(await (await fetch(`${base}/robots.txt`)).text(), /https:\/\/example.test\/sitemap.xml/)
      const sitemap = await fetch(`${base}/sitemap.xml`)
      assert.equal(sitemap.status, 200)
      assert.equal(((await sitemap.text()).match(/<loc>/g) || []).length, 14)
    })

    await t.test('entrada inválida e origem externa são rejeitadas sem persistência', async () => {
      const body = { kind: 'newsletter', email: 'test@example.com', consent: false }
      assert.equal((await post(body)).status, 400)
      assert.equal((await post({ ...body, consent: true }, { Origin: 'https://other.example' })).status, 403)
      assert.equal((await post({ ...body, email: 'x'.repeat(13000) })).status, 413)
      assert.equal((await readdir(directory)).length, 0)
    })

    await t.test('inscrição persiste e repetição não duplica; alterações geram conflito', async () => {
      const body = { kind: 'newsletter', email: 'test@example.com', consent: true }
      const first = await post(body)
      assert.equal(first.status, 201)
      const receipt = await first.json()
      assert.equal((await (await post(body)).json()).id, receipt.id)
      assert.equal((await readdir(directory)).length, 1)
      assert.equal((await post({ ...body, email: 'other@example.com' })).status, 409)
    })

    await t.test('orçamento exige carro válido e ignora preço fornecido pelo cliente', async () => {
      const rentalDate = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10)
      const returnDate = new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10)
      const body = { kind: 'quote', name: 'Teste local', email: 'test@example.com', vehicleId: 1, rentalPlace: 'São Paulo', returnPlace: 'São Paulo', rentalDate, returnDate, consent: true, price: 0 }
      assert.equal((await post({ ...body, vehicleId: 999 })).status, 400)
      assert.equal((await post({ ...body, returnDate: rentalDate })).status, 400)
      const response = await post(body, { 'Idempotency-Key': randomUUID() })
      assert.equal(response.status, 201)
      const receipt = await response.json()
      const record = JSON.parse(await readFile(join(directory, `${receipt.id}.json`), 'utf8'))
      assert.equal('price' in record.input, false)
      assert.equal(record.input.vehicleId, 1)
    })

    await t.test('mensagem de contato é registrada', async () => {
      const response = await post({ kind: 'contact', name: 'Teste local', email: 'test@example.com', subject: 'Dúvida de teste', message: 'Mensagem sintética para validar o formulário.', consent: true }, { 'Idempotency-Key': randomUUID() })
      assert.equal(response.status, 201)
      assert.equal((await readdir(directory)).length, 3)
    })
  } finally {
    if (app.exitCode === null) {
      const closed = once(app, 'exit')
      app.kill()
      await closed
    }
    assert.equal(directory.startsWith(join(tmpdir(), 'rental-http-test-')), true)
    await rm(directory, { recursive: true, force: true })
  }
})
