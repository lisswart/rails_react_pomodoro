function TimeEntry({ timeEntry, deleteTimeEntry, i }) {

  function handleDeleteClick() {
    deleteTimeEntry(timeEntry.id);
  }

  function openEditForm(i) {
    document.querySelectorAll("div.time-entry-task-edit")[i].style.display = "block";
  }

  function closeEditForm(i) {
    document.querySelectorAll("div.time-entry-task-edit")[i].style.display = "none";
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <tr key={timeEntry.id}
        style={{textAlign: "center"}}>
      <td><button className="delete-button" onClick={handleDeleteClick}>delete</button></td>  
      <td>{ new Date(timeEntry.created_at).toString()}</td>
      <td>
        <button className="edit-button"
          onClick={() => openEditForm(i)}>
          {timeEntry.task.task_name}
        </button>
        <div className="form-popup time-entry-task-edit">
          <form onSubmit={handleSubmit}>
            <label htmlFor="task-name"></label>
            <input
              type="text"
              placeholder="enter taskname" />
            <button type="submit"
              className="save-button"
              onClick={() => closeEditForm(i)}>
                save
            </button>
          </form>
        </div>
      </td>
      <td>
        <button className="edit-button">
          {timeEntry.category.category_label}
        </button>
      </td>             
      <td>{timeEntry.duration}</td>
    </tr>
  );
}

export default TimeEntry;
