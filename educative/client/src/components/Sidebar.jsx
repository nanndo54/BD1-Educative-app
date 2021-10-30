import styles from '../styles/Sidebar.module.css'
import { useDispatch } from 'react-redux'
import Button from './Button'
import { setEntity, setMode } from '../slices/appSlice'

const entities = [
  'region',
  'departamento',
  'municipio',
  'apertura',
  'estado',
  'estatuto',
  'genero',
  'horario',
  'lengua',
  'nivel',
  'rol',
  'ubicacion',
  'establecimiento'
]

function Sidebar() {
  const dispatch = useDispatch()

  return (
    <div className={styles.base}>
      <div className={styles.logo}>CRUD System</div>
      <div className={styles.menu}>
        {entities.map((entity) => (
          <Button
            primary
            key={entity}
            onClick={() => {
              dispatch(setEntity(entity))
              dispatch(setMode(''))
            }}
          >
            {entity}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
