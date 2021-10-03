import Timer from '../components/Timer';
import AddCategoryForm from '../components/AddCategoryForm';
import AddTaskForm from '../components/AddTaskForm';

function TimeItPage({ 
  setTask, setCategory, 
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  timerLabel, setTimerLabel,
  secondsLeft, setSecondsLeft,
  timerRunning, setTimerRunning,
  setTimeEntry, onAddTime }) {
  return (
    <div id="timer-component">
      <AddTaskForm setTask={setTask} />
      <AddCategoryForm setCategory={setCategory}/>
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
    </div>
  );
}

export default TimeItPage;
