function TimeEntry({ timeEntry, deleteTimeEntry }) {

  function handleDeleteClick() {
    deleteTimeEntry(timeEntry.id);
  }

  return (
    <tr key={timeEntry.id}
        style={{textAlign: "center"}}>
      <td><button onClick={handleDeleteClick}>delete</button></td>  
      <td>{timeEntry.created_at}</td>             
      <td>{timeEntry.duration}</td>
      <td>{timeEntry.task.task_name}</td>
      <td>{timeEntry.category.category_label}</td>
      <td>{timeEntry.user_id}</td>
    </tr>
  );
}

export default TimeEntry;
