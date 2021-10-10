import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => r.json())
      .then((userObj) => {
        console.log(userObj.tasks);
        const tasksSet = new Set();
        (userObj.tasks).forEach(task => {
          if (task.task_name !== null) {
            tasksSet.add(task.task_name);
          }
        });
        setTasks(Array.from(tasksSet));
      });
  }, []);

  function handleDelete(id) {
    fetch(`/api/tasks/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          const updatedTaskList = tasks.filter(task => task.id !== id);
          setTasks(updatedTaskList);
        }
      });      
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left", paddingTop: "1rem", backgroundColor: "rgb(118,118,118,0.08)"}}>
      <button style={{marginLeft: "3rem", marginTop: "2rem"}}>Add Task</button>
      <table className="table tasks">
        <tbody>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Active</th>
          </tr>
          {
            tasks && tasks.map(task => (
              <tr key={uuid()}>
                <td className="delete-cell"><button onClick={() => handleDelete(task.id)}>delete</button></td>
                <td className="cell-width"><button style={{border: "none", backgroundColor: "transparent"}}>{task}</button></td>
                <td className="active-cell"><input type="checkbox" /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Tasks
