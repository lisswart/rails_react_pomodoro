import { useState } from 'react';

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
  return (
    <div style={{paddingTop: 35, color: "black", backgroundColor: "lightpink"}}>
      <button onClick={getTimeEntries}>time entries</button>
      <table style={{marginTop: 35, width: "100%"}}>
        <tbody>
          <tr>
            <th>duration</th>
            <th>task</th>
            <th>category</th>
          </tr>
          {
            timeEntries.map(timeEntry => {
              return (
                <tr key={timeEntry.id}
                    style={{textAlign: "center"}}>               
                  <td>{timeEntry.duration}</td>
                  <td>{timeEntry.task.task_name}</td>
                  <td>{timeEntry.category.category_label}</td>
                </tr>
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