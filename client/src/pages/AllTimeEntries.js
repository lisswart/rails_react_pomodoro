import { useState } from 'react';
import DatePicker from 'react-date-picker';

import TimeEntry from '../components/TimeEntry';
import TimeEntriesFilteredByTask from "../components/TimeEntriesFilteredByTask";
import TimeEntriesFilteredByCategory from "../components/TimeEntriesFilteredByCategory";

function AllTimeEntries() {

  const [timeEntries, setTimeEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value1, onChangeOne] = useState(new Date());
  const [value2, onChangeTwo] = useState(new Date());

  function getTimeEntries() {
    setIsLoading(true);
    fetch('/api/time_entries')
      .then((r) => {
        setIsLoading(false);
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
    <div className="table">
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
      <br />
      <button onClick={getTimeEntries} style={{height: 30}}>
        {
          isLoading
          ? "Loading..."
          : "time entries"
        }
      </button>
      <table style={{marginTop: 35, width: "100%"}}>
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
  );
}

export default AllTimeEntries;