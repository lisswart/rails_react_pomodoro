import Timer from '../components/Timer';
import AddCategoryForm from '../components/AddCategoryForm';
import AddTaskForm from '../components/AddTaskForm';

function TimeItPage({ setTask, setCategory, setTimeEntry, onAddTime }) {
  return (
    <div id="timer-component">
      <AddTaskForm setTask={setTask} />
      <AddCategoryForm setCategory={setCategory}/>
      <Timer setTimeEntry={setTimeEntry} onAddTime={onAddTime} />
    </div>
  )
}

export default TimeItPage
