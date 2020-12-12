import './App.css';

import NavBar from './components/NavBar'
import Home from './components/Home'
import PlanWorkout from './components/PlanWorkout'
import Workout from './components/Workout'
import History from './components/History'
import Overview from './components/Overview'

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import ls from 'local-storage'

const schedule = ['push', 'pull', 'legs', 'rest', 'push', 'pull', 'legs']

function App() {

  const [day, setDay] = useState(0)
  const [session, setSession] = useState('sessionOne')
  const [currentWorkout, setCurrentWorkout] = useState({
    mains: [],
    accessories: []
  })
  const [showAlert, setShowAlert] = useState(false)
  
  useEffect(() => {
    setDay(ls.get('day') || 0)
    setCurrentWorkout(ls.get('currentWorkout') || {mains: [], accessories: []})
  }, [])

  useEffect(() => {
    ls.set('day', day)
    setSession(() => {
      if(day > 3) {
        return 'sessionTwo'
      } else {
        return 'sessionOne'
      }
    })
  }, [day])

  useEffect(() => {
    ls.set('currentWorkout', currentWorkout)
  }, [currentWorkout])

  const failedExercise = exercise => {
    for(let i = 0; i < exercise.reps.length; i++) {
      if(exercise.reps[i] < (exercise.liftType === 'main' ? 5 : (exercise[session].repsRegular === '8-12' ? 12 : 20))) {
        return true // failed if any set was done for less than 5 reps
      }
    }
    return false
  }

  const handleClick = (mains, accessories) => {
    setCurrentWorkout({
      mains: mains,
      accessories: accessories
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
  }

  return (
    <div className="App">
      {/* {showAlert && <div className="alert alert-success alert-dismissable" role="alert">
                      Your workout has been created! View it in the 'Current Workout' tab.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>} */}
      <Router>
        <div className="logo-container bg-light">
          <img src="https://www.flaticon.com/svg/static/icons/svg/249/249187.svg" alt="dumbbell" height="70" />
          <h1 className="app-name">&nbsp;Workout App</h1>
        </div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/overview" render={props => <Overview {...props} day={schedule[day]} handleSkip={goNextDay} />} />
          <Route path="/plan" render={props => <PlanWorkout {...props} day={schedule[day]} session={session} handleClick={handleClick} failedExercise={failedExercise} />} />
          <Route path="/workout" render={props => <Workout {...props} workout={currentWorkout} session={session} goNextDay={goNextDay} failedExercise={failedExercise} />} />
          <Route path="/history" component={History} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
