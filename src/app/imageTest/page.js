import Image from 'next/image';
import styles from './imagetest.module.css';
import lighthouse from '../../../public/lighthouse.jpg';

export default function ImageTest() {
  return (
    <div className={styles.hallucinationEffect}>
      {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Point_Reyes_Lighthouse_%28April_2012%29.jpg/593px-Point_Reyes_Lighthouse_%28April_2012%29.jpg" /> */}
      <Image
        className={styles.image}
        alt="A picture of a lighthouse."
        src={lighthouse}
        sizes={800}
        priority
      />
    </div>
  );
}
