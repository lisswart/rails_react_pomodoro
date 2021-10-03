function PreferenceForm({ 
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  enableLongBreak, setEnableLongBreak,
  longBreakLength, setLongBreakLength,
  setUser }) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="preferences">
      <label htmlFor="sessionLength">
        Session Length
      </label>
      <input
        type="text"
        id="sessionLength"
        value={sessionLength}
        onChange={e => setSessionLength(e.target.value)}
      />
      <label htmlFor="breakLength">
        Break Length
      </label>
      <input
        type="text"
        id="breakLength"
        value={breakLength}
        onChange={e => setBreakLength(e.target.value)}
      />
      <>
        <label htmlFor="enableLongBreak">
          Enable Long Break
        </label>
        <input
          type="checkbox"
          id="enableLongBreak"
          value={enableLongBreak}
          onChange={e => setEnableLongBreak(e.target.value)}
        />
      </>
      <label htmlFor="longBreakLength">
        Long Break Length
      </label>
      <input
        type="text"
        id="longBreakLength"
        value={longBreakLength}
        onChange={e => setLongBreakLength(e.target.value)}
      />
    </form>
  );
}

export default PreferenceForm;
