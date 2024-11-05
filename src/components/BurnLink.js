import Link from 'next/link';
import { useState } from 'react';
import styles from './nav.module.css';

export default function BurnLink({ text, slug }) {
  const [burn, setBurn] = useState(0);

  const burnOut = (e) => {
    setBurn(1);
  };

  const resetBurn = (e) => {
    setBurn(0);
  };
  return (
    <li
      className={styles.navItem}
      onMouseEnter={(e) => {
        resetBurn(e);
      }}
    >
      <Link
        href={slug}
        className={`${styles.navLink} ${burn ? styles.burnout : ``}`}
        onClick={(e) => {
          burnOut(e);
        }}
      >
        {text}
      </Link>
    </li>
  );
}
