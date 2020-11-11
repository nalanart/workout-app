import './App.css';
import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Workout from './components/Workout'

function App() {

  return (
    <div>
      <h1>Workout App</h1>
      <NavBar />
      <Workout />
    </div>
  )

}

export default App;
