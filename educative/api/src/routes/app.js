import express from 'express'
import pool from '../database.js'

import path from 'path'
const __dirname = path.resolve()

function appRouter(app) {
  const dir = path.join(__dirname, '../build')
  console.log(dir)
  app.use('/', express.static(dir))

  app.get('/api', (req, res) => {
    pool.query('SELECT 2+2', [], (error, results) => {
      console.log(error)
      console.log(results)
      res.send({ response: 'Hello!' })
    })
  })
}

export default appRouter
