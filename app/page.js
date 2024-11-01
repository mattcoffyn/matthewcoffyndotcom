import localFont from 'next/font/local';
import styles from './styles/home.module.css';

// const drogz = localFont({
//   src: './fonts/Drogowskaz.woff2',
//   display: 'swap',
// });

const trats = localFont({
  src: './fonts/TRATS.woff2',
  display: 'swap',
});

export default function Page() {
  return (
    <section className={`${styles.home} ${trats.className}`}>
      <div className={styles.header}>
        <h1>Matthew Coffyn</h1>
        <h2>Film Composer | Audio Designer</h2>
      </div>
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
  );
}
