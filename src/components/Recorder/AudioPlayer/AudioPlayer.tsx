import React, {Fragment, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import './AudioPlayer.css';
import classList from '../../../shared/utils/classList';

/**
 * TODO: Refactor component.
 * Use requestAnimationFrame
 * It works fine for the moment but we could find another approach.
 * There are some problems that had to be solved with workarounds.
 * The recursive functions get the value of states and props when it first enters the function.
 * They don't get updated values.
 * It is solved using useRef as it always gets the updated values.
 * Create a totally independent component to publish it in npm.
 */

const AudioPlayer = ({amplitudes, playing, onPlayCallback, frameDuration, beatDuration, minLapse, maxLapse, stoppedAmplitude, colorPlaying, colorStopped, buttonSize, recorderMode}) => {
  const [typedText, setTypedText] = React.useState('');
  const [textAnimationFinished, setTextAnimationFinished] = React.useState(true);

  const canvasRef = useRef(null);
  const buttonCanvasRef = useRef(null);
  const playingRef = useRef(false); // workaround, using ref as it is updated the whole time
  const beats = useRef([]);
  const amplitude = useRef(0);
  const beatFrames = beatDuration / frameDuration; // Number of frames in one beat

  useEffect(() => {
    drawButtonCanvas();
  }, []);

  useEffect(() => {
    amplitude.current = amplitudes.length > 0 ? (amplitudes.reduce((a, b) => a + b) / amplitudes.length) : 0;
  }, [amplitudes]);

  useEffect(() => {
    playingRef.current = playing;
    drawButtonCanvas();
    if (playing) {
      play();
    } else {
      stop();
    }
  }, [playing]);

  const addBeat = (maxAmplitude, color) => {
    const id = uuidv4();
    const beat = {
      id: id,
      maxAmplitude: maxAmplitude,
      amplitude: 0,
      color: color
    }
    beats.current.push(beat);

    return beat;
  }

  const deleteBeat = (idBeat) => {
    beats.current = beats.current.filter(beat => beat.id !== idBeat);
  }

  const stop = () => {
    const currentBeat = addBeat(stoppedAmplitude, colorStopped);
    simulateBeatFrame(currentBeat, 0);
    draw();

    setTimeout(() => {
      if (!playingRef.current) {
        stop();
      }
    }, beatDuration);
  }

  const play = () => {
    const maxAmplitudeRatio = amplitude.current < 100 ? 0.1 : ((amplitude.current - 100) / 155);
    const maxAmplitude = maxAmplitudeRatio * 200;
    const currentBeat = addBeat(maxAmplitude, colorPlaying);
    simulateBeatFrame(currentBeat, 0);

    const beatLapse = Math.random() * (maxLapse - minLapse) + minLapse; // Lapse between beats (ms)
    setTimeout(() => {
      if (playingRef.current) {
        play();
      }
    }, beatLapse);
  }

  const calculateFrameAmplitude = (beat, frameCounter) => {
    let increase = (Math.PI / beatFrames) * frameCounter;
    let amplitude = buttonSize + Math.abs(beat.maxAmplitude * Math.sin(increase));
    return amplitude;
  }

  const simulateBeatFrame = (beat, frameCounter) => {
    frameCounter++;

    beat.amplitude = calculateFrameAmplitude(beat, frameCounter);

    draw();

    setTimeout(() => {
      if (frameCounter < beatFrames) {
        simulateBeatFrame(beat, frameCounter);
      } else {
        deleteBeat(beat.id);
      }
    }, frameDuration);
  }

  const draw = () => {
    const canvas = canvasRef.current;
    if(canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let ctx = canvas.getContext('2d');

      if (ctx && beats.current.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        beats.current.forEach(b => {
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = b.color;
          ctx.beginPath();

          ctx.arc(window.innerWidth/2, 0, b.amplitude, 0, Math.PI);
          ctx.fill();
        });
      }
    }
  };

  const drawButtonCanvas = () => {
    const canvas = buttonCanvasRef.current;
    if(canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = playingRef.current ? colorPlaying : colorStopped;
      ctx.beginPath();
      ctx.arc(window.innerWidth / 2, 0, buttonSize, 0, Math.PI);
      ctx.fill();
    }

    /*ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();*/
  }

  const startTextAnimation = () => {
    setTextAnimationFinished(false);
    typeText(0, '')
  }

  const typeText = (i, textWritten) => {
    const text = 'Login to use me! :)';
    if (i < text.length) {
      textWritten = textWritten + text.charAt(i);
      setTypedText(textWritten);
      i++;
      setTimeout(() => {
        typeText(i, textWritten)
      }, 20);
    } else {
      setTextAnimationFinished(true);
    }
  }

  window.addEventListener('resize', drawButtonCanvas);

  return (
    <div className='audio-player-container'>
      <canvas
        className='audio-player-canvas'
        ref={canvasRef}
      />
      <canvas
        className='audio-player-button-canvas'
        ref={buttonCanvasRef}
      />
      <div style={{height: buttonSize + 'px', width: buttonSize, color: playing ? 'black' : 'white'}} className='button-label'>
        { playing ? '\n ≧◡≦' : '≖◡≖' }
      </div>
      <button onClick={() => recorderMode && !playing ? onPlayCallback() : (!recorderMode && textAnimationFinished && startTextAnimation())}
              className='audio-player-invisible-button'/>
      <div className='audio-player-login-message-container'>
        <div className={classList('audio-player-login-message', textAnimationFinished ? 'fadeOut':'')}>
          {typedText}
        </div>
      </div>
    </div>
  );
};

AudioPlayer.defaultProps = {
  frameDuration: 50,    // Timeout between frame iterations (ms)
  beatDuration: 2000,   // Duration of each beat (ms)
  minLapse: 500,
  maxLapse: 1000,
  stoppedAmplitude: 20,  // Amplitude of the beat when the player is stopped
  colorPlaying: '#FFB485',
  colorStopped: '#66A3CC',
  buttonSize: 50,
  recorderMode: true
};

AudioPlayer.propTypes = {
  onPlayCallback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playing: state.recording.current.playing
})

export default connect(mapStateToProps)(AudioPlayer);
