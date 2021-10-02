import { useState } from 'react';

function AddTaskForm({ setTask }) {
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
      .then((task) => setTask(task.task_name));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskname" />
      <input type="text" 
        onChange={e => setTaskname(e.target.value)}
        name="taskname"
        value={taskname}
        placeholder="task name..."
        className="task-input"
      />
    </form>
  );
}

export default AddTaskForm;
