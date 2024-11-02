'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import powerlines from '../../public/powerlines.jpg';
// import lynchburg from '../../public/lynchburg.png';
import styles from '../styles/background.module.css';

export default function Background() {
  const pathname = usePathname();
  if (pathname == '/') {
    return (
      <Image
        className={styles.fadeIn}
        alt="Image of dark sky behind power lines"
        src={powerlines}
        placeholder="blur"
        quality={75}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
    );
  }
  // if (pathname == '/about') {
  //   return (
  //     <Image
  //       className={styles.fadeIn}
  //       alt="Black & white image of Lynchburg, Tennessee"
  //       src={lynchburg}
  //       placeholder="blur"
  //       quality={100}
  //       fill={true}
  //       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //       style={{
  //         objectFit: 'cover',
  //         zIndex: 0,
  //       }}
  //     />
  //   );
  // }
}
