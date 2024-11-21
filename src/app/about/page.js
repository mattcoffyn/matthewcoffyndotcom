import Image from 'next/image';
import localFont from 'next/font/local';
import { Golos_Text } from 'next/font/google';

import profilePhoto from '/public/profile2.jpg';
import styles from './about.module.css';

const threetwo = localFont({
  src: '../../fonts/3270Medium.woff2',
  display: 'swap',
});

const trats = localFont({
  src: '../../fonts/TRATS.woff2',
  display: 'swap',
});

const tratv = localFont({
  src: '../../fonts/TRATV.woff2',
  display: 'swap',
});

const droge = localFont({
  src: '../../fonts/W-Droge-Itinerary.woff',
  display: 'swap',
});

const drogo = localFont({
  src: '../../fonts/Drogowskaz.woff2',
  display: 'swap',
});

const fluxischeBold = localFont({
  src: '../../fonts/FluxischElse-Bold.woff2',
  display: 'swap',
});

const fluxischeReg = localFont({
  src: '../../fonts/FluxischElse-Regular.woff2',
  display: 'swap',
});

const fluxischeLight = localFont({
  src: '../../fonts/FluxischElse-Light.woff2',
  display: 'swap',
});

const sans = Golos_Text({ subsets: ['latin'] });

export default function About() {
  return (
    <section className={`${styles.aboutGrid}`}>
      <div className={styles.imageContainer}>
        <div className={styles.hallucinationEffect}></div>
        <Image
          className={styles.image}
          alt="A picture of Matt looking kinda cool but admittedly quite moody."
          src={profilePhoto}
          sizes="50vw"
          priority
        />
      </div>

      <div className={`${styles.bio} ${fluxischeLight.className}`}>
        <p>
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
        </p>
      </div>
    </section>
  );
}
