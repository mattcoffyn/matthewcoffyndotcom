'use client';

import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';
import styles from '@/components/header.module.css';

const trats = localFont({
  src: '../fonts/TRATS.woff2',
  display: 'swap',
});

export default function Header() {
  const pathname = usePathname();

  if (pathname == '/')
    return (
      <header className={`${styles.homeHeader} ${trats.className}`}>
        <h1>Matthew Coffyn</h1>
        <h2>Film Composer | Sound Creative</h2>
      </header>
    );

  return (
    <header className={`${styles.mainHeader} ${trats.className}`}>
      {pathname.substring(1)}
    </header>
  );
}
