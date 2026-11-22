import { validateSubmission } from '../../features/Requests/domain/validation'
import { getCarById } from '../../features/Vehicles/domain/catalog'
import { storeRequest, RequestConflictError } from '../services/requestStore'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')
  const origin = getRequestHeader(event, 'origin')
  if (origin && origin !== getRequestURL(event).origin) throw createError({ statusCode: 403, message: 'Origem não permitida.' })
  if (!getRequestHeader(event, 'content-type')?.startsWith('application/json')) throw createError({ statusCode: 415, message: 'Envie a solicitação em JSON.' })
  if (Number(getRequestHeader(event, 'content-length')) > 12 * 1024) throw createError({ statusCode: 413, message: 'Solicitação muito grande.' })
  const rawBody = await readRawBody(event)
  if (!rawBody || Buffer.byteLength(rawBody) > 12 * 1024) throw createError({ statusCode: 413, message: 'Solicitação vazia ou muito grande.' })
  const id = getRequestHeader(event, 'idempotency-key') ?? ''
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw createError({ statusCode: 400, message: 'Identificador de solicitação inválido.' })
  let input
  try {
    input = validateSubmission(JSON.parse(rawBody))
    if (input.kind === 'quote' && !getCarById(input.vehicleId)) throw new Error('O veículo selecionado não existe.')
  } catch (error) {
    throw createError({ statusCode: 400, message: error instanceof Error ? error.message : 'Verifique os campos informados.' })
  }
  try {
    const receipt = await storeRequest(useRuntimeConfig(event).requestsDir, id, input)
    setResponseStatus(event, 201)
    return receipt
  } catch (error) {
    if (error instanceof RequestConflictError) throw createError({ statusCode: 409, message: error.message })
    console.error('[requests] Não foi possível persistir a solicitação.')
    throw createError({ statusCode: 503, message: 'O envio está temporariamente indisponível. Tente novamente mais tarde.' })
  }
})
