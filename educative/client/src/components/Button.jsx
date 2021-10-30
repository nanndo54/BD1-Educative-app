import styles from '../styles/Button.module.css'

function Button({ children, onClick, primary, warn }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.base} ${warn ? styles.warn : ''} ${
        primary ? styles.primary : ''
      }`}
    >
      {children}
    </button>
  )
}

export default Button
