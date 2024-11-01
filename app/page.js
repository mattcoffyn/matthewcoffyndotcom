import localFont from 'next/font/local';
import Image from 'next/image';
import Nav from './components/Nav.js';
import banner from '../public/bannernotext.jpg';
import styles from './styles/home.module.css';

const drogz = localFont({
  src: './fonts/Drogowskaz.woff2',
  display: 'swap',
});

const trats = localFont({
  src: './fonts/TRATS.woff2',
  display: 'swap',
});

export default function Page() {
  return (
    <div className={styles.bgWrap}>
      <Image
        alt="Banner"
        src={banner}
        placeholder="blur"
        quality={100}
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: 'cover',
        }}
      />

      <Nav />

      <section className={`${styles.title} ${trats.className}`}>
        <h1>Matthew Coffyn</h1>
        <h2>Film Composer | Audio Designer</h2>
        <ul>
          <li>
            <a
              href="mailto:hello@matthewcoffyn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              hello@matthewcoffyn.com
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@matthewcoffyn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@matthewcoffyn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@matthewcoffyn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              twitter
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@matthewcoffyn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              imdb
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
