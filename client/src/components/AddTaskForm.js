import { useState, useEffect } from 'react';

function AddTaskForm({ setTask, setTaskID }) {
  const [taskname, setTaskname] = useState("");
  const [taskArray, setTaskArray] = useState([]);

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.json())
      .then(userObj => {
        populateTaskList(userObj.tasks);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault(e);
    const taskName = taskname.toLowerCase().trim();
    fetch('/api/tasks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({taskName})
    }).then((r) => r.json())
      .then((task) => {
        setTask(task.task_name);
        setTaskID(task.id);
      });
  }

  function populateTaskList(userTasks) {
    const tasksSet = new Set();
    userTasks.forEach(task => tasksSet.add(task.task_name.toLowerCase().trim()));
    setTaskArray(Array.from(tasksSet));
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
          taskArray.map((task, i) => (
              <option key={i}
                value={task}
                onChange={e => {setTaskname(e.target.value); handleSubmit(e)}}
              />
            ))
        }
      </datalist>
    </form>
  );
}

export default AddTaskForm;
