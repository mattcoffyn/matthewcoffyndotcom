// import { Golos_Text } from 'next/font/google';

import { LuPlay } from 'react-icons/lu';
import { LuPause } from 'react-icons/lu';
import { LuSkipBack } from 'react-icons/lu';
import { LuSkipForward } from 'react-icons/lu';

import styles from '../app/listen/listen.module.css';
import { useEffect, useRef, useState } from 'react';

export default function Track({
  name,
  path,
  id,
  type,
  duration,
  handleTimeUpdate,
  handleTrackSelector,
  isPlaying,
  golos,
  trackPlaying,
  audioRef,
  calculateLength,
  currentAudio,
}) {
  const canvasRef = useRef(null);
  const source = useRef(null);
  const analyserRef = useRef(null);
  const [canvasCtx, setCanvasContext] = useState(null);

  useEffect(() => {
    if (
      isPlaying &&
      audioRef.current?.children[id].children[0].readyState >= 2
    ) {
      const audioContext = new AudioContext();
      if (!source.current) {
        source.current = audioContext.createMediaElementSource(
          audioRef.current?.children[id].children[0]
        );
        console.log(source.current);

        const analyser = audioContext.createAnalyser();
        analyserRef.current = analyser;
        source.current.connect(analyser);
        analyser.connect(audioContext.destination);
      }
      visualizeAudio();
    }
    return;
  }, [isPlaying]);

  useEffect(() => {
    setCanvasContext(canvasRef?.current.getContext('2d'));
    console.log(canvasCtx);
  }, [canvasRef.current]);

  const visualizeAudio = () => {
    const canvasHeight = canvasRef.current.height;
    const canvasWidth = canvasRef.current.width;
    const renderFrame = () => {
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      analyserRef.current.fftSize = 1024;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      analyserRef.current.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgba(108, 108, 98, 0)';
      canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgba(255, 255, 255, 1)';

      canvasCtx.shadowOffsetX = 10;
      canvasCtx.shadowOffsetY = 1;
      canvasCtx.shadowColor = 'rgba(234, 54, 175, 0.4)';
      canvasCtx.shadowBlur = 2;
      canvasCtx.shadowOffsetX = -10;
      canvasCtx.shadowOffsetY = -1;
      canvasCtx.shadowColor = 'rgba(117, 250, 105, 0.4)';
      canvasCtx.shadowBlur = 2;
      canvasCtx.beginPath();
      const sliceWidth = (canvasWidth * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvasHeight) / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvasWidth, canvasHeight / 2);
      canvasCtx.stroke();

      requestAnimationFrame(renderFrame);
    };
    renderFrame();
  };

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
        // className={styles.canvasContainer}
        className={
          isPlaying && trackPlaying == id
            ? `${styles.canvasContainer}`
            : `${styles.canvasContainer} ${styles.someBlur}`
        }
      >
        {isPlaying && trackPlaying == id ? '' : <span />}
        {/* <span style={{ display: `${trackPlaying && 'none'}` }}></span> */}

        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={500}
          height={40}
        />
      </div>

      <span className={`${styles.trackDuration} ${golos.className}`}>
        {calculateLength(duration)}
      </span>
    </div>
  );
}
