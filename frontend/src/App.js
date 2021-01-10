import './App.css';

import NavBar from './components/NavBar'
import Home from './components/Home'
import Workout from './components/Workout'
import History from './components/History'
import Overview from './components/Overview'
import Register from './components/Register'
import Login from './components/Login'

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import ls from 'local-storage'
const axios = require('axios')

const schedule = ['push', 'pull', 'legs', 'rest', 'push', 'pull', 'legs']

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'))
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

  // useEffect(() => {
  //   const isAuth = async () => {
  //     try {
  //       const res = await axios.get('/auth', {
  //         headers: {
  //           'Authorization': localStorage.getItem('accessToken')
  //         }
  //       })
  //       res.data === true ? setLoggedIn(true) : setLoggedIn(false)

  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   isAuth()
  // })

  const login = () => {
    setLoggedIn('true')
    localStorage.setItem('loggedIn', 'true')
  }

  const logout = () => {
    setLoggedIn('false')
    localStorage.setItem('loggedIn', 'false')
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
        <NavBar loggedIn={loggedIn}
                logout={logout} />
        <Switch>
          <Route exact
                 path="/" 
                 component={Home} />
          <Route path="/overview"
                 render={props => loggedIn === 'true' ? (
                  <Overview {...props} day={schedule[day]} session={session} handleClick={handleClick} failedExercise={failedExercise} handleSkip={goNextDay} loggedIn={loggedIn} />
                 ) : (
                  <Redirect to="/login" />
                 )}>
          </Route>
          <Route path="/workout"
                 render={props => loggedIn === 'true' ? (
                   <Workout {...props} workout={currentWorkout} session={session} goNextDay={goNextDay} failedExercise={failedExercise} />
                 ) : (
                   <Redirect to="/login" />
                 )}>
          </Route>
          <Route path="/history" 
                 render={props => loggedIn === 'true' ? (
                   <History />
                 ) : (
                   <Redirect to="/login" />
                 )}>
          </Route>
          <Route path="/register"
                 component={Register} />
          <Route path="/login"
                 render={props => <Login {...props} login={login} />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
