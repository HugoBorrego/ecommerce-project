import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { storeRequest, RequestConflictError } from '../server/services/requestStore.ts'

test('solicitação é persistida e tentativas concorrentes não duplicam o registro', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'rental-request-test-'))
  try {
    const id = randomUUID()
    const input = { kind: 'newsletter' as const, email: 'test@example.com', consent: true }
    const receipts = await Promise.all(Array.from({ length: 5 }, () => storeRequest(directory, id, input)))
    assert.equal(receipts.every(receipt => receipt.id === id), true)
    assert.deepEqual(await readdir(directory), [`${id}.json`])
    const record = JSON.parse(await readFile(join(directory, `${id}.json`), 'utf8'))
    assert.equal(record.input.email, 'test@example.com')
    await assert.rejects(() => storeRequest(directory, id, { ...input, email: 'different@example.com' }), RequestConflictError)
  } finally {
    assert.equal(directory.startsWith(join(tmpdir(), 'rental-request-test-')), true)
    await rm(directory, { recursive: true, force: true })
  }
})
