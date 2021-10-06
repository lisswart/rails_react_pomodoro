function TimeEntry({ timeEntry, deleteTimeEntry }) {

  function handleDeleteClick() {
    deleteTimeEntry(timeEntry.id);
  }

  return (
    <tr key={timeEntry.id}
        style={{textAlign: "center"}}>
      <td><button onClick={handleDeleteClick}>delete</button></td>  
      <td>{ new Date(timeEntry.created_at).toString()}</td>             
      <td>{timeEntry.duration}</td>
      <td>{timeEntry.task.task_name}</td>
      <td>{timeEntry.category.category_label}</td>
    </tr>
  );
}

export default TimeEntry;
