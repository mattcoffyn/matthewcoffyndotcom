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
  globalVolume,
}) {
  const canvasRef = useRef(null);
  const source = useRef(null);
  const analyserRef = useRef(null);
  const [canvasCtx, setCanvasContext] = useState(null);
  const [volume, setVolume] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

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
        const analyser = audioContext.createAnalyser();
        analyserRef.current = analyser;
        source.current.connect(analyser);
        analyser.connect(audioContext.destination);
      }
      analyserRef.current.fftSize = 1024;
      visualizeAudio();
      measureVolume();
      setHasPlayed(true);
    }
    return;
  }, [isPlaying]);

  useEffect(() => {
    setCanvasContext(canvasRef?.current.getContext('2d'));
  }, [canvasRef.current]);

  const measureVolume = () => {
    const pcmData = new Float32Array(analyserRef.current.fftSize);
    let vol = 0;
    const onFrame = () => {
      analyserRef.current.getFloatTimeDomainData(pcmData);
      let sumSquares = 0.0;
      for (const amplitude of pcmData) {
        sumSquares += amplitude * amplitude;
      }
      const volFloat = Math.sqrt(sumSquares / pcmData.length) * 320;

      if (volFloat > 100) {
        vol = 100;
      } else {
        vol = volFloat;
      }

      setVolume(vol / 100);
      requestAnimationFrame(onFrame);
    };
    requestAnimationFrame(onFrame);
  };

  const visualizeAudio = () => {
    const canvasHeight = canvasRef.current.height;
    const canvasWidth = canvasRef.current.width;
    const renderFrame = () => {
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      analyserRef.current.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(108 108 98 / 0%)';
      // canvasCtx.strokeStyle = 'rgb(232 227 209 / 75%)';
      canvasCtx.strokeStyle = 'rgb(225, 255, 255)';
      canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      canvasCtx.lineWidth = 2;
      // canvasCtx.shadowOffsetX = 10;
      // canvasCtx.shadowOffsetY = 1;
      // canvasCtx.shadowColor = 'rgb(255 0 80 / 10%)';
      // canvasCtx.shadowBlur = 2;
      // canvasCtx.shadowOffsetX = -10;
      // canvasCtx.shadowOffsetY = -1;
      // canvasCtx.shadowColor = 'rgb(0 30 255 / 20%)';
      // canvasCtx.shadowBlur = 2;
      canvasCtx.beginPath();
      const sliceWidth = (canvasWidth * 1) / bufferLength;
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
    requestAnimationFrame(renderFrame);
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
        {isPlaying && trackPlaying == id ? (
          <LuPause
            style={{
              fontSize: '1.3rem',
              filter: `opacity(${1 - volume / 2})`,
            }}
          />
        ) : (
          <LuPlay />
        )}
      </button>
      <span
        className={`${styles.tracklistTitle} ${golos.className}`}
        style={{
          filter: `opacity(${1 - volume / 2})`,
        }}
      >
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
        className={
          isPlaying && trackPlaying == id
            ? `${styles.canvasContainer}`
            : `${styles.canvasContainer} ${styles.someBlur}`
        }
        // style={{
        //   boxShadow: `0px 0px 10px 0px inset rgba(0, 0, 0, 1)`,
        // }}
      >
        {/* {!hasPlayed ? <span /> : ''} */}
        <span
          style={{
            boxShadow: `0px 0px 20px 10px rgba(228, 200, 150, ${volume / 2})`,
            height: 0,
            // background: `rgba(228, 103, 1, ${volume})`,
          }}
        />
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={400}
          height={50}
          role="presentation"
          style={{
            filter: `drop-shadow(1px 1px 10px rgba(228, ${
              100 - volume * 100
            }, ${100 - volume * 100}, ${volume})) saturate(${volume}) opacity(${
              volume * 4
            })`,
          }}
        />
      </div>

      <span
        className={`${styles.trackDuration} ${golos.className}`}
        style={{
          filter: `opacity(${1 - volume / 2})`,
        }}
      >
        {calculateLength(duration)}
        {/* {volume} */}
      </span>
    </div>
  );
}
