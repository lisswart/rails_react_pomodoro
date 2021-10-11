import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  function openEditForm(i) {
    document.querySelectorAll("div.task-edit-form")[i].style.display = "block";
  }

  function closeEditForm(i) {
    document.querySelectorAll("div.task-edit-form")[i].style.display = "none";
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left", paddingTop: "1rem", backgroundColor: "rgb(118,118,118,0.08)"}}>
      <button className="add-button" style={{marginLeft: "3rem", marginTop: "2rem", display: "none"}}>Add Task</button>
      <table className="table tasks">
        <tbody>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Active</th>
          </tr>
          {
            tasks && tasks.map((task, i) => (
              task !== '(missing)'
              ? <tr key={uuidv4()}>
                  <td className="delete-cell">
                    <button className="delete-button"
                      onClick={() => handleDelete(task.id)}>
                        delete
                    </button>
                  </td>
                  <td className="cell-width">
                    <button className="edit-button" onClick={() => openEditForm(i)}>{task}
                    </button>
                    <div className="form-popup task-edit-form">
                      <form onSubmit={handleSubmit}>
                        <label htmlFor="task-name"></label>
                        <input
                          type="text"
                          placeholder="enter a new taskname"
                        />
                        {/* <button type="submit" className="save-button"
                          onClick={() => closeEditForm(i)}>
                            save
                        </button> */}
                      </form>
                    </div>
                  </td>
                  <td className="active-cell"><input type="checkbox" /></td>
                </tr>
              : <tr key={uuidv4()} style={{display: "none"}}>
                  <td className="delete-cell">
                    <button className="delete-button"
                      onClick={() => handleDelete(task.id)}>
                        delete
                    </button>
                  </td>
                  <td className="cell-width">
                    <button className="edit-button" onClick={() => openEditForm(i)}>{task}
                    </button>
                    <div className="form-popup task-edit-form">
                      <form onSubmit={handleSubmit}>
                        <label htmlFor="task-name"></label>
                        <input
                          type="text"
                          placeholder="enter a new taskname"
                        />
                        <button type="submit" className="save-button"
                          onClick={() => closeEditForm(i)}>
                            save
                        </button>
                      </form>
                    </div>
                  </td>
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
