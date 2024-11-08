'use client';

import { useRef, useState } from 'react';
import localFont from 'next/font/local';
import styles from './listen.module.css';

const trats = localFont({
  src: '../fonts/TRATS.woff2',
  display: 'swap',
});

export default function Listen() {
  const [trackPlaying, setTrackPlaying] = useState(0);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const source = useRef(null);
  const analyserRef = useRef(null);

  const handleAudioPlay = () => {
    const audioElement = audioRef.current;
    if (audioElement && audioElement.readyState >= 2) {
      audioElement.play();
      const audioContext = new AudioContext();
      if (!source.current) {
        source.current = audioContext.createMediaElementSource(audioElement);
        const analyser = audioContext.createAnalyser();
        analyserRef.current = analyser;
        source.current.connect(analyser);
        analyser.connect(audioContext.destination);
      }

      visualizeAudio();
    }
    if (trackPlaying == 0) {
      setTrackPlaying(1);
    }
    return;
  };

  function visualizeAudio() {
    const canvasCtx = canvasRef.current.getContext('2d');
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
  }

  return (
    <section className={styles.listen}>
      <h1 className={`${styles.title} ${trats.className}`}>Listen</h1>
      <div className={styles.canvasContainer}>
        <span style={{ display: `${trackPlaying && 'none'}` }}></span>
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={1000}
          height={200}
        />
      </div>
      <div className={styles.players}>
        <audio
          ref={audioRef}
          preload="auto"
          crossOrigin="anonymous"
          controls
          onPlay={handleAudioPlay}
        >
          <source
            src="https://res.cloudinary.com/dsjs9ozws/video/upload/v1730804253/mattcoffyndotcom/audio/i_nrl.mp3"
            type="audio/mpeg"
          />
        </audio>
      </div>
    </section>
  );
}
