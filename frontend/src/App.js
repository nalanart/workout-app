import './App.css';
import NavBar from './components/NavBar'
import PlanWorkout from './components/PlanWorkout'
import Workout from './components/Workout'
import History from './components/History'

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

function App() {

  return (
    <div>
      <Router>
        <h1>Workout App</h1>
        <NavBar />
        <Switch>
          <Route path="/plan" component={PlanWorkout} />
          <Route path="/workouts/:workoutId" component={Workout} />
          <Route path="/history" component={History} />
        </Switch>
      </Router>
      
    </div>
  )

}

export default App;
