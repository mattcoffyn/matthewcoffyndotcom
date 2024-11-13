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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam odio
        quam, condimentum tincidunt eleifend ac, sagittis vitae dui. Fusce in
        eleifend augue. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Donec sit amet commodo leo, at pretium
        eros. <br />
        <br />
        Nullam ac sollicitudin nibh, eget tincidunt tortor. Integer et
        condimentum mi. Pellentesque non urna leo. Aliquam sed nisl vel orci
        ultricies consequat. Phasellus tincidunt vel orci nec interdum. Quisque
        bibendum condimentum sapien at pulvinar. In eget tellus malesuada,
        pellentesque dolor eu, malesuada turpis. Ut lobortis vulputate felis,
        quis blandit nisl dignissim porttitor. Cras malesuada in mi vel
        eleifend. Vestibulum pulvinar odio libero, in efficitur urna faucibus
        at. Aliquam vestibulum magna id mauris luctus, vitae bibendum neque
        tincidunt. Suspendisse quis varius nulla. Donec et gravida magna. Ut
        tellus nisi, placerat ac dolor ac, vehicula sodales neque. Phasellus
        facilisis augue sit amet velit blandit, vitae molestie est pretium.
        Integer mauris orci, rutrum ut ultricies ut, posuere at nisl. Duis
        porttitor mauris a hendrerit lobortis. <br />
      </div>
    </section>
  );
}
