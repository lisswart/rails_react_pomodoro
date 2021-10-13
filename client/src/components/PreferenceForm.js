import { useHistory } from 'react-router-dom';

function PreferenceForm({ 
  sessionLength, updatePreferences,
  breakLength, setBreakLength,
  enableLongBreak, setEnableLongBreak,
  numberOfSessionsBeforeLongBreak,
  setNumberOfSessionsBeforeLongBreak,
  longBreakLength, setLongBreakLength,
  setSessionLength
  }) {

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    updatePreferences({
      session_length: sessionLength,
      break_length: breakLength,
      enable_long_break: enableLongBreak,
      no_of_sessions_before_long_break: numberOfSessionsBeforeLongBreak,
      long_break_length: longBreakLength
    });
    history.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="preferences">
      <label htmlFor="session_length">
        Session Length
      </label>
      <input 
        type="number"
        id="session_length"
        min="0"
        max="60"
        value={sessionLength}
        onChange={e => setSessionLength(e.target.value)}
      />
      <span className="validity"></span>
      <label htmlFor="break_length">
        Break Length
      </label>
      <input 
        type="number"
        id="break_length"
        min="0"
        max="60"
        value={breakLength}
        onChange={e => setBreakLength(e.target.value)}
      />
      <div id="checkbox-container">
        <label htmlFor="enable_long_break">
          Enable Long Break
        </label>
        <input
          type="checkbox"
          id="enable_long_break"
          checked={enableLongBreak}
          onChange={e => {setEnableLongBreak(e.target.checked)}}
        />
      </div>
      <label htmlFor="no_of_sessions_before_long_break">
        Long break after # of sessions
      </label>
      <input
        type="number"
        id="no_of_sessions_before_long_break"
        min="0"
        max="60"
        value={numberOfSessionsBeforeLongBreak}
        onChange={e => setNumberOfSessionsBeforeLongBreak(e.target.value)}
      />
      <label htmlFor="long_break_length">
        Long Break Length
      </label>
      <input
        type="number"
        id="long_break_length"
        min="0"
        max="60"
        value={longBreakLength}
        onChange={e => setLongBreakLength(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PreferenceForm;
