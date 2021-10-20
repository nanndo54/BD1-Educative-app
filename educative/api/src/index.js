import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import appRouter from './routes/app.js'

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

  function close(signal) {
    console.info(`${signal} signal received`)
    console.log('Closing http server')
    listener.close((err) => {
      console.log('Http server closed')
      process.exit(err ? 1 : 0)
    })
  }

  process.on('SIGTERM', () => {
    close('SIGTERM')
  })

  process.on('SIGINT', () => {
    close('SIGINT')
  })
}

listen()
