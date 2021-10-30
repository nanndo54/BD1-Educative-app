import styles from '../styles/Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import axios from 'axios'

import { URL } from '../constants'
import { appendData, deleteData, setMode, updateData } from '../slices/appSlice'

function InsertForm() {
  const dispatch = useDispatch()
  const { mode, entity, headers, data, selectedIndex } = useSelector(
    ({ app }) => app
  )

  const selectedRow = data[selectedIndex] || {}

  const handleInsert = (e) => {
    e.preventDefault()

    async function insertItem() {
      const row = {}
      headers.forEach((header, i) => (row[header] = e.target[i].value))
      console.log(row)

      const result = await axios.post(`${URL}/${entity}`, row)
      if (result.status === 201) {
        const newData = { ...result.data, ...row }
        dispatch(appendData(newData))
        dispatch(setMode(''))
      }
    }

    insertItem()
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    async function updateItem() {
      const { id } = selectedRow

      const row = {}
      headers.forEach((header, i) => (row[header] = e.target[i].value))

      const result = await axios.put(`${URL}/${entity}/${id}`, row)
      if (result.status === 200) {
        dispatch(updateData(row))
        dispatch(setMode(''))
      }
    }

    updateItem()
  }

  const handleDelete = (e) => {
    e.preventDefault()

    async function deleteItem() {
      const { id } = selectedRow

      const result = await axios.delete(`${URL}/${entity}/${id}`)
      if (result.status === 200) {
        dispatch(deleteData())
        dispatch(setMode(''))
      }
    }

    deleteItem()
  }

  const toggleInserting = () => {
    dispatch(setMode(mode ? '' : 'inserting'))
  }

  return (
    <div className={styles.base}>
      {mode ? (
        <Button onClick={toggleInserting}>Cancelar</Button>
      ) : (
        <Button primary onClick={toggleInserting}>
          Nuevo elemento
        </Button>
      )}
      {
        {
          inserting: (
            <form onSubmit={handleInsert}>
              {headers.map((name) => (
                <div key={name}>
                  <label htmlFor={name}>{name}:</label>
                  <input name={name} placeholder={`Nuevo ${name}`} />
                </div>
              ))}
              <div className={styles.buttons}>
                <Button primary>Crear</Button>
              </div>
            </form>
          ),
          updating: (
            <form onSubmit={handleUpdate}>
              {headers.map((name) => (
                <div key={name}>
                  <label htmlFor={name}>{name}:</label>
                  <input name={name} placeholder={selectedRow[name]} />
                </div>
              ))}
              <div className={styles.buttons}>
                <Button warn onClick={handleDelete}>
                  Eliminar
                </Button>
                <Button primary>Actualizar</Button>
              </div>
            </form>
          )
        }[mode]
      }
    </div>
  )
}

export default InsertForm
