import { useState, useEffect } from 'react';

function AddTaskForm({ setTask, setTaskID, setTaskname, taskname }) {
  
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
    console.log(taskname);
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

  function populateTaskList(userTasks) {
    const tasksSet = new Set();
    userTasks.forEach(task => {
      if (task.task_name !== null) {
        tasksSet.add(task.task_name.toLowerCase().trim());
      }
    });
    setTaskArray(Array.from(tasksSet));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskname" />
      <input list="task-list" 
        onChange={e => setTaskname(e.target.value)}
        name="taskname"
        value={taskname}
        placeholder="Choose a task or type in a new one AND PRESS ENTER..."
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
