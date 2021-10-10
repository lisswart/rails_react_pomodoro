function TimeEntry({ timeEntry, deleteTimeEntry }) {

  function handleDeleteClick() {
    deleteTimeEntry(timeEntry.id);
  }

  return (
    <tr key={timeEntry.id}
        style={{textAlign: "center"}}>
      <td><button onClick={handleDeleteClick}>delete</button></td>  
      <td>{ new Date(timeEntry.created_at).toString()}</td>
      <td><button className="edit-button">{timeEntry.task.task_name}</button></td>
      <td><button className="edit-button">{timeEntry.category.category_label}</button></td>             
      <td>{timeEntry.duration}</td>
    </tr>
  );
}

export default TimeEntry;
