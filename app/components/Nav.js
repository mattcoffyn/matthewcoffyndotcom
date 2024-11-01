'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import { useState } from 'react';
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
  const [burn, setBurn] = useState(0);

  const burnOut = (e) => {
    // e.target.classList.add(`${styles.burnout}`);
    setBurn(1);
    // setTimeout(() => {
    //   setBurn(0);
    // }, 1000);
  };

  const resetBurn = (e) => {
    setBurn(0);
    console.log('Mouse Enter');
    // e.target.classList.remove(`${styles.burnout}`);
  };

  return (
    <aside
      className={styles.navContainer}
      onMouseEnter={(e) => {
        resetBurn(e);
      }}
    >
      <ul className={`${styles.nav} ${trats.className}`}>
        <li className={`${styles.navItem} `}>
          <Link href="/">Home</Link>
        </li>
        <li
          className={`${styles.navItem} ${burn ? styles.burnout : ''} `}
          onClick={(e) => {
            burnOut(e);
          }}
        >
          <Link href="/about">About</Link>
        </li>
        <li className={`${styles.navItem} `}>
          <Link href="/listen">Listen</Link>
        </li>
        <li className={`${styles.navItem} `}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </aside>
  );
}
