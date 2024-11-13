import { useEffect, useRef, useState } from 'react';
import { LuPlay, LuPause } from 'react-icons/lu';
import { calculateLength, visualizeAudio } from '@/app/lib/helpers';
import styles from './tracklist.module.css';

export default function TrackList({
  name,
  path,
  id,
  duration,
  handleTimeUpdate,
  handleTrackSelector,
  isPlaying,
  trackPlaying,
  currentAudio,
  golos,
}) {
  const [isCanvasInit, setIsCanvasInit] = useState(false);

  useEffect(() => {
    currentAudio && console.log(currentAudio);
  }, [currentAudio]);

  function initCanvasContext(currentAudio, source, canvasRef, analyserRef) {
    if (currentAudio && currentAudio.readyState >= 2) {
      const audioContext = new AudioContext();
      if (!source.current) {
        console.log(currentAudio);
        source.current = audioContext.createMediaElementSource(currentAudio);
        const analyser = audioContext.createAnalyser();
        analyserRef.current = analyser;
        source.current.connect(analyser);
        analyser.connect(audioContext.destination);
      }
      visualizeAudio(canvasRef, analyserRef);
    }
    return;
  }

  return (
    <div
      className={styles.player}
      path={path}
      key={id}
    >
      <audio
        id={id}
        preload="metadata"
        crossOrigin="anonymous"
        controls
        onTimeUpdate={handleTimeUpdate}
        style={{ display: 'none' }}
      >
        <source
          src={path}
          type="audio/mpeg"
        />
      </audio>
      <button
        id={id}
        type="button"
        onClick={handleTrackSelector}
        className={styles.playTrack}
      >
        {isPlaying && trackPlaying == id ? <LuPause /> : <LuPlay />}
      </button>
      <span className={`${styles.tracklistTitle} ${golos.className}`}>
        {name}
      </span>
      {/* <div
              className={styles.singleWaveform}
              style={{
                maskImage: `url(${svgPath})`,
                WebkitMaskImage: `url(${svgPath})`,
              }}
            > */}
      <div
        className={styles.canvasContainer}
        // className={
        //   trackPlaying === id && isPlaying
        //     ? `${styles.canvasContainer}`
        //     : `${styles.canvasContainer} ${styles.someBlur}`
        // }
      >
        {currentAudio?.paused && <span />}
        {currentAudio && (
          <canvas
            ref={canvasRef}
            // className={styles.canvas}
            width={400}
            height={50}
          />
        )}
      </div>

      <span className={`${styles.trackDuration} ${golos.className}`}>
        {calculateLength(duration)}
      </span>
    </div>
  );
}
