import { useState } from 'react';
import DatePicker from 'react-date-picker';

import TimeEntry from '../components/TimeEntry';
import TimeEntriesFilteredByTask from "../components/TimeEntriesFilteredByTask";
import TimeEntriesFilteredByCategory from "../components/TimeEntriesFilteredByCategory";

function AllTimeEntries() {

  const [timeEntries, setTimeEntries] = useState([]);
  const [value, onChange] = useState(new Date());

  function getTimeEntries() {
    fetch('/api/time_entries')
      .then((r) => r.json())
      .then(timeEntriesArr => {
        console.log(timeEntriesArr);
        // const selectedTimeEntries = timeEntriesArr.filter(
        //   timeEntry => timeEntry.created_at === value
        // );
        // setTimeEntries(selectedTimeEntries);
        setTimeEntries(timeEntriesArr);
      });
  }

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
      <DatePicker
        onChange={onChange}
        value={value} />
      <button onClick={getTimeEntries} style={{height: 30}}>time entries</button>
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
            timeEntries.map(timeEntry => {
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