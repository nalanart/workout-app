import React, { useState, useEffect } from 'react'
import AccessoryList from './AccessoryList'
import axios from 'axios'

const schedule = ['push', 'pull', 'legs', 'rest', 'push', 'pull', 'legs']

function Workout() {
  const [day, setDay] = useState(1)
  const [mains, setMains] = useState([])
  const [accessories, setAccessories] = useState([])
  const [accessoryList, setAccessoryList] = useState([])
  const [session, setSession] = useState(1)
  
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
      <button onClick={goNextDay}>Finish Workout</button>
    </div>
  )

}

export default Workout