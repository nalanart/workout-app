import { useState, useEffect } from 'react'
import './EditExercise.css'
const axios = require('axios')


function EditExercise({ exercise, saveChanges, deleteExercise }) {

  const [exerciseEdit, setExerciseEdit] = useState({})

  useEffect(() => {
    setExerciseEdit(exercise)
  }, [exercise])

  const handleChange = ({ target }) => {
    const { value } = target
    setExerciseEdit(prev => ({
      ...prev,
      name: value
    }))
  }

  const handleSelect = ({ target }) => {
    const { value } = target
    setExerciseEdit(prev => {
      if(value === '8-12' || value === '15-20') {
        return {
          ...prev,
          sessionOne: {
            ...prev.sessionOne,
            repsRegular: value
          },
          sessionTwo: {
            ...prev.sessionTwo,
            repsRegular: value
          }
        }
      }
      else if(value === '3' || value === '4' || value === '5') {
        return {
          ...prev,
          sessionOne: {
            ...prev.sessionOne,
            setsRegular: value
          },
          sessionTwo: {
            ...prev.sessionTwo,
            setsRegular: value
          }
        }
      }
    })
  }

  const handleWeight = ({ target }) => {
    const { value } = target
    setExerciseEdit(prev => ({
      ...prev,
      weight: value
    }))
  }

  return (
    <div className="EditExercise">
      <h3>Edit Exercise</h3>
      <form className="form-edit-exercise">
        <label for="exercise-name">Name:</label>
        <input id="exercise-name" value={exerciseEdit.name} onChange={handleChange} />
        <label for="sets">Sets:</label>
        <select id="sets" name="sets" onChange={handleSelect}>
          <option value='3' selected={exercise.sessionOne.setsRegular === "3"}>3</option>
          <option value='4' selected={exercise.sessionOne.setsRegular === "4"}>4</option>
          <option value='5' selected={exercise.sessionOne.setsRegular === "5"}>5</option>
        </select>
        <div className="form-reps">
          <p>Reps:</p>
          <label for="8-12">8-12</label>
          <input id="8-12" name="reps" type="radio" value="8-12" onChange={handleSelect} />
          <label for="15-20">15-20</label>
          <input id="15-20" name="reps" type="radio" value="15-20" onChange={handleSelect} />
        </div>
        <div className="form-weight">
          <p>Weight (lbs):</p>
          <input type="number" placeholder={exercise.weight} value={exerciseEdit.weight} min="0" step="2.5" onChange={handleWeight} disabled={!exercise.weight}/>
        </div>
        <button className="btn btn-info" onClick={() => saveChanges(exerciseEdit)}>Save</button>
        <button className="btn btn-info" onClick={() => deleteExercise(exerciseEdit._id)}>Delete</button>
      </form>
    </div>
  )
}

export default EditExercise
