import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Site Title</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <i className="ri-home-line" /> Home
            </li>
            <li className={styles.navItem}>
              <i className="ri-newspaper-line" /> News
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}