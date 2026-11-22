import { readdir, readFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'

const directory = resolve(process.env.NUXT_REQUESTS_DIR || '.data/requests')
const files = await readdir(directory).catch((error) => {
  if (error.code === 'ENOENT') return []
  throw error
})
const records = await Promise.all(files.filter(file => file.endsWith('.json')).map(async file => JSON.parse(await readFile(join(directory, file), 'utf8'))))
console.table(records.map(record => ({ protocolo: record.id, data: record.createdAt, tipo: record.input.kind })))
console.log(`${records.length} registro(s). Conteúdo privado disponível nos arquivos do diretório configurado.`)
