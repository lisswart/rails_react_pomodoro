Things that I still need to work on for MVP:
- [x] user is able to delete a time entry from the time-entries list
- [x] ~~user sees an alert whenever she starts the timer without submitting a taskname and categorylabel,~~ (alternatively, provide a default value in the backend whenever a user starts the timer without submitting a taskname and category label)
- [x] user is able to enable long break after n number of sessions which entails the timer cycling through sub-cycles of sessions/short-breaks for n number of sessions and n-1 number of short breaks, then long break follows the nth session to complete a cycle; this full cycle repeats itself until a user stops or resets the timer
- [x] fix issue with Bcrypt password invalid hash error
- [x] fix various subtle bugs
- [x] validate session/break length input to between 1 and 60 minutes (backend)
- [x] validate range of session length input on the frontend so user is alerted properly
- [x] 
timestamp is off by 8 hours 20 minutes, record that's created on 10-10-2021 at 04:11, is timestamped as created on 10-09-2021 at 14:52 (GMT is 18:52), only on my local server, is accurate on heroku
- [ ] filter time entry range in the backend when displaying time-entries
- [x] post task and category on click (so user doesn't have to still press Enter after clicking an option), unless user is typing in a new task/category
- [ ] add edit feature in time-entries to update time-entries ( those missing taskname and category label for example)

Stretch goals:
- [ ] user hears a 'ding' sound each time a session/break completes
- [ ] group time-entries by day, and display list of time entries by weekly pagination
- [ ] ability to filter time-entries by task and group time-entries by category inside each task
- [ ] ability to provide summary data such as productive hours by week, by day, hours spent on each task and/or category
- [ ] refactor code base to use useContext hook or useReducer(?) or Redux