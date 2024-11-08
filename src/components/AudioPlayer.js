'use client';

import { useState, useRef, useEffect } from 'react';
import localFont from 'next/font/local';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import useMediaQuery from '@/components/useMediaQuery';
import styles from './audioplayer.module.css';

const ibm = localFont({
  src: '../fonts/3270Medium.woff2',
  display: 'swap',
});

const AudioPlayer = ({
  trackId,
  name,
  pathName,
  svgPath,
  trackPlaying,
  updateTrack,
  type,
  staticDuration,
}) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioRef = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const waveformFill = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    const seconds = staticDuration;
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioRef?.current?.loadedmetadata,
    audioRef?.current?.readyState,
    staticDuration,
  ]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      updateTrack(trackId, audioRef.current);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
      updateTrack(trackId, audioRef.current);
    }
  };

  useEffect(() => {
    if (trackPlaying !== trackId && trackId !== 0) {
      audioRef?.current.pause();
      cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    }
  }, [trackPlaying, trackId]);

  const whilePlaying = () => {
    progressBar.current.value = audioRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioRef.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    const progressPercentage =
      (progressBar.current.value / staticDuration) * 100;
    waveformFill.current.style.setProperty(
      '--seek-before-width',
      `${progressPercentage}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const isActive = useMediaQuery('(max-width: 600px)');

  return (
    <>
      {!isActive ? (
        <div className={`${styles.audioPlayer} ${ibm.className}`}>
          <span className={styles.title}>{name}</span>
          <audio
            ref={audioRef}
            preload="auto"
            crossOrigin="anonymous"
          >
            <source
              src={pathName}
              type={type}
            />
          </audio>
          <button
            onClick={togglePlayPause}
            className={styles.playPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
          </button>
          <div className={styles.timeAndProgress}>
            <div className={styles.currentTime}>
              {calculateTime(currentTime)}
            </div>
            <div
              className={styles.waveformContainer}
              ref={waveformFill}
              style={{
                maskImage: `url(${svgPath})`,
                WebkitMaskImage: `url(${svgPath})`,
              }}
            >
              <input
                className={styles.progressBar}
                type="range"
                defaultValue="0"
                step="0.1"
                ref={progressBar}
                onChange={changeRange}
              />
            </div>

            <div className={styles.duration}>
              {/* {duration && !isNaN(duration) && calculateTime(duration)} */}
              {calculateTime(duration)}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.audioPlayer}>
          <div className={styles.titleAndTime}>
            <span className={styles.title}>{name}</span>
            <div className={styles.currentTime}>
              {calculateTime(currentTime)}
            </div>
            <div className={styles.duration}>{calculateTime(duration)}</div>
          </div>
          <audio
            ref={audioRef}
            preload="auto"
            crossOrigin="anonymous"
          >
            <source
              src={pathName}
              type={type}
            />
          </audio>
          <button
            onClick={togglePlayPause}
            className={styles.playPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
          </button>
          <div className={styles.timeAndProgress}>
            <div
              className={styles.waveformContainer}
              ref={waveformFill}
              style={{
                maskImage: `url(${svgPath})`,
                WebkitMaskImage: `url(${svgPath})`,
              }}
            >
              <input
                className={styles.progressBar}
                type="range"
                defaultValue="0"
                step="0.1"
                ref={progressBar}
                onChange={changeRange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
