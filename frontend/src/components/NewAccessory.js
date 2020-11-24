import './NewAccessory.css'

function NewAccessory({ handleNameChange, handleSubmit, handleSelect, newAccessory }) {
  return (
    <div className="NewAccessory">
      <h3>Don't see a specific exercise? Create it!</h3>
      <form className="form-new-accessory" onSubmit={handleSubmit}>
        <input type="text" placeholder="Exercise Name" value={newAccessory.name} onChange={handleNameChange} required />
        <label for="days">Exercise Type:</label>
        <select id="days" name="days" onChange={handleSelect}>
          <option value="legs">Legs</option>
          <option value="pull">Pull</option>
          <option value="push">Push</option>
        </select>
        <label for="sets">Sets:</label>
        <select id="sets" name="sets" onChange={handleSelect}>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <div className="form-reps">
          <p>Reps:</p>
          <label for="8-12">8-12</label>
          <input id="8-12" name="reps" type="radio" value="8-12" onChange={handleSelect} />
          <label for="15-20">15-20</label>
          <input id="15-20" name="reps" type="radio" value="15-20" onChange={handleSelect} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NewAccessory