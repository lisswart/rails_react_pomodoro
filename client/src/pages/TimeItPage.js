import Timer from '../components/Timer';
import AddCategoryForm from '../components/AddCategoryForm';
import AddTaskForm from '../components/AddTaskForm';

function TimeItPage({ 
  task, category, errors,
  timeEntry, setTimeEntry,
  userID, taskID, categoryID,
  setTask, setTaskID,
  taskname, setTaskname,
  setCategory, setCategoryID,
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  timerLabel, setTimerLabel,
  secondsLeft, setSecondsLeft,
  timerRunning, setTimerRunning,
  setEnableLongBreak,
  enableLongBreak, longBreakLength,
  numberOfSessionsBeforeLongBreak,
  setNumberOfSessionsBeforeLongBreak,
  setLongBreakLength
 }) {
    
  return (
    <div id="timer-component">
      <p style={{color: "red", backgroundColor: "white"}}>{errors}</p>
      <AddTaskForm 
        setTask={setTask} 
        setTaskID={setTaskID} 
        setTaskname={setTaskname}
      />
      <AddCategoryForm 
        setCategory={setCategory}
        setCategoryID={setCategoryID} 
      />
      <Timer 
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        breakLength={breakLength}
        setBreakLength={setBreakLength}
        timerLabel={timerLabel}
        setTimerLabel={setTimerLabel}
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        userID={userID}
        taskID={taskID}
        task={task}
        categoryID={categoryID}
        category={category}
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
        setTimeEntry={setTimeEntry} 
        enableLongBreak={enableLongBreak}
        setEnableLongBreak={setEnableLongBreak}
        numberOfSessionsBeforeLongBreak={numberOfSessionsBeforeLongBreak}
        setNumberOfSessionsBeforeLongBreak={setNumberOfSessionsBeforeLongBreak}
        longBreakLength={longBreakLength}
        setLongBreakLength={setLongBreakLength}
      />
      
      <div className="reset-reminder">
        {
          timeEntry !== 0
          ? <p style={{width: "10rem", textAlign: "center"}}>{`${timeEntry} min. session is saved`}</p>
          : <></>
        }
      </div>
    </div>
  );
}

export default TimeItPage;
