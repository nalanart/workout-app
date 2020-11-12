import React, { useState, useEffect } from 'react'
import AccessoryList from './AccessoryList'
import NewAccessory from './NewAccessory'
import axios from 'axios'

const schedule = ['push', 'pull', 'legs', 'rest', 'push', 'pull', 'legs']

function Workout() {
  const [day, setDay] = useState(1)
  const [mains, setMains] = useState([])
  const [accessories, setAccessories] = useState([])
  const [accessoryList, setAccessoryList] = useState([])
  const [session, setSession] = useState(1)
  const [newAccessory, setNewAccessory] = useState({
    name: '',
    day: 'legs',
    liftType: 'accessory',
    sessionOne: {
      setsRegular: '3',
      repsRegular: '',
      setsAmrap: '',
      repsAmrap: ''
    },
    sessionTwo: {
      setsRegular: '3',
      repsRegular: '',
      setsAmrap: '',
      repsAmrap: ''
    }
  })
  
  const sessionNum = session === 1 ? 'sessionOne' : 'sessionTwo'

  useEffect(() => {

    setSession(() => {
      if(day > 3) {
        return 2
      } else {
        return 1
      }
    })

    axios.get(`/exercises?day=${schedule[day]}&liftType=main`).then(res => {
      setMains(res.data)
    })

    axios.get(`/exercises?day=${schedule[day]}&liftType=accessory`).then(res => {
      setAccessoryList(res.data)
    })

  }, [day])

  const addAccessory = accessory => {
    setAccessories(prev => [...prev, accessory])
  }

  const removeAccessory = targetIndex => {
    setAccessories(prev => prev.filter((accessory, index) => index !== targetIndex))    
  }

  const handleChange = ({ target }) => {
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

  /*
  const handleRadio = ({ target }) => {
    const { value } = target
    setNewAccessory(prev => ({
      ...prev,
      

    }))
  }
*/
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
      }
    })
  }

  const goNextDay = () => {
    setDay(prev => {
      if(prev === 6) {
        return 0
      } else {
        return prev + 1
      }
    })
    setAccessories([])
  }

  return (
    <div>
      <h2>{schedule[day].toUpperCase()} Day</h2>
      <h3>Main Lifts</h3>
      <ul>
        {mains.map(main => (
          !(main[sessionNum].setsRegular) ? null : <li key={main._id}>
            <p>{main[sessionNum].setsRegular}x{main[sessionNum].repsRegular}</p>
            {main[sessionNum].setsAmrap && <p>, {main[sessionNum].setsAmrap}x{main[sessionNum].repsAmrap}</p>}
            <p>&nbsp;{main.name}</p>
          </li>
        ))}
      </ul>
      <h3>Accessories</h3>
      <ul>
        {accessories.map((accessory, index) => (
          <li onClick={() => removeAccessory(index)} key={index}>
            <p>{accessory[sessionNum].setsRegular}x{accessory[sessionNum].repsRegular} {accessory.name}</p>
          </li>
        ))}
      </ul>
      <h4>Add accessories</h4>
      <AccessoryList accessoryList={accessoryList} addAccessory={addAccessory} accessories={accessories} />
      <NewAccessory handleChange={handleChange} handleSubmit={handleSubmit} handleSelect={handleSelect} newAccessory={newAccessory} />
      <button onClick={goNextDay}>Finish Workout</button>
    </div>
  )

}

export default Workout