import { useEffect } from 'react';

function Timer({ 
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  timerLabel, setTimerLabel,
  secondsLeft, setSecondsLeft,
  timerRunning, setTimerRunning,
  setTimeEntry, onAddTime }) {

  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  useEffect(() => {

    function handleSwitch() {
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setSecondsLeft(breakLength * 60);
        setTimeEntry(sessionLength);
        onAddTime(sessionLength);
      } else if (timerLabel === 'Break') {
        setTimerLabel('Session');
        setSecondsLeft(sessionLength * 60);
      }
    }

    let intervalID = null;
    if (timerRunning && secondsLeft > 0) {
      intervalID = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 100);
    } else if (timerRunning && secondsLeft === 0) {
      intervalID = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 100);
      handleSwitch();
    } else {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);

  }, [sessionLength, breakLength, timerLabel, 
    setTimerLabel, setSecondsLeft,
    timerRunning, secondsLeft, 
    setTimeEntry, onAddTime]);

  function handleStart() {
    setTimerRunning(true);
  }

  function handleStop() {
    setTimerRunning(false);
  }

  function handleReset() {
    
    if (timerLabel === 'Session') {
      onAddTime(sessionLength);
    }

    setSessionLength(2);
    setBreakLength(1);
    setSecondsLeft(2 * 60);
    setTimerLabel('Session');
    setTimerRunning(false);
  }

  return (
    <div className="timer-component">
      <div className="timer-container">
        <h2 className="timer-label">{timerLabel}</h2>
        <h3 className="time-left">
          {
            minutes < 10
            ? ("0" + minutes).slice(-2)
            : minutes
          }:{
            seconds < 10
            ? ("0" + seconds).slice(-2)
            : seconds
          }
        </h3>
      
        <div className="button-container">
          <button className="start-stop"
            onClick={timerRunning ? handleStop : handleStart}
          >
            Start/Stop
          </button>
          <button className="reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
