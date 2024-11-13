'use client';

import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { Golos_Text } from 'next/font/google';
import localFont from 'next/font/local';
import { LuPlay } from 'react-icons/lu';
import { LuPause } from 'react-icons/lu';
import { LuSkipBack } from 'react-icons/lu';
import { LuSkipForward } from 'react-icons/lu';
// import useMediaQuery from '../../components/useMediaQuery';
import data from './data.json';
import styles from './listen.module.css';
import Image from 'next/image';
import Track from '@/components/Track';

const golos = Golos_Text({ subsets: ['latin'] });

const trats = localFont({
  src: '../../fonts/TRATS.woff2',
  display: 'swap',
});

export default function Listen() {
  const audioRef = useRef(null);
  const progressBar = useRef();
  const waveformFill = useRef();
  const animationRef = useRef();
  const [trackPlaying, setTrackPlaying] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isContextSet, setIsContextSet] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // let currentAudio = audioRef.current?.children[0].children[0];

  useEffect(() => {
    setCurrentAudio(audioRef.current.children[trackPlaying].children[0]);
    console.log('Init audio update');
  }, [audioRef.current]);

  useEffect(() => {
    const seconds =
      audioRef.current.children[trackPlaying].children[0].duration;
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioRef?.current?.loadedmetadata,
    audioRef?.current?.readyState,
    // data[trackPlaying].duration,
  ]);

  useEffect(() => {
    if (currentAudio && trackPlaying !== currentAudio?.id) {
      console.log(`trackPlaying : currentAudio.id mismatch`);
      currentAudio?.pause();
      cancelAnimationFrame(animationRef.current);
      const newAudio = audioRef.current.children[trackPlaying].children[0];
      newAudio.currentTime = 0;
      setCurrentAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  }, [trackPlaying]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      console.log(`Playing track ${trackPlaying}`);
      // if (!isContextSet) {
      //   createAudioContext();
      //   setIsContextSet(true);
      // }
      // visualizeAudio(
      //   audioRef.current.children[trackPlaying].children[3].children[2]
      // );
      currentAudio?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      // createAudioContext();
    } else {
      console.log(`Paused track ${trackPlaying}`);
      currentAudio?.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handlePrevTrack = () => {
    let i = Number(trackPlaying);
    console.log(`⏮️ current trackPlaying={${trackPlaying}} `);
    if (trackPlaying == 0) {
      currentAudio.currentTime = 0;
      console.log(
        `⏲️ currentAudio.currentTime = {${currentAudio.currentTime}}`
      );
    } else {
      i = Number(trackPlaying - 1);
      updateNewTrack(i);
    }
  };

  const handleNextTrack = () => {
    let i = trackPlaying;
    console.log(`⏭️ current trackPlaying={${trackPlaying}} `);
    if (trackPlaying !== data.length - 1) {
      i = i + 1;
      updateNewTrack(i);
    } else {
      return;
    }
  };

  const handleTrackSelector = (e) => {
    e.preventDefault();
    const i = e.currentTarget.id;
    console.log(`Selected track ${i}`);
    togglePlayPause();
    if (i == trackPlaying) {
      console.log(
        `Selected track (${i}) same as currentTrack (${currentAudio.id})`
      );
    } else {
      updateNewTrack(i);
    }
  };

  const updateNewTrack = (i) => {
    console.log(`Updating Audio Track (${i})`);
    setTrackPlaying(i);
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
    progressBar.current.value = e.target.currentTime / e.target.duration;
  };

  const whilePlaying = () => {
    progressBar.current.value =
      audioRef.current.children[trackPlaying].children[0].currentTime;
    changePlayerCurrentTime();

    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const calculateLength = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const changeRange = () => {
    audioRef.current.children[trackPlaying].children[0].currentTime =
      progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    const progressPercentage =
      (progressBar.current.value / Math.floor(duration)) * 100;
    waveformFill.current.style.setProperty(
      '--seek-before-width',
      `${progressPercentage}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  // const isActive = useMediaQuery('(max-width: 600px)');

  // const createAudioContext = () => {
  //   if (currentAudio && currentAudio.readyState >= 2) {
  //     const audioContext = new AudioContext();
  //     // if (!source.current) {
  //     source.current = audioContext.createMediaElementSource(currentAudio);
  //     console.log(source.current);
  //     const analyser = audioContext.createAnalyser();
  //     analyserRef.current = analyser;
  //     source.current.connect(analyser);
  //     analyser.connect(audioContext.destination);
  //     // }
  //     visualizeAudio();
  //   }
  //   return;
  // };

  // const visualizeAudio = () => {
  //   const canvasRef =
  //     audioRef.current.children[trackPlaying].children[3].children[1];
  //   const canvasCtx = canvasRef.current.getContext('2d');
  //   const canvasHeight = canvasRef.current.height;
  //   const canvasWidth = canvasRef.current.width;
  //   console.log(canvasCtx);

  //   const renderFrame = () => {
  //     canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  //     analyserRef.current.fftSize = 1024;
  //     const bufferLength = analyserRef.current.frequencyBinCount;
  //     const dataArray = new Uint8Array(bufferLength);
  //     canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  //     analyserRef.current.getByteTimeDomainData(dataArray);
  //     canvasCtx.fillStyle = 'rgba(108, 108, 98, 0)';
  //     canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
  //     canvasCtx.lineWidth = 2;
  //     canvasCtx.strokeStyle = 'rgba(255, 255, 255, 1)';

  //     canvasCtx.shadowOffsetX = 10;
  //     canvasCtx.shadowOffsetY = 1;
  //     canvasCtx.shadowColor = 'rgba(234, 54, 175, 0.4)';
  //     canvasCtx.shadowBlur = 2;
  //     canvasCtx.shadowOffsetX = -10;
  //     canvasCtx.shadowOffsetY = -1;
  //     canvasCtx.shadowColor = 'rgba(117, 250, 105, 0.4)';
  //     canvasCtx.shadowBlur = 2;
  //     canvasCtx.beginPath();
  //     const sliceWidth = (canvasWidth * 1.0) / bufferLength;
  //     let x = 0;

  //     for (let i = 0; i < bufferLength; i++) {
  //       const v = dataArray[i] / 128.0;
  //       const y = (v * canvasHeight) / 2;
  //       if (i === 0) {
  //         canvasCtx.moveTo(x, y);
  //       } else {
  //         canvasCtx.lineTo(x, y);
  //       }

  //       x += sliceWidth;
  //     }

  //     canvasCtx.lineTo(canvasWidth, canvasHeight / 2);
  //     canvasCtx.stroke();

  //     requestAnimationFrame(renderFrame);
  //   };
  //   renderFrame();
  // };

  return (
    <section className={styles.listen}>
      <h1 className={`${styles.title} ${trats.className}`}>Listen</h1>
      {/* <div className={styles.canvasContainer}>
        <span style={{ display: `${trackPlaying && 'none'}` }}></span>
      </div>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={1000}
        height={200}
      /> */}

      <div className={`${styles.playerControlContainer}`}>
        <span className={`${styles.currentTitle} ${golos.className}`}>
          {data[trackPlaying].name}
        </span>
        <div
          className={`${styles.progressOuter} ${
            isPlaying ? styles.clearBlur : ''
          }`}
        >
          <div
            className={styles.waveformContainer}
            ref={waveformFill}
            style={{
              maskImage: `url(${data[trackPlaying].svgPath})`,
              WebkitMaskImage: `url(${data[trackPlaying].svgPath})`,
            }}
          ></div>
          <input
            className={styles.progressBar}
            type="range"
            defaultValue="0"
            step="0.1"
            max={
              duration
                ? Math.floor(duration)
                : Math.floor(data[trackPlaying].duration)
            }
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
        <div className={`${styles.currentTrackInfo} `}>
          <span className={`${styles.currentTime} ${golos.className}`}>
            {calculateLength(currentTime)}
          </span>
          <div className={styles.controls}>
            <button
              type="button"
              title="Previous Track"
              onClick={handlePrevTrack}
              className={styles.forwardBack}
            >
              <LuSkipBack className={styles.play} />
            </button>
            <button
              type="button"
              title="Play & Pause"
              onClick={togglePlayPause}
              className={styles.playPause}
            >
              {!isPlaying ? <LuPlay /> : <LuPause className={styles.pause} />}
            </button>
            <button
              type="button"
              title="Next Track"
              onClick={handleNextTrack}
              className={styles.forwardBack}
            >
              <LuSkipForward className={styles.play} />
            </button>
          </div>

          <span className={`${styles.duration} ${golos.className}`}>
            {duration
              ? calculateLength(duration)
              : calculateLength(data[trackPlaying].duration)}
          </span>
        </div>
      </div>
      <div
        className={styles.players}
        ref={audioRef}
      >
        {data.map(({ name, path, id, svgPath, category, type, duration }) => (
          <Track
            key={id}
            name={name}
            path={path}
            id={id}
            type={type}
            duration={duration}
            handleTimeUpdate={handleTimeUpdate}
            handleTrackSelector={handleTrackSelector}
            isPlaying={isPlaying}
            golos={golos}
            trackPlaying={trackPlaying}
            audioRef={audioRef}
            calculateLength={calculateLength}
            currentAudio={currentAudio}
          />
        ))}
      </div>
    </section>
  );
}
