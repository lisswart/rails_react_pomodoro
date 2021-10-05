Things that I still need to work on for MVP:
- [x] user is able to delete a time entry from the time-entries list
- [x] user sees an alert whenever she starts the timer without submitting a taskname and categorylabel, ~~(alternatively, provide a default value in the backend whenever a user starts the timer without submitting a taskname and category label)~~
- [x] user is able to enable long break after n number of sessions which entails the timer cycling through sub-cycles of sessions/short-breaks for n number of sessions and n-1 number of short breaks, then long break follows the nth session to complete a cycle; this full cycle repeats itself until a user stops or resets the timer
- [ ] fix issue with Bcrypt password invalid hash error

Stretch goals:
- [ ] user hears a 'ding' sound each time a session/break completes
- [ ] group time-entries by day, and display list of time entries by weekly pagination
- [ ] ability to filter time-entries by task and group time-entries by category inside each task
- [ ] ability to provide summary data such as productive hours by week, by day, hours spent on each task and/or category