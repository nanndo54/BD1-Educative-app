import styles from '../styles/App.module.css'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import ResultsTable from './ResultsTable'
import Form from './Form'

function App() {
  const { entity } = useSelector(({ app }) => app)

  return (
    <div className={styles.base}>
      <Sidebar />
      <div className={styles.content}>
        <h2>{entity}</h2>
        {entity ? (
          <>
            <Form />
            <ResultsTable />
          </>
        ) : (
          <p>Selecciona una entidad para comenzar</p>
        )}
      </div>
    </div>
  )
}

export default App
