import Link from 'next/link';
import localFont from 'next/font/local';
import styles from '../styles/nav.module.css';

const tratv = localFont({
  src: '../fonts/TRATV.woff2',
  display: 'swap',
});
const trats = localFont({
  src: '../fonts/TRATS.woff2',
  display: 'swap',
});

export default function Nav() {
  return (
    <aside className={styles.navContainer}>
      <ul className={`${styles.nav} ${trats.className}`}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/listen">Listen</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </aside>
  );
}
