import axios from 'axios'
import styles from '../styles/ResultsTable.module.css'
import { useEffect, useState } from 'react'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { selectIndex, setData, setHeaders, setMode } from '../slices/appSlice'

import { URL } from '../constants'

function ResultsTable() {
  const [columns, setColumns] = useState([])

  const dispatch = useDispatch()
  const { mode, entity, headers, data } = useSelector(({ app }) => app)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${URL}/${entity}`)
      const data = response.data

      const headers = Object.keys(data[0]).filter(
        (header) => !header.startsWith('id')
      )
      const columns = headers.map((header) => ({
        Header: header,
        accessor: header
      }))

      dispatch(setHeaders(headers))
      dispatch(setData(data))
      setColumns(columns)
    }

    fetchData()

    return () => {
      dispatch(setHeaders([]))
      setColumns([])
      setData([])
    }
  }, [entity])

  const handleSelectRow = (i) => {
    if (mode === 'updating') {
      dispatch(setMode(''))
    }

    dispatch(selectIndex(i))
    dispatch(setMode('updating'))
  }

  return (
    <div className={styles.base}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={() => handleSelectRow(i)}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ResultsTable
