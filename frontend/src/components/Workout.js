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
    setAccessories(prev => [accessory, ...prev])
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
  }

  return (
    <div>
      <h2>{schedule[day].toUpperCase()} Day</h2>
      <h3>Main Lifts</h3>
      <ul>
        {mains.map(main => (
          <li key={main._id}>
            {main.name}
          </li>
        ))}
      </ul>
      <h3>Accessories</h3>
      <ul>
        {accessories.map((accessory, index) => (
          <li onClick={() => removeAccessory(index)} key={index}>
            {accessory}
          </li>
        ))}
      </ul>
      <h4>Add accessories</h4>
      <AccessoryList accessoryList={accessoryList} onClick={addAccessory} />
      <button onClick={goNextDay}>Finish Workout</button>
    </div>
  )

}

export default Workout