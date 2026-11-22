import { mkdir, readFile, writeFile, link, unlink } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { createHash, randomUUID } from 'node:crypto'
import type { SubmissionInput, SubmissionReceipt } from '../../features/Requests/types/submission'

export class RequestConflictError extends Error {}

export async function storeRequest(directory: string, id: string, input: SubmissionInput): Promise<SubmissionReceipt> {
  const folder = resolve(directory)
  await mkdir(folder, { recursive: true })
  const path = join(folder, `${id}.json`)
  const fingerprint = createHash('sha256').update(JSON.stringify(input)).digest('hex')
  const messages = {
    quote: 'Solicitação de orçamento registrada. Isso não confirma uma reserva; disponibilidade e condições ainda precisam ser verificadas.',
    contact: 'Mensagem registrada com sucesso. Guarde seu protocolo para referência.',
    newsletter: 'Inscrição registrada. Você autorizou o recebimento de novidades por e-mail.'
  }
  const receipt = { id, message: messages[input.kind] }
  const temporaryPath = join(folder, `.${randomUUID()}.tmp`)
  try {
    await writeFile(temporaryPath, JSON.stringify({ id, createdAt: new Date().toISOString(), fingerprint, input, receipt }, null, 2), { flag: 'wx', mode: 0o600 })
    // Publicação atômica: outro envio nunca lê um JSON ainda sendo escrito.
    await link(temporaryPath, path)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
    const existing = JSON.parse(await readFile(path, 'utf8')) as { fingerprint: string, receipt: SubmissionReceipt }
    if (existing.fingerprint !== fingerprint) throw new RequestConflictError('O protocolo já foi usado para outra solicitação. Atualize a página e tente novamente.')
    return existing.receipt
  } finally {
    await unlink(temporaryPath).catch(() => {})
  }
  return receipt
}
