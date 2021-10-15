import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { v4 as uuid} from 'uuid';

import TimeEntry from '../components/TimeEntry';
// import Tasks from '../components/Tasks';
// import Labels from '../components/Labels';
import TimeEntriesFilteredByTask from "../components/TimeEntriesFilteredByTask";
import TimeEntriesFilteredByCategory from "../components/TimeEntriesFilteredByCategory";

function AllTimeEntries({
  task, setCategory, categoryLabel,
  taskID, setTaskID, userID,
  categoryID, setCategoryID,
  timeEntry, setTimeEntry,
  setTask, setTaskname, taskname
}) {

  const [timeEntries, setTimeEntries] = useState([]);
  const [value1, onChangeOne] = useState(new Date());
  const [value2, onChangeTwo] = useState(new Date());

  useEffect(() => {
    fetch('/api/time_entries')
      .then((r) => {
        if (r.ok) {
          r.json().then(timeEntriesArr => {
            console.log(timeEntriesArr);
            setTimeEntries(timeEntriesArr);
          });
        } else {
          r.json().then(err => {
            console.log(err);
          });
        }
      });
  }, []);

  const timeArr = timeEntries.filter(timeEntry => new Date(timeEntry.created_at.toString()) > value1 && new Date(timeEntry.created_at.toString()) < value2);

  function deleteTimeEntry(timeEntryID) {
    fetch(`/api/time_entries/${timeEntryID}`, { method: "DELETE" })
      .then(() => {
        const updatedTimeEntries = timeEntries.filter(
          timeEntry => timeEntry.id !== timeEntryID
        );
        setTimeEntries(updatedTimeEntries);
      });
  }

  return (
    <div>
      {/* <Tasks />
      <Labels /> */}
      <div className="time">
        <div className="datepicker-container">
          <div className="datepicker">
            <label>From: </label>
            <DatePicker
              onChange={onChangeOne}
              value={value1} 
            />
          </div>
          <div className="datepicker">
          <label>To: </label>
            <DatePicker
              onChange={onChangeTwo}
              value={value2}
            />
          </div>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <th></th>
              <th>date</th>
              <th>topic</th>
              <th>subject</th>
              <th>duration</th>
            </tr>
            {
              timeArr.map((timeEntryFetched, i) => {
                return (
                  <TimeEntry key={uuid()} i={i}
                    userID={userID}
                    taskID={taskID}
                    setTaskID={setTaskID}
                    categoryID={categoryID}
                    setCategory={setCategory}
                    setCategoryID={setCategoryID}
                    categoryLabel={categoryLabel}
                    deleteTimeEntry={deleteTimeEntry}
                    timeEntryFetched={timeEntryFetched}
                    setTask={setTask}
                    task={task}
                    taskname={taskname}
                    setTaskname={setTaskname}
                    timeEntry={timeEntry}
                    setTimeEntry={setTimeEntry} />
                );
              })
            }
          </tbody>
        </table>
        <TimeEntriesFilteredByCategory />
        <TimeEntriesFilteredByTask />
      </div>
    </div>
  );
}

export default AllTimeEntries;