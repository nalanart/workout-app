import './Register.css'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
const axios = require('axios')

function Register() {
  let history = useHistory()
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = ({ target }) => {
    const { value } = target
    setNewUser({
      ...newUser,
      [ target.name ]: value
    })
  }

  const register = async event => {
    event.preventDefault()
    const form = document.getElementsByName('register')[0]
    axios
      .post('/register', newUser)
      .then(res => {
        history.push('/login')
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        })
        setMessage('Account successfully created!')
      })
      .catch(err => setMessage(err.response.data))
  }

  return (
    <div>
      <form name="register" onSubmit={register}>
        <h2 className="form-group col-md-3">Register</h2>
        <div className="form-group col-md-3">
          <label for="input-first-name">First Name</label>
          <input type="text" name="firstName" className="form-control" id="input-first-name" onChange={handleChange} />
        </div>
        <div className="form-group col-md-3">
          <label for="input-last-name">Last Name</label>
          <input type="text" name="lastName" className="form-control" id="input-last-name" onChange={handleChange} />
        </div>
        <div className="form-group col-md-3">
          <label for="input-email">Email</label>
          <input type="email" name="email" className="form-control" id="input-email" onChange={handleChange} />
        </div>
        <div className="form-group col-md-3">
          <label for="input-password">Password</label>
          <input type="password" name="password" className="form-control" id="input-password" onChange={handleChange} />
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <button className="btn btn-primary" type="submit">Create account</button>
          </div>
        </div>
        {message === 'Account successfully created!' ? <div className="form-group col-sm-10 success">{message}</div> : <div className="form-group col-sm-10 error">{message}</div>}
      </form>
      <div className="col-sm-10">
        Already have an account? <Link to="/login">Log in now</Link>
      </div>
    </div>
  )
}

export default Register