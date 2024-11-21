import localFont from 'next/font/local';
import { Golos_Text } from 'next/font/google';

import styles from './contact.module.css';

const trats = localFont({
  src: '../../fonts/TRATS.woff2',
  display: 'swap',
});

const sans = Golos_Text({ subsets: ['latin'] });

export default function Contact() {
  return (
    <section className={`${styles.contactGrid} ${trats.className}`}>
      <div className={`${styles.email} ${sans.className}`}>
        <h2 className={trats.className}>Email</h2>
        <p>
          If you&#39;d like to discuss a potential project, hear more music or
          just have a chat (I&#39;d love that), drop me an email and I&#39;ll
          get back to you ASAP
        </p>
        <a
          href="mailto:hello@matthewcoffyn.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          hello@matthewcoffyn.com
        </a>
      </div>
      <div className={`${styles.links} ${sans.className}`}>
        <h2 className={trats.className}>Socials</h2>
        <p>
          You can also find me on socials so feel free to reach out or follow me
          here.
        </p>
        <ul>
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
      </div>
    </section>
  );
}
