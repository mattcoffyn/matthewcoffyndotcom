'use client';
import { useRef, useState } from 'react';
// import localFont from 'next/font/local';
import AudioPlayer from '@/components/AudioPlayer';
import styles from './listen.module.css';
// import fx from './fx.module.css';

// const trats = localFont({
//   src: '../../fonts/TRATS.woff2',
//   display: 'swap',
// });

const track = '/Sun6thOct24.mp3';

export default function Listen() {
  const [trackPlaying, setTrackPlaying] = useState(0);
  const [files, setFiles] = useState(null); // to store the audio file
  const [uploaded, setUploaded] = useState(false); // this constraint is to determine if the audio file is available
  const canvasRef = useRef(null); // to target the canvas
  // const canvasRef2 = useRef(null); // to target the canvas
  const audioRef = useRef(null); // store the audio data
  const source = useRef(null);
  const analyserRef = useRef(null);

  const updateTrack = (trackToUpdate) => {
    setTrackPlaying(trackToUpdate);
    return;
  };
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
      console.log(audioContext);
      visualizeAudio(); // visualize audio
      // visualizeAudio2(); // visualize audio
    }
  };

  function visualizeAudio() {
    const canvasCtx = canvasRef.current.getContext('2d');
    const canvasHeight = canvasRef.current.height;
    const canvasWidth = canvasRef.current.width;

    const renderFrame = () => {
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      analyserRef.current.fftSize = 2048;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      analyserRef.current.getFloatFrequencyData(dataArray);
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      const barWidth = (canvasWidth / bufferLength) * 2;
      console.log(barWidth);
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] + 100) * 2.5;
        console.log(Math.floor(barHeight));
        canvasCtx.fillStyle = `rgb(0 ${Math.floor(barHeight)} 0)`;
        canvasCtx.fillRect(x, 0, barWidth + 1, 800);
        x += barWidth + 1;
      }
      requestAnimationFrame(renderFrame); // Call renderFrame recursively
    };
    renderFrame(); // Start the rendering loop
  }

  // function visualizeAudio2() {
  //   const canvasCtx = canvasRef2.current.getContext('2d');
  //   const canvasHeight = canvasRef2.current.height;
  //   const canvasWidth = canvasRef2.current.width;

  //   const renderFrame = () => {
  //     canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  //     analyserRef.current.fftSize = 256;
  //     const bufferLength = analyserRef.current.frequencyBinCount;
  //     const dataArray = new Float32Array(bufferLength);
  //     analyserRef.current.getFloatFrequencyData(dataArray);
  //     canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  //     canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
  //     const barWidth = (canvasWidth / bufferLength) * 2.5;
  //     console.log(barWidth);
  //     let x = 0;
  //     for (let i = 0; i < bufferLength; i++) {
  //       const barHeight = (dataArray[i] + 140) * 4;
  //       canvasCtx.fillStyle = `rgb(${Math.floor(barHeight)} 0 0)`;
  //       canvasCtx.fillRect(
  //         x,
  //         canvasHeight - barHeight / 2,
  //         barWidth,
  //         barHeight / 2
  //       );
  //       x += barWidth + 1;
  //     }
  //     requestAnimationFrame(renderFrame); // Call renderFrame recursively
  //   };
  //   renderFrame(); // Start the rendering loop
  // }

  return (
    <>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={1024}
        height={700}
      />
      {/* <canvas
        className={styles.canvas2}
        ref={canvasRef2}
        width={1024}
        height={500}
      /> */}
      <AudioPlayer
        trackID={1}
        name="Sun6thOct24"
        pathName="/Sun6thOct24.mp3"
        svgPath="/Sun6thOct24.svg"
        trackPlaying={trackPlaying}
        updateTrack={updateTrack}
        type="audio/mpeg"
        staticDuration={273}
        audioRef={audioRef}
        handleAudioPlay={handleAudioPlay}
      />
    </>
  );
}
