import './NewAccessory.css'

function NewAccessory({ handleNameChange, handleSubmit, handleSelect, newAccessory, createNew }) {
  return (
    <div className="NewAccessory">
      <h5><b>Create new accessory</b></h5>
      <form onSubmit={handleSubmit}>
        <div className="form-name-and-type">
          <div className="input-name">
            <label for="name" className="form-label">Exercise Name</label>
            <input id="name" type="text" className="form-control" value={newAccessory.name} onChange={handleNameChange} required />
          </div>
          <div className="input-type">
            <label for="days" class="form-label">Exercise Type</label>
            <select id="days" name="days" className="form-control" onChange={handleSelect}>
              <option value="legs">Legs</option>
              <option value="pull">Pull</option>
              <option value="push">Push</option>
            </select>
          </div>
        </div>
        <div className="form-reps-and-sets">
          <div className="select-sets">
            <label for="sets">Sets</label>
            <select id="sets" name="sets" className="form-control" onChange={handleSelect}>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div className="input-reps">
            <label className="form-check-label" for="reps">Reps</label>
            <div id="reps" className="form-check form-check-inline">
              <input className="form-check-input" id="8-12" name="reps" type="radio" value="8-12" onChange={handleSelect} />
              <label className="form-check-label" for="8-12">8-12</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" id="15-20" name="reps" type="radio" value="15-20" onChange={handleSelect} />
              <label className="form-check-label" for="15-20">15-20</label>
            </div>
          </div>
        </div>
        <button className="btn create-exercise" type="submit" style={{ maxWidth:"15%" }}>Create</button>
      </form>
    </div>
  )
}

export default NewAccessory