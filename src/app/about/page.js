import Image from 'next/image';
import localFont from 'next/font/local';
import { Golos_Text } from 'next/font/google';

import profilePhoto from '/public/profile2.jpg';
import styles from './aboutAlt.module.css';

const trats = localFont({
  src: '../../fonts/TRATS.woff2',
  display: 'swap',
});

const sans = Golos_Text({ subsets: ['latin'] });

export default function About() {
  return (
    <section className={`${styles.aboutGrid} ${trats.className}`}>
      <h1 className={styles.title}>About</h1>
      <div className={styles.aboutContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.hallucinationEffect}>
            <Image
              className={styles.image}
              alt="A picture of Matt looking kinda cool but admittedly quite moody."
              src={profilePhoto}
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className={`${styles.bio} ${sans.className}`}>
          Matthew is a multi-instrumentalist, composer & sound designer working
          mostly in film and television. A saxophonist from a young age, his
          creative focus has evolved over a lifetime in the music industry that
          has honed his sound everywhere from tiny DIY squats and the Royal
          Albert Hall.
          <br />
          <br />
          After years on the road with his own bands and solo projects, as well
          as live & studio session work, he transitioned into tour management
          while he took time off performing to re-discover his love of
          experimentation in synthesising and augmenting audio as creative
          expression.
          <br />
          <br />
          With no prior formal training, he went on to obtain an MA in Media
          Composition leading him to further develop his focus on creating
          sounds and music reflecting those deep textural emotions underpinning
          the human experience; uncovering the core sound of the internal state
          where expression, desire, discomfort, tension and release reside.
          <br />
        </div>
      </div>
    </section>
  );
}
