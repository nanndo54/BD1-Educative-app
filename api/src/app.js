import configureDatabase from './database.js'

function appRouter(app) {
  const pool = configureDatabase()

  app.get('/', (req, res) => {
    res.send({ response: 'Hello!' })
  })

  app.get('/test', (req, res) => {
    pool.query('SELECT 2+2', [], (error, results) => {
      console.log(error)
      console.log(results)
      res.send({ response: 'Hello!' })
    })
  })
}

export default appRouter