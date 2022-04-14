

const TimePunch = ({handleSubmit, handleChange, state}) => (         
  <div>
        <form onSubmit={handleSubmit}>
            <label>
              <span>Punch In</span></label>
              <p>
              </p>
              <input name="timePunchIn" value={state.newInfo.timePunch} onChange={handleChange}
             />
            </form>     
            <form onSubmit={handleSubmit}>
            <label>
              <span>Punch Out</span></label>
              <p>
              </p>
              <input name="timePunchOut" value={state.newInfo.timePunch} onChange={handleChange}
             />
            </form>   
  </div>

);

export default TimePunch;     