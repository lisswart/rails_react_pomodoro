import TimeEntriesFilteredByTask from "../components/TimeEntriesFilteredByTask";
import TimeEntriesFilteredByCategory from "../components/TimeEntriesFilteredByCategory";

function AllTimeEntries() {
  return (
    <div>
      <TimeEntriesFilteredByCategory />
      <TimeEntriesFilteredByTask />
    </div>
  );
}

export default AllTimeEntries;

