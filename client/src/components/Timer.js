import { useEffect, useState } from 'react';

function Timer({ 
  task, category,
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  timerLabel, setTimerLabel,
  secondsLeft, setSecondsLeft,
  timerRunning, setTimerRunning,
  setTimeEntry, onAddTime,
  enableLongBreak, longBreakLength,
  numberOfSessionsBeforeLongBreak
 }) {

  const [counter, setCounter] = useState(1);

  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  useEffect(() => {

    function handleSwitch() {
      if (timerLabel === 'Session') {
        if (counter >= numberOfSessionsBeforeLongBreak) {
          setTimerLabel('Break');
          setSecondsLeft(longBreakLength * 60);
          setTimeEntry(sessionLength);
          onAddTime(sessionLength);
          setCounter(1);
        } else {
          setTimerLabel('Break');
          setSecondsLeft(breakLength * 60);
          setTimeEntry(sessionLength);
          onAddTime(sessionLength);
          setCounter(counter => counter + 1);
        }
      } else if (timerLabel === 'Break') {
        setTimerLabel('Session');
        setSecondsLeft(sessionLength * 60);
      }
    }

    let intervalID = null;
    if (timerRunning && secondsLeft > 0) {
      intervalID = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 50);
    } 
    else if (timerRunning && secondsLeft === 0) {
      intervalID = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 50);
      handleSwitch();
    } 
    else {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);

  }, [sessionLength, breakLength, timerLabel, 
    setTimerLabel, setSecondsLeft, secondsLeft,
    timerRunning, setTimeEntry, onAddTime,
    counter, numberOfSessionsBeforeLongBreak,
    longBreakLength, setBreakLength,
    setTimerRunning
  ]);

  function handleStart() {
    if (task && category) {
    setTimerRunning(true);
    setBreakLength(breakLength);
    } else {
      alert("Please enter a task and press ENTER to submit AND a category and press ENTER to submit, pressing ENTER after filling out each input field.  Thank you : )");
    }
  }

  function handleStop() {
    setTimerRunning(false);
  }

  function handleReset() {
    setSessionLength(sessionLength);
    setBreakLength(breakLength);
    setSecondsLeft(sessionLength * 60);
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
