import React, { useState, useEffect, useRef } from 'react'
import AccessoryList from './AccessoryList'
import NewAccessory from './NewAccessory'
import EditExercise from './EditExercise'
import axios from 'axios'
import { Link } from 'react-router-dom'
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

  const initialPut = useRef(false)

  useEffect(() => {
    axios.get(`/exercises?day=${day}&liftType=main`)
      .then(res => {
        setMains(res.data.filter(exercise => exercise[session].repsRegular))
      })
      .catch(error => {
        throw error
      })

    axios.get(`/exercises?day=${day}&liftType=accessory`)
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
  }
// ------------------------------ EDIT EXERCISE ------------------------------
  const editExercise = exercise => {
    setEditMode(true)
    setPassExercise(exercise)
  }

  const saveChanges = editedExercise => {
    initialPut.current = true
    setExerciseToEdit(editedExercise)
    setEditMode(false)
  }
// ----------------------- INCREASE/DECREASE/MAINTAIN WEIGHT ---------------------
  const incrementWeight = exercise => {
    setExerciseToEdit({
      ...exercise,
      weight: exercise.name === 'deadlift' ? exercise.weight + 10 : exercise.weight + 5, // +10 for deadlifts and +5 for squats, bench, row, and overhead press
      failCount: 0 // reset counter
    })
  }

  const decrementWeight = exercise => { // same for both mains and accessories
    setExerciseToEdit({
      ...exercise,
      weight: Math.floor(0.9 * exercise.weight / 5) * 5, // remove 10% when deloading and round down to nearest multiple of 5
      failCount: 0 // reset counter
    })
  }

  const maintainWeight = exercise => {
    setExerciseToEdit({
      ...exercise,
      failCount: exercise.failCount++ // increment fail counter
    })
  }
// --------------------------------------------------------------------------------
  const adjustWeight = async exercise => {
    try {
      const prevExercise = await axios.get(`/exercises/${exercise._id}`)
      if(failedExercise(prevExercise) && prevExercise.failCount < 3) { // first or second time in a row failing exercise
        maintainWeight(exercise)
      } else if(failedExercise(prevExercise) && exercise.failCount === 3) { // third time in a row failing the exercise
        decrementWeight(exercise)
      } else {
        incrementWeight(exercise)
      }
    } catch(error) {
      throw error
    }
  }
// --------------------------------------------------------------------------------

  return (
    <div className="PlanWorkout">
      <h2>PLAN YOUR WORKOUT</h2>
      <h2>{day.toUpperCase()} DAY</h2>
      <div className="main-lifts">
        <h3>main lifts</h3>
        <ul className="main-lifts-ul">
          {mains.map((main, index) => (
            <li key={main._id}>
              <p>{main[session].setsRegular}x{main[session].repsRegular}</p>
              {main[session].setsAmrap && <p>, {main[session].setsAmrap}x{main[session].repsAmrap}+</p>}
              <p>&nbsp;{main.name} @ {main.weight ? 
              <div className="initial-weight-set">
                {!main.reps && <p className="no-previously-completed">{main.weight} lbs</p>}
                {(failedExercise(main) && main.failCount < 3) && <p className="maintain-weight"> {main.weight} lbs (=)</p>}
                {(failedExercise(main) && main.failCount === 3) && <p className="decrement-weight"> {Math.floor(0.9 * main.weight / 5) * 5} lbs (&darr;)</p>}
                {(!failedExercise(main) && main.reps) && <p className="increment-weight"> {main.weight + (main.name === 'deadlift' ? 10 : 5)} lbs (&uarr;)</p>}
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
      <div className="accessory-lifts">
        <h3>Accessories</h3>
        <ul className="accessory-lifts-ul">
          {accessories.map((accessory, index) => (
            <li key={index}>
              <p>{accessory[session].setsRegular}x{accessory[session].repsRegular} {accessory.name} @ {accessory.weight ? 
                <div className="initial-weight-set">
                  {!accessory.reps && <p className="no-previously-completed">{accessory.weight} lbs</p>}
                  {(failedExercise(accessory) && accessory.failCount < 3) && <p className="maintain-weight"> {accessory.weight} lbs (=)</p>}
                  {(failedExercise(accessory) && accessory.failCount === 3) && <p className="decrement-weight"> {Math.floor(0.9 * accessory.weight / 5) * 5} lbs (&darr;)</p>}
                  {(!failedExercise(accessory) && accessory.reps) && <p className="increment-weight"> {accessory.weight + 5} lbs (&uarr;)</p>}
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
        <h4>Add accessories</h4>
        {editMode ? <EditExercise exercise={passExercise} saveChanges={saveChanges} /> : null}
        <AccessoryList session={session} accessoryList={accessoryList} addAccessory={addAccessory} accessories={accessories} />
        <button>Create new</button>
        <NewAccessory handleNameChange={handleNameChange} handleSubmit={handleSubmit} handleSelect={handleSelect} newAccessory={newAccessory} />
      </div>
      <button onClick={() => handleClick(mains, accessories)}>
        Save Workout
      </button>
      <Link to='/workout'>
        View Workout
      </Link>
    </div>
  )
}

export default PlanWorkout