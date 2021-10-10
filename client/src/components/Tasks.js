import { useState, useEffect } from 'react'

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((r) => r.json())
      .then((taskArr) => {
        console.log(taskArr);
        setTasks(taskArr);
      });
  }, []);

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
              <tr key={task.id}>
                <td><button>delete</button></td>
                <td className="cell-width">{task.task_name}</td>
                <td><input type="checkbox" /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Tasks
