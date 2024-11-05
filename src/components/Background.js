'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
// import powerlines from '../../public/powerlinessmaller.jpg';
// import lynchburg from '../../public/lynchburg.png';
import styles from './background.module.css';

export default function Background() {
  const pathname = usePathname();
  if (pathname == '/') {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
        }}
      >
        <Image
          className={styles.fadeIn}
          alt="Image of dark sky behind power lines"
          src="https://res.cloudinary.com/dsjs9ozws/image/upload/v1730804669/mattcoffyndotcom/images/sj64aikkomsxifol0ncs.jpg"
          placeholder="blur"
          quality={75}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      </div>
    );
  }
  // if (pathname == '/about') {
  //   return <div className="backgroundTest" />;
  // }
  // if (pathname == '/listen') {
  //   return (
  //     <Image
  //       className={styles.fadeIn}
  //       alt="Black & white image of Lynchburg, Tennessee"
  //       src={lynchburg}
  //       placeholder="blur"
  //       quality={75}
  //       fill
  //       priority
  //       sizes="100vw"
  //       style={{
  //         objectFit: 'cover',
  //         zIndex: 0,
  //       }}
  //     />
  //   );
  // }
}
