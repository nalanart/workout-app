import './App.css';

import NavBar from './components/NavBar'
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
  const [currentWorkout, setCurrentWorkout] = useState({})

  useEffect(() => {
    setDay(ls.get('day') || 0)
    setCurrentWorkout(ls.get('currentWorkout') || {})
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
    <div>
      <Router>
        <h1>Workout App</h1>
        <NavBar />
        <Switch>
          <Route path="/overview" render={props => <Overview {...props} day={schedule[day]} handleSkip={goNextDay} />} />
          <Route path="/plan" render={props => <PlanWorkout {...props} day={schedule[day]} session={session} handleClick={handleClick} />} />
          <Route path="/workout" render={props => <Workout {...props} workout={currentWorkout} goNextDay={goNextDay} />} />
          <Route path="/history" component={History} />
        </Switch>
      </Router>
      
    </div>
  )
}

export default App;
