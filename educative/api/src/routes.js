import express from 'express'
import pool from './database.js'

import path from 'path'
const __dirname = path.resolve()

let entities = []
const columns = {}

pool.query('SHOW TABLES WHERE tables_in_mineduc!="massive"', (_, results) => {
  entities = results.map((result) => Object.values(result)[0])
  entities.forEach((entity) => {
    pool.query(
      `SHOW columns FROM ${entity} WHERE Field!="id"`,
      (_, results) => {
        columns[entity] = results.map((result) => result.Field)
      }
    )
  })
})

function appRouter(app) {
  const dir = path.join(__dirname, '../build')
  app.use('/', express.static(dir))

  app.get(
    '/api/:entity([a-z]+)&?(limit=:limit(\\d+))?&?(offset=:offset(\\d+))?',
    (request, response) => {
      let { entity, limit, offset } = request.params
      limit ||= 100
      offset ||= 0

      if (!entities.includes(entity)) {
        return response.status(404).send('Entidad no reconocida')
      }

      const keys = columns[entity]
        .filter((key) => key.startsWith('id_'))
        .map((key) => key.substring(3))

      const query = `SELECT entity.*${keys.length ? ',' : ''} ${keys
        .map((key) => `${key}.nombre ${key}`)
        .join(', ')}
      FROM ${entity} entity
      ${keys
        .map((key) => `INNER JOIN ${key} ON ${key}.id=entity.id_${key}`)
        .join('\n')}
      LIMIT ${limit}
      OFFSET ${offset}`

      pool.query(query, (_, results) => {
        response.send(results)
      })
    }
  )

  app.get('/api/:entity([a-z]+)/:id(\\d+)', (request, response) => {
    const { entity, id } = request.params
    if (!entities.includes(entity)) {
      return response.status(404).send('Entidad no reconocida')
    }

    pool.query(`SELECT * FROM ${entity} WHERE id=?`, [id], (_, results) => {
      const data = results[0] || {}
      response.send(data)
    })
  })

  app.post('/api/:entity([a-z]+)', (request, response) => {
    const { entity } = request.params

    if (!entities.includes(entity)) {
      return response.status(404).send('Entidad no reconocida')
    }

    const keys = Object.keys(request.body).map((key) =>
      entities.includes(key) ? `id_${key}` : key
    )
    const values = Object.values(request.body)

    if (
      !columns[entity].every(
        (column) => keys.includes(column) || keys.includes(column.substring(3))
      ) ||
      values.some((value) => !value)
    ) {
      return response.status(400).send('Faltan valores para crear el recurso')
    }

    const query = `INSERT INTO ${entity}
    (${keys.join(', ')})
    VALUES
    (${keys
      .map((key) =>
        key.startsWith('id_')
          ? `(SELECT id FROM ${key.substring(3)} WHERE nombre=?)`
          : '?'
      )
      .join(',\n')})`

    pool.query(query, values, (error, results) => {
      if (error) {
        return response.status(500).send(error)
      }
      response.status(201).send({ id: results.insertId })
    })
  })

  app.delete('/api/:entity([a-z]+)/:id', (request, response) => {
    const { entity, id } = request.params
    if (!entities.includes(entity)) {
      return response.status(404).send('Entidad no reconocida')
    }

    pool.query(`DELETE FROM ${entity} WHERE id=?`, [id], (error, results) => {
      if (error) {
        return response.status(500).send(error)
      }
      response.status(200).end()
    })
  })

  app.put('/api/:entity([a-z]+)/:id', (request, response) => {
    const { entity, id } = request.params
    if (!entities.includes(entity)) {
      return response.status(404).send('Entidad no reconocida')
    }

    const keys = Object.keys(request.body)
      .filter((key) => request.body[key])
      .map((key) => (entities.includes(key) ? `id_${key}` : key))
    const values = Object.entries(request.body)
      .filter(([key, value]) =>
        keys.includes(entities.includes(key) ? `id_${key}` : key)
      )
      .map(([key, value]) => value)

    if (!values.length || values.every((value) => !value)) {
      return response.status(400).send('Ningún valor para actualizar')
    }

    const query = `UPDATE ${entity} SET
      ${keys
        .map(
          (key) =>
            `${key}=${
              key.startsWith('id_')
                ? `(SELECT id FROM ${key.substring(3)} WHERE nombre=?)`
                : '?'
            }`
        )
        .join(',\n')}
      WHERE id=?`

    pool.query(query, [...values, id], (error, results) => {
      if (error) {
        return response.status(500).send(error)
      }
      response.status(200).end()
    })
  })
}

export default appRouter
