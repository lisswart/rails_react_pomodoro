import { useState, useEffect } from 'react';

function TimeEntry({ 
  timeEntryFetched, deleteTimeEntry, i,
  userID, taskID, setTaskID,
  categoryID, setCategoryID,
  taskname, setTask, task, setTaskname,
  categoryLabel, setCategory, setCategoryLabel,
  timeEntry, setTimeEntry
 }) {

  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    
  }, [])

  function handleDeleteClick() {
    deleteTimeEntry(timeEntryFetched.id);
  }

  function openEditForm(i, str) {
    if (str === "task") {
      document.querySelectorAll("div.time-entry-task-edit")[i].style.display = "block";
    } else if (str === "label") {
      document.querySelectorAll("div.time-entry-label-edit")[i].style.display = "block";
    }
  }

  function closeEditForm(i, str) {
    if (str === "task") {
      document.querySelectorAll("div.time-entry-task-edit")[i].style.display = "none";
    } else if (str === "label") {
      document.querySelectorAll("div.time-entry-label-edit")[i].style.display = "none";
    }
  }

  function handleTaskChange(e) {
    setEditTask(e.target.value);
    console.log(editTask);
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    closeEditForm(i, "task");
    fetch('/api/tasks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({editTask})
    }).then((r) => r.json())
      .then((task) => {
        console.log(task);
        setTask(task.task_name);
        setTaskID(task.id);
        console.log("taskID: ", task.id);
        // setCategoryLabel("(missing)");
      }).then(patchTask(taskname));
  }

  function patchTask(taskID) {
    fetch(`/api/time_entries/${timeEntryFetched.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userID, taskname, categoryLabel})
    }).then((r) => {
      if (r.ok) {
        r.json().then(updatedTimeEntryObj => {
          console.log("taskID: ", taskID);
          console.log(updatedTimeEntryObj);
          timeEntryFetched = updatedTimeEntryObj;
        });
      } else {
        r.json().then(err => console.log(err));
      }
    });
  }

  function handleLabelSubmit(e) {
    e.preventDefault();
    closeEditForm(i, "label");
    console.log(categoryLabel);
    fetch('/api/categories', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({categoryLabel})
    }).then((r) => r.json())
      .then((category) => {
        console.log(category);
        setCategory(category.category_label);
        setCategoryID(category.id);
      });
    
    fetch(`/api/time_entries/${timeEntryFetched.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userID, categoryID})
    }).then((r) => {
      if (r.ok) {
        r.json().then(updatedTimeEntryObj => {
          console.log(updatedTimeEntryObj);
          timeEntryFetched = updatedTimeEntryObj;
        });
      } else {
        r.json().then(err => console.log(err));
      }
    });
  }

  return (
    <tr key={timeEntryFetched.id}
        style={{textAlign: "center"}}>
      <td><button className="delete-button" onClick={handleDeleteClick}>delete</button></td>  
      <td>{ new Date(timeEntryFetched.created_at).toString()}</td>
      <td>
        <button className="edit-button"
          // onClick={() => openEditForm(i, "task")}
        >
          {timeEntryFetched.task.task_name}
        </button>
        <div className="form-popup time-entry-task-edit">
          <form onSubmit={handleTaskSubmit}>
            <label htmlFor="task-name"></label>
            <input
              required
              type="text"
              placeholder="enter taskname"
              name="task"
              value={editTask}
              onChange={handleTaskChange} 
            />
            {/* <button 
              type="submit"
              className="save-button"
              onClick={() => closeEditForm(i, "task")}
            >
                save
            </button> */}
          </form>
        </div>
      </td>
      <td>
        <button className="edit-button"
          // onClick={() => openEditForm(i, "label")}
        >
          {timeEntryFetched.category.category_label}
        </button>
        <div className="form-popup time-entry-label-edit">
          <form onSubmit={handleLabelSubmit}>
            <label htmlFor="label"></label>
            <input
              required
              type="text"
              placeholder="enter label" />
            {/* <button type="submit"
              className="save-button"
              onClick={() => closeEditForm(i, "label")}>
                save
            </button> */}
          </form>
        </div>
      </td>             
      <td>{timeEntryFetched.duration}</td>
    </tr>
  );
}

export default TimeEntry;
