function TimeEntry({ 
  timeEntryFetched, deleteTimeEntry, i,
  userID, taskID, setTaskID,
  categoryID, setCategoryID,
  taskname, setTask, setTaskname,
  categoryLabel, setCategory,
  timeEntry, setTimeEntry
 }) {

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
    const fieldname = e.target.name;
    const userInput = e.target.value;
    setTaskname({
      [fieldname]: userInput
    });
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    // console.log(taskname);
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

    fetch(`/api/time_entries/${timeEntryFetched.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userID, taskID})
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

  function handleLabelSubmit(e) {
    e.preventDefault();
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
          onClick={() => openEditForm(i, "task")}>
          {timeEntryFetched.task.task_name}
        </button>
        <div className="form-popup time-entry-task-edit">
          <form onSubmit={handleTaskSubmit}>
            <label htmlFor="task-name"></label>
            <input
              type="text"
              placeholder="enter taskname"
              name="taskname"
              value={taskname}
              onChange={handleTaskChange} 
            />
            {/* <button 
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
          onClick={() => openEditForm(i, "label")}>
          {timeEntryFetched.category.category_label}
        </button>
        <div className="form-popup time-entry-label-edit">
          <form onSubmit={handleLabelSubmit}>
            <label htmlFor="label"></label>
            <input
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
