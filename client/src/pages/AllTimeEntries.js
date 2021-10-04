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
    <div style={{paddingTop: 35, color: "black", backgroundColor: "lightpink", paddingRight: 20}}>
      <button onClick={getTimeEntries}>time entries</button>
      <ul style={{marginTop: 35}}>
        {
          timeEntries.map(timeEntry => {
            return (
              <li key={timeEntry.id}
                  style={{textAlign: "left"}}>
                id: {timeEntry.id}, 
                duration: {timeEntry.duration},
                task: {timeEntry.task.task_name},
                category: {timeEntry.category.category_label}
              </li>
            );
          })
        }
      </ul>
      <TimeEntriesFilteredByCategory />
      <TimeEntriesFilteredByTask />
    </div>
  );
}

export default AllTimeEntries;