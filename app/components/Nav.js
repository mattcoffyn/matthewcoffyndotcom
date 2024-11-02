'use client';

import localFont from 'next/font/local';
import BurnLink from './BurnLink';
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
    <aside className={`${styles.navContainer} ${trats.className}`}>
      <ul className={styles.nav}>
        <BurnLink
          text="Home"
          slug="/"
        />
        <BurnLink
          text="About"
          slug="/about"
        />
        <BurnLink
          text="Listen"
          slug="/listen"
        />
        <BurnLink
          text="Contact"
          slug="/contact"
        />
      </ul>
    </aside>
  );
}
