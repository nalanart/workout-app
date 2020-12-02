import CompletedWorkout from "./CompletedWorkout"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './Overview.css'


function Overview({ day, handleSkip }) {

  const [latestWorkout, setLatestWorkout] = useState()

  useEffect(() => {
    async function getLatestWorkout() {
      const res = await axios.get(`/history?day=${day}`)
      console.log(res)
      setLatestWorkout(res.data)
    }

    try {
      getLatestWorkout()
    } catch(error) {
      throw error
    }
  }, [])

  if(!latestWorkout) {
    return (
      <div className="Overview-container">
        <p>You don't have any previously completed {day} workouts! GET TO WORK!!!!!!!!!!!</p>
        <button onClick={handleSkip}>Skip</button>
      </div>
    )
  }

  return (
    <div className="Overview-container">
      {day === 'rest' ? (
      <div className="rest-day">
        <p>Good job on your workouts! Rest up today!</p>
        <button onClick={handleSkip}>Rest is for the weak</button>
      </div>) : (
      <div className="non-rest-day">
        <h1>Hi Alan,</h1>
        <h2>Today you're doing {day}</h2>
        <button onClick={handleSkip}>Skip</button>
        <h3>Last time you did {day}:</h3>
        <CompletedWorkout workout={latestWorkout}/>
      </div>
      )}
    </div>
  )
}

export default Overview