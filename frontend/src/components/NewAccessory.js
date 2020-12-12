import './NewAccessory.css'

function NewAccessory({ handleNameChange, handleSubmit, handleSelect, newAccessory, createNew }) {
  return (
    <div className="NewAccessory">
      <h4>Create new accessory</h4>
      <form className="form-new-accessory" onSubmit={handleSubmit}>
        <div className="form-name-and-type">
          <div className="input-name">
            <label for="name">Exercise Name: </label>
            <input id="name" type="text" placeholder="Exercise Name" value={newAccessory.name} onChange={handleNameChange} required />
          </div>
          <div className="input-type">
            <label for="days">Exercise Type: </label>
            <select id="days" name="days" onChange={handleSelect}>
              <option value="legs">Legs</option>
              <option value="pull">Pull</option>
              <option value="push">Push</option>
            </select>
          </div>
        </div>
        <div className="form-reps-and-sets">
          <div className="select-sets">
            <label for="sets">Sets: </label>
            <select id="sets" name="sets" onChange={handleSelect}>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div className="input-reps">
            <p>Reps: </p>
            <label for="8-12">8-12</label>
            <input id="8-12" name="reps" type="radio" value="8-12" onChange={handleSelect} />
            <label for="15-20">15-20</label>
            <input id="15-20" name="reps" type="radio" value="15-20" onChange={handleSelect} />
          </div>
        </div>
        <button type="submit" style={{ maxWidth:"15%" }}>Save</button>
      </form>
    </div>
  )
}

export default NewAccessory