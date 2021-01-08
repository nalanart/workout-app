import CompletedWorkout from "./CompletedWorkout"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './Overview.css'
import PlanWorkout from "./PlanWorkout"

const parseJwt = token => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

function Overview({ day, session, handleClick, failedExercise, handleSkip, loggedIn }) {

  const [latestWorkout, setLatestWorkout] = useState()
  const [name, setName] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    async function getLatestWorkout() {
      const user = parseJwt(localStorage.getItem('accessToken'))
      const res = await axios.get(`/users/${user._id}`)
      setUser(res.data)
      setName(res.data.firstName)

      const res2 = await axios.get(`/history?day=${day}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      setLatestWorkout(res2.data)
    } 

    try {
      getLatestWorkout()
    } catch(error) {
      throw error
    }
  }, [day])

  // if(!latestWorkout) {
  //   return (
  //     <div>
  //       <div className="Overview-container jumbotron">
  //         <h1>Hi {name},</h1>
  //         <h5>Today you're doing {day}.</h5>
  //         <hr></hr>
  //         <h5>You don't have any previously completed {day} workouts! GET TO WORK!!!!!!!!!!!</h5>
  //         <button className="btn btn-sm btn-info" onClick={handleSkip}>Skip</button>
  //       </div>
  //       <PlanWorkout day={day} session={session} handleClick={handleClick} failedExercise={failedExercise} />
  //     </div>
  //   )
  // }

  return (
    <div className="Overview-container">
      <div className="summary-section">
        <h1>Hi {name},</h1>
        <div className="non-rest-day">
          <h5>Today you're doing <b>{day.toUpperCase()}</b></h5>
          <button className="btn skip-btn" onClick={handleSkip}>Skip</button>
          <hr></hr>
          {!latestWorkout ? (
            <p><i>* You don't have any previously completed {day.toUpperCase()} workouts! GET TO WORK!!!!!!!!!!!</i></p>
          ) : (
            <div>
              <h4>The last time you did {day}:</h4>
              <CompletedWorkout workout={latestWorkout}/>
            </div>
          )}
        </div>
      </div>
      <div className="plan-section">
        <PlanWorkout user={user} day={day} session={session} handleClick={handleClick} failedExercise={failedExercise} />
      </div>
    </div>
  )
}

export default Overview