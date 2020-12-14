import './App.css';

import NavBar from './components/NavBar'
import Home from './components/Home'
import PlanWorkout from './components/PlanWorkout'
import Workout from './components/Workout'
import History from './components/History'
import Overview from './components/Overview'
import Register from './components/Register'
import Login from './components/Login'

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import ls from 'local-storage'

const schedule = ['push', 'pull', 'legs', 'rest', 'push', 'pull', 'legs']

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [day, setDay] = useState(0)
  const [session, setSession] = useState('sessionOne')
  const [currentWorkout, setCurrentWorkout] = useState({
    mains: [],
    accessories: []
  })
  
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

  const toggleLogin = () => {
    setLoggedIn(!loggedIn)
  }

  const logout = () => {
    setLoggedIn(false)
  }

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
      <Router>
        <div className="logo-container bg-light">
          <Link to="/"><img src="https://www.flaticon.com/svg/static/icons/svg/249/249187.svg" alt="dumbbell" height="70"/></Link>
          <h1 className="app-name">&nbsp;Workout App</h1>
        </div>
        <NavBar loggedIn={loggedIn} logout={logout} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/overview" render={props => <Overview {...props} day={schedule[day]} handleSkip={goNextDay} />} />
          <Route path="/plan" render={props => <PlanWorkout {...props} day={schedule[day]} session={session} handleClick={handleClick} failedExercise={failedExercise} />} />
          <Route path="/workout" render={props => <Workout {...props} workout={currentWorkout} session={session} goNextDay={goNextDay} failedExercise={failedExercise} />} />
          <Route path="/history" component={History} />
          <Route path="/register" component={Register} />
          <Route path="/login" render={props => <Login {...props} toggleLogin={toggleLogin} />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
