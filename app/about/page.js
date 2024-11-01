import localFont from 'next/font/local';
import ProfilePhoto from '../components/ProfilePhoto';
import styles from '../styles/about.module.css';

const trats = localFont({
  src: '../fonts/TRATS.woff2',
  display: 'swap',
});

const sans = localFont({
  src: '../fonts/SwedenSansBook.woff2',
  display: 'swap',
});

export default function About() {
  return (
    <section className={`${styles.aboutGrid} ${trats.className}`}>
      <h1 className={styles.title}>About</h1>
      <ProfilePhoto />
      <div className={`${styles.bio} ${sans.className}`}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus
        velit ea quis nulla possimus laboriosam laudantium ratione inventore rem
        perferendis voluptate eveniet, repellat delectus amet natus mollitia
        blanditiis maxime quos!
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente autem
        sit sint odio eaque nulla obcaecati architecto! Recusandae mollitia
        explicabo amet ullam consequatur consectetur, modi quas fuga, placeat
        maiores deleniti!
      </div>
    </section>
  );
}
