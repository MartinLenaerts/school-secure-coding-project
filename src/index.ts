import {FASTIFY_ADDR, FASTIFY_PORT} from './lib/dotenv'
import {server} from './lib/fastify'
import {dataSource} from './lib/datasource'

async function run() {
    await dataSource.initialize()
    await server.listen({port: FASTIFY_PORT, host: FASTIFY_ADDR})
}

run().catch(console.error)