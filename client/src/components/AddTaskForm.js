import { useState } from 'react';

function AddTaskForm({ user, setTask, setTaskID }) {
  const [taskname, setTaskname] = useState("");


  function handleSubmit(e) {
    e.preventDefault(e);
    fetch('/api/tasks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({taskname})
    }).then((r) => r.json())
      .then((task) => {
        console.log(task);
        setTask(task.task_name);
        setTaskID(task.id);
      });
  }

  function populateTaskList() {
    const tasksSet = new Set();
    (user.tasks).forEach(task => tasksSet.add(task.task_name.toLowerCase().trim()));
    return tasksSet;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskname" />
      <input list="task-list" 
        onChange={e => setTaskname(e.target.value)}
        name="taskname"
        value={taskname}
        placeholder="Please choose a task AND PRESS ENTER..."
        className="task-input"
      />
      <datalist id="task-list">
        {
          user.tasks
          ?  Array.from(populateTaskList()).map((task, i) => (
              <option key={i}
                value={task}
                onChange={e => setTaskname(e.target.value)}
              />
            ))
          : <></>
        }
      </datalist>
    </form>
  );
}

export default AddTaskForm;
