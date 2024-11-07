'use client';
import { useRef, useState } from 'react';
import localFont from 'next/font/local';
import AudioPlayer from '@/components/AudioPlayer';
import data from './data.json';
import styles from './listen.module.css';
import { CldOgImage } from 'next-cloudinary';

// import fx from './fx.module.css';

const trats = localFont({
  src: '../../fonts/TRATS.woff2',
  display: 'swap',
});

export default function Listen() {
  const [trackPlaying, setTrackPlaying] = useState(0);
  const canvasRef = useRef(null); // to target the canvas
  const source = useRef(null);
  const analyserRef = useRef(null);

  const updateTrack = (trackToUpdate, currentAudioRef) => {
    setTrackPlaying(trackToUpdate);
    if (currentAudioRef && currentAudioRef.readyState >= 2) {
      const audioContext = new AudioContext();

      source.current = audioContext.createMediaElementSource(currentAudioRef);
      console.log(currentAudioRef);
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      source.current.connect(analyser);
      analyser.connect(audioContext.destination);
      visualizeAudio(); // visualize audio
    }
    return;
  };

  function visualizeAudio() {
    const canvasCtx = canvasRef.current.getContext('2d');
    const canvasHeight = canvasRef.current.height;
    const canvasWidth = canvasRef.current.width;

    const renderFrame = () => {
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      analyserRef.current.fftSize = 2048;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      analyserRef.current.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgba(200, 200, 200, 0)';
      canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgba(231, 170, 44, 1';
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

      // const barWidth = (canvasWidth / bufferLength) * 2;
      // let x = 0;
      // for (let i = 0; i < bufferLength; i++) {
      //   const barHeight = (dataArray[i] + 100) * 2.5;
      //   if (barHeight > 0) {
      //     canvasCtx.fillStyle = `rgb(0 ${Math.floor(barHeight)} 0)`;
      //   }
      //   canvasCtx.fillRect(x, 0, barWidth + 1, 800);
      //   x += barWidth + 1;
      // }
      requestAnimationFrame(renderFrame); // Call renderFrame recursively
    };
    renderFrame(); // Start the rendering loop
  }

  return (
    <section className={styles.listen}>
      <h1 className={`${styles.title} ${trats.className}`}>Listen</h1>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={1000}
        height={100}
      />
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
