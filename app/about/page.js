import Image from 'next/image';
import localFont from 'next/font/local';
import profilePhoto from '../../public/profile2.jpg';
import styles from './about.module.css';

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
      <Image
        className={styles.image}
        alt="A picture of Matt looking kinda cool but admittedly quite moody."
        src={profilePhoto}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
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
        <br />
        Morbi imperdiet bibendum massa, nec varius ligula pellentesque
        ullamcorper. Ut ultrices est non nisi interdum, eu accumsan erat
        porttitor. Nam porta id tellus in venenatis. Pellentesque vitae magna at
        nisl vehicula cursus. Donec pretium et metus eget euismod. Donec
        vulputate mi a orci semper tempus. Nunc finibus quis erat ornare mattis.
        Aliquam erat volutpat. Etiam ut ipsum id quam dapibus ultrices et quis
        risus. Nam vel consequat tellus, sit amet pellentesque dui. Cras
        imperdiet purus ut tempus ultricies. Sed sodales, odio non tincidunt
        tincidunt, lorem ante tempor nulla, ut consequat neque lectus sed lacus.
        Nulla urna tortor, eleifend non nulla ut, dictum laoreet tellus.
      </div>
    </section>
  );
}
