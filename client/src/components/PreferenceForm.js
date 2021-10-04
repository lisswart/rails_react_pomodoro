function PreferenceForm({ 
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  enableLongBreak, setEnableLongBreak,
  numberOfSessionsBeforeLongBreak,
  setNumberOfSessionsBeforeLongBreak,
  longBreakLength, setLongBreakLength,
  updatePreferences }) {

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Event object in handle submit: ", e);
    updatePreferences({
      session_length: sessionLength,
      break_length: breakLength,
      enable_long_break: enableLongBreak,
      no_of_sessions_before_long_break: numberOfSessionsBeforeLongBreak,
      long_break_length: longBreakLength
    });
  }

  return (
    <form onSubmit={handleSubmit} className="preferences">
      <label htmlFor="session_length">
        Session Length
      </label>
      <input
        type="text"
        id="session_length"
        value={sessionLength}
        onChange={e => setSessionLength(e.target.value)}
      />
      <label htmlFor="break_length">
        Break Length
      </label>
      <input
        type="text"
        id="break_length"
        value={breakLength}
        onChange={e => setBreakLength(e.target.value)}
      />
      <>
        <label htmlFor="enable_long_break">
          Enable Long Break
        </label>
        <input
          type="checkbox"
          id="enable_long_break"
          value={enableLongBreak}
          onChange={e => {setEnableLongBreak(e.target.checked)}}
        />
      </>
      <label htmlFor="no_of_sessions_before_long_break">
        Long break after # of sessions
      </label>
      <input
        type="text"
        id="no_of_sessions_before_long_break"
        value={numberOfSessionsBeforeLongBreak}
        onChange={e => setNumberOfSessionsBeforeLongBreak(e.target.value)}
      />
      <label htmlFor="long_break_length">
        Long Break Length
      </label>
      <input
        type="text"
        id="long_break_length"
        value={longBreakLength}
        onChange={e => setLongBreakLength(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PreferenceForm;
