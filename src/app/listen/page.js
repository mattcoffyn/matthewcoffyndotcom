'use client';
import { useRef, useState } from 'react';
import localFont from 'next/font/local';
import AudioPlayer from '@/components/AudioPlayer';
import data from './data.json';
import styles from './listen.module.css';

// import fx from './fx.module.css';

const trats = localFont({
  src: '../../fonts/TRATS.woff2',
  display: 'swap',
});

export default function Listen() {
  const [trackPlaying, setTrackPlaying] = useState(0);

  const updateTrack = (trackToUpdate) => {
    setTrackPlaying(trackToUpdate);
    return;
  };

  return (
    <section className={styles.listen}>
      <h1 className={`${styles.title} ${trats.className}`}>Listen</h1>
      <div className={styles.players}>
        {data.map(({ name, path, id, svgPath, category, type, duration }) => (
          <AudioPlayer
            key={id}
            trackId={id}
            pathName={path}
            name={name}
            svgPath={svgPath}
            trackPlaying={trackPlaying}
            updateTrack={updateTrack}
            type={type}
            staticDuration={duration}
          />
        ))}
      </div>
    </section>
  );
}
