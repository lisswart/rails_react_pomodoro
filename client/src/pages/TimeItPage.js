import Timer from '../components/Timer';
import AddCategoryForm from '../components/AddCategoryForm';
import AddTaskForm from '../components/AddTaskForm';

function TimeItPage({ 
  setTask, setTaskID,
  setCategory, setCategoryID,
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  timerLabel, setTimerLabel,
  secondsLeft, setSecondsLeft,
  timerRunning, setTimerRunning,
  setTimeEntry, onAddTime }) {
    
  return (
    <div id="timer-component">
      <AddTaskForm 
        setTask={setTask} 
        setTaskID={setTaskID} />
      <AddCategoryForm 
        setCategory={setCategory}
        setCategoryID={setCategoryID} />
      <Timer 
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        breakLength={breakLength}
        setBreakLength={setBreakLength}
        timerLabel={timerLabel}
        setTimerLabel={setTimerLabel}
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
        setTimeEntry={setTimeEntry} 
        onAddTime={onAddTime} />
      <p className="reset-reminder">Please reset the timer before logging out </p>
    </div>
  );
}

export default TimeItPage;
