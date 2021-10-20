import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import dotenv from 'dotenv'
import appRouter from './app'
dotenv.config()

const app = express()
app.set('port', process.env.PORT)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

appRouter(app)

async function listen() {
  const listener = await app.listen(app.get('port'))
  const { address, port } = listener.address()

  console.log(`Server running on http://${address}:${port}`)

  function close() {
    console.log('Closing http server.')
    listener.close((err) => {
      console.log('Http server closed.')
      process.exit(err ? 1 : 0)
    })
  }

  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.')
    close()
  })

  process.on('SIGINT', () => {
    console.info('SIGINT signal received.')
    close()
  })

  process.on('SIGKILL', () => {
    console.info('SIGINT signal received.')
    close()
  })
}

listen()
