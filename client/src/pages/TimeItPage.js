import Timer from '../components/Timer';
import AddCategoryForm from '../components/AddCategoryForm';
import AddTaskForm from '../components/AddTaskForm';

function TimeItPage() {
  return (
    <div className="timer-component">
      <div style={{ display: "flex", 
        flexDirection: "column", margin: 20}}>
        <input style={{ margin: 30}} placeholder="task name" />
        <input style={{ margin: 30}} placeholder="category" />
      </div>
      <Timer />
      {/* <div id="timer-container">
        <div id="timer-label">
          Session
        </div>
        <h1 id="time-left">
          00:00
        </h1>
        <div id="button-container">
          <button id="start-stop">
            Start
          </button>
          <button id="reset">
            Reset
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default TimeItPage
