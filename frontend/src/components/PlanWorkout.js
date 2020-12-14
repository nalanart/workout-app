import React, { useState, useEffect, useRef } from 'react'
import AccessoryList from './AccessoryList'
import NewAccessory from './NewAccessory'
import EditExercise from './EditExercise'
import axios from 'axios'
import './PlanWorkout.css'

function PlanWorkout({ day, session, handleClick, failedExercise }) {
  const [mains, setMains] = useState([])
  const [accessories, setAccessories] = useState([])
  const [accessoryList, setAccessoryList] = useState([])
  const [newAccessory, setNewAccessory] = useState({
    name: '',
    day: 'legs',
    liftType: 'accessory',
    sessionOne: {
      setsRegular: 3,
      repsRegular: '',
      setsAmrap: '',
      repsAmrap: ''
    },
    sessionTwo: {
      setsRegular: 3,
      repsRegular: '',
      setsAmrap: '',
      repsAmrap: ''
    },
    weight: 0,
  })
  const [editMode, setEditMode] = useState(false)
  const [exerciseToEdit, setExerciseToEdit] = useState({})

  const [weight, setWeight] = useState(0)
  const [passExercise, setPassExercise] = useState({})
  const [creating, setCreating] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const initialPut = useRef(false)

  useEffect(() => {
    axios.get(`/exercises?day=${day}&liftType=main`, {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    })
      .then(res => {
        setMains(res.data.filter(exercise => exercise[session].repsRegular !== ''))
      })
      .catch(error => {
        throw error
      })

    axios.get(`/exercises?day=${day}&liftType=accessory`, {
      headers: {
      'Authorization': localStorage.getItem('accessToken')
      }
    })
      .then(res => {
        setAccessoryList(res.data)
      })
      .catch(error => {
        throw error
      })

  }, [day, session])

  useEffect(() => {
    const updateExercise = async () => {
      await axios.put(`/exercises/${exerciseToEdit._id}`, exerciseToEdit)
      if(exerciseToEdit.liftType === 'main') {
        const res = await axios.get(`/exercises?day=${day}&liftType=main`)
        setMains(res.data.filter(exercise => exercise[session].repsRegular))
      } else if(exerciseToEdit.liftType === 'accessory') {
        const res = await axios.get(`/exercises?day=${day}&liftType=accessory`)
        setAccessories(prev => res.data.filter(accessory => {
          for(let i = 0; i < prev.length; i++) {
            if(prev[i]._id === accessory._id) {
              return true
            }
          }
          return false
        }))
      }
    }
    if(initialPut.current) {
      try {
        updateExercise()
        setWeight(0)
      } catch(error) {
        throw error
      }
    }
    initialPut.current = false
  }, [exerciseToEdit])

  const addAccessory = accessory => {
    setAccessories(prev => [...prev, accessory])
    setAccessoryList(prev => prev.filter(acc => acc !== accessory))
  }

  const removeAccessory = (accessory, targetIndex) => {
    setAccessories(prev => prev.filter((accessory, index) => index !== targetIndex))
    setAccessoryList(prev => [...prev, accessory])
    setEditMode(false)
    setExerciseToEdit({})
  }

  const handleNameChange = ({ target }) => {
    const { value } = target
    setNewAccessory(prev => ({
      ...prev,
      name: value
    }))
  }

  const handleSelect = ({ target }) => {
    const { value } = target
    setNewAccessory(prev => {
      if(value === 'legs' || value === 'push' || value === 'pull') {
        return {
          ...prev,
          day: value
        }
      }
      else if(value === '8-12' || value === '15-20') {
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

  const setInitialWeight = exercise => {
    initialPut.current = true
    setExerciseToEdit({
      ...exercise,
      weight: weight
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    axios.post('/exercises', newAccessory).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    setAccessoryList(prev => [...prev, newAccessory])
    setNewAccessory({
      name: '',
      day: newAccessory.day,
      liftType: 'accessory',
      sessionOne: {
        setsRegular: newAccessory.sessionOne.setsRegular,
        repsRegular: newAccessory.sessionOne.repsRegular,
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: newAccessory.sessionTwo.setsRegular,
        repsRegular: newAccessory.sessionTwo.repsRegular,
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
    })
    setCreating(false)
  }
// ------------------------------ EDIT EXERCISE ------------------------------
  const editExercise = exercise => {
    setEditMode(prev => {
      if(exercise !== passExercise) {
        return true
      }
      return !prev
    })
    setPassExercise(exercise)
  }

  const saveChanges = editedExercise => {
    initialPut.current = true
    setExerciseToEdit(editedExercise)
    setEditMode(false)
  }

  const deleteExercise = async id => {
    await axios.delete(`/exercises/${id}`)
  }

  return (
    <div className="PlanWorkout-container">
      <h3>{day.toUpperCase()} DAY</h3>
      <div className="main-lifts">
        <div className="main-lifts-container">
          <h3 className="section-name">Main Lifts</h3>
          <ul className="main-lifts-ul">
            {mains.map(main => (
              <li key={main._id}>
                <p>{main[session].setsRegular}x{main[session].repsRegular}</p>
                {main[session].setsAmrap && <p>, {main[session].setsAmrap}x{main[session].repsAmrap}+</p>}
                <p>&nbsp;{main.name} @ {main.weight ? 
                <div className="initial-weight-set">
                  {main.reps.length === 0 && <p className="no-previously-completed">{main.weight} lbs</p>}
                  {(failedExercise(main) && main.failCount > 0 && main.failCount < 3) && <p className="maintain-weight"> {main.weight} lbs (=)</p>}
                  {(failedExercise(main) && main.failCount === 0) && <p className="decrement-weight"> {main.weight} lbs (&darr;)</p>}
                  {(!failedExercise(main) && main.reps.length > 0) && <p className="increment-weight"> {main.weight} lbs (&uarr;)</p>}
                </div> : 
                <div className="initial-weight-not-set">
                  <input placeholder="Set Initial Weight (lbs)" type="number" min="0" step="2.5" onChange={e => setWeight(e.target.value)} />
                  <button onClick={() => setInitialWeight(main)}>Set</button>
                </div>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="accessory-lifts">
        <div className="accessories-container">
          <h3 className="section-name">Accessories</h3>
          <ul className="accessory-lifts-ul">
            {accessories.map((accessory, index) => (
              <li key={index}>
                <p>{accessory[session].setsRegular}x{accessory[session].repsRegular} {accessory.name} @ {accessory.weight ? 
                  <div className="initial-weight-set">
                    {accessory.reps.length === 0 && <p className="no-previously-completed">{accessory.weight} lbs</p>}
                    {(failedExercise(accessory) && accessory.failCount > 0 && accessory.failCount < 3) && <p className="maintain-weight"> {accessory.weight} lbs (=)</p>}
                    {(failedExercise(accessory) && accessory.failCount === 0) && <p className="decrement-weight"> {accessory.weight} lbs (&darr;)</p>}
                    {(!failedExercise(accessory) && accessory.reps.length > 0) && <p className="increment-weight"> {accessory.weight} lbs (&uarr;)</p>}
                  </div> : 
                  <div className="initial-weight-not-set">
                    <input placeholder="Set Initial Weight (lbs)" type="number" min="0" step="2.5" onChange={e => setWeight(e.target.value)} />
                    <button onClick={() => setInitialWeight(accessory)}>Set</button>
                  </div>}
                </p>
                <div className="buttons-div">
                  <button onClick={() => editExercise(accessory)}>Edit</button>
                  <button onClick={() => removeAccessory(accessory, index)}>x</button>
                </div>
              </li>
            ))}
          </ul>
          {editMode && <EditExercise exercise={passExercise} saveChanges={saveChanges} deleteExercise={deleteExercise} />}
          <h4>Add accessories</h4>
          <AccessoryList accessoryList={accessoryList} addAccessory={addAccessory} accessories={accessories} />
          {!creating && <button onClick={() => setCreating(prev => !prev)} style={{ marginBottom: "3.5%" }}>Create new</button>}
          {creating && <NewAccessory handleNameChange={handleNameChange} handleSubmit={handleSubmit} handleSelect={handleSelect} newAccessory={newAccessory} />}
        </div>
      </div>
      <button className="save-workout" onClick={() => {
        handleClick(mains, accessories)
        setShowAlert(true)
        }}>
        Save Workout
      </button>
      {showAlert && <div className="alert alert-success alert-dismissable" role="alert">
                      Your workout has been created! View it in the 'Current Workout' tab.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>}
    </div>
  )
}

export default PlanWorkout