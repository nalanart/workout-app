import CompletedWorkout from "./CompletedWorkout"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './Overview.css'


function Overview({ day, handleSkip }) {

  const [latestWorkout, setLatestWorkout] = useState()

  useEffect(() => {
    async function getLatestWorkout() {
      const res = await axios.get(`/history?day=${day}`)
      setLatestWorkout(res.data)
    }

    try {
      getLatestWorkout()
    } catch(error) {
      throw error
    }
  }, [day])

  if(!latestWorkout) {
    return (
      <div className="Overview-container">
        <h1>Hi Alan,</h1>
        <h2>Today you're doing {day}</h2>
        <p>You don't have any previously completed {day} workouts! GET TO WORK!!!!!!!!!!!</p>
        <button onClick={handleSkip}>Skip</button>
      </div>
    )
  }

  return (
    <div className="Overview-container jumbotron">
      <h1>Hi Alan,</h1>
      {day === 'rest' ? (
      <div className="rest-day">
        <h2>Today is your rest day</h2>
        <p>Good job on your workouts!</p>
        <button onClick={handleSkip}>Rest is for the weak</button>
      </div>) : (
      <div className="non-rest-day">
        <p>Today you're doing {day}.</p>
        <hr></hr>
        <h4>The last time you did {day}:</h4>
        <CompletedWorkout workout={latestWorkout}/>
        <button className="btn btn-sm btn-info" onClick={handleSkip}>Skip</button>
      </div>
      )}
    </div>
  )
}

export default Overview