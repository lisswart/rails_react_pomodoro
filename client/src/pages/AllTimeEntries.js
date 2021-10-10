import { useState } from 'react';
import DatePicker from 'react-date-picker';

import TimeEntry from '../components/TimeEntry';
import Tasks from '../components/Tasks';
import Labels from '../components/Labels';
import TimeEntriesFilteredByTask from "../components/TimeEntriesFilteredByTask";
import TimeEntriesFilteredByCategory from "../components/TimeEntriesFilteredByCategory";

function AllTimeEntries() {

  const [timeEntries, setTimeEntries] = useState([]);
  const [value1, onChangeOne] = useState(new Date());
  const [value2, onChangeTwo] = useState(new Date());

  function getTimeEntries() {
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
  }

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
      <Tasks />
      <Labels />
      <div className="time">
        <div className="datepicker-container">
          <div className="datepicker">
            <label>From: </label>
            <DatePicker
              onChange={onChangeOne}
              value={value1} 
              onClick={getTimeEntries}
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
              <th>task</th>
              <th>category</th>
              <th>duration</th>
            </tr>
            {
              timeArr.map(timeEntry => {
                return (
                  <TimeEntry key={timeEntry.id} 
                    deleteTimeEntry={deleteTimeEntry}
                    timeEntry={timeEntry}/>
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