import { useState } from 'react';

import TimeEntry from '../components/TimeEntry';
import TimeEntriesFilteredByTask from "../components/TimeEntriesFilteredByTask";
import TimeEntriesFilteredByCategory from "../components/TimeEntriesFilteredByCategory";

function AllTimeEntries() {

  const [timeEntries, setTimeEntries] = useState([]);

  function getTimeEntries() {
    fetch('/api/time_entries')
      .then((r) => r.json())
      .then(timeEntriesArr => {
        console.log(timeEntriesArr);
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
    <div style={{paddingTop: 35, color: "black", backgroundColor: "lightpink"}}>
      <button onClick={getTimeEntries}>time entries</button>
      <table style={{marginTop: 35, width: "100%"}}>
        <tbody>
          <tr>
            <th></th>
            <th>date</th>
            <th>duration</th>
            <th>task</th>
            <th>category</th>
            <th>user</th>
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
      <p style={{color: "pink"}}>...............................................................................</p>
      <TimeEntriesFilteredByCategory />
      <TimeEntriesFilteredByTask />
    </div>
  );
}

export default AllTimeEntries;