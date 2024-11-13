import { useEffect, useState } from 'react';

// Convert length in seconds to 00:00 format
function calculateLength(secs) {
  const minutes = Math.floor(secs / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
}

// Handle mediaquery listeners
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return matches;
}

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

function visualizeAudio(canvasRef, analyserRef) {
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

export { calculateLength, useMediaQuery, initCanvasContext, visualizeAudio };
