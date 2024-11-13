import styles from '../app/listen/listen.module.css';

export default function SingleWaveform(svgPath) {
  return (
    <div
      className={styles.singleWaveform}
      style={{
        maskImage: `url(${svgPath})`,
        WebkitMaskImage: `url(${svgPath})`,
      }}
    />
  );
}
