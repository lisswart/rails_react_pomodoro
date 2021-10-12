import { useEffect, useState } from 'react';

function Timer({ 
  userID, taskID,
  categoryID, setEnableLongBreak,
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  enableLongBreak, setTimeEntry,
  longBreakLength, setLongBreakLength,
  numberOfSessionsBeforeLongBreak,
  setNumberOfSessionsBeforeLongBreak
 }) {

  const [counter, setCounter] = useState(1);
  const [timerLabel, setTimerLabel] = useState("Session");  
  const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.json())
      .then(userObj => {
        setSecondsLeft(userObj.session_length * 60);
        setBreakLength(userObj.break_length);
        setEnableLongBreak(userObj.enable_long_break);
        setLongBreakLength(userObj.long_break_length);
        setNumberOfSessionsBeforeLongBreak(userObj.no_of_sessions_before_long_break);
      });
  }, [setBreakLength, setEnableLongBreak, setLongBreakLength, setSecondsLeft,
      setNumberOfSessionsBeforeLongBreak]);

  useEffect(() => {

    function handleAddTime(sessionLength) {
      fetch('/api/time_entries', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID,
          taskID,
          categoryID,
          duration: sessionLength,
        })
      }).then((r) => r.json())
        .then((timeAdded) => {
          setTimeEntry(timeAdded.duration);
          console.log(timeAdded);
        });
    }

    function handleSwitch() {
      setTimeEntry(0);
      if (enableLongBreak) {
        if (timerLabel === 'Deep Work') {
          if (counter >= numberOfSessionsBeforeLongBreak) {
            setTimerLabel('Long Break');
            setSecondsLeft(longBreakLength * 60);
            handleAddTime(sessionLength);
            setCounter(1);
          } else {
            setTimerLabel('Short Break');
            setSecondsLeft(breakLength * 60);
            handleAddTime(sessionLength);
            setCounter(counter => counter + 1);
          }
        } else if (timerLabel === 'Short Break' || timerLabel === 'Long Break') {
          setTimerLabel('Deep Work');
          setSecondsLeft(sessionLength * 60);
        }
      } else {
        if (timerLabel === 'Deep Work') {
          setTimerLabel('Break');
          setSecondsLeft(breakLength * 60);
          handleAddTime(sessionLength);
        } else if (timerLabel === 'Break') {
          setTimerLabel('Deep Work');
          setSecondsLeft(sessionLength * 60);
        }
      }
    }

    let intervalID = null;
    if (timerRunning && secondsLeft > 0) {
      intervalID = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 10);
    } 
    else if (timerRunning && secondsLeft === 0) {
      intervalID = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 10);
      handleSwitch();
    }
    else {
      clearInterval(intervalID);
    }

    return () => {
      clearInterval(intervalID);
      // setTimeEntry(0);
    }

  }, [sessionLength, breakLength, timerLabel, 
    setTimerLabel, setSecondsLeft, secondsLeft,
    timerRunning, setTimeEntry, counter, 
    numberOfSessionsBeforeLongBreak,
    longBreakLength, setBreakLength,
    setTimerRunning, enableLongBreak,
    categoryID, userID, taskID
  ]);

  function handleStart() {
    setTimerRunning(true);
    setBreakLength(breakLength);
  }

  function handleStop() {
    setTimerRunning(false);
  }

  function handleReset() {
    setSessionLength(sessionLength);
    setBreakLength(breakLength);
    setSecondsLeft(sessionLength * 60);
    setTimerLabel('Deep Work');
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
            {
              timerRunning
              ? "Pause"
              : "Start"
            }
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
