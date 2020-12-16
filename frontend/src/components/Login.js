import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
const axios = require('axios')

function Login({ login }) {
  let history = useHistory()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = ({ target }) => {
    const { value } = target
    setUser({
      ...user,
      [ target.name ]: value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios
      .post('/login', user)
      .then(res => {
        login()
        const jwt = res.data.accessToken
        localStorage.setItem('accessToken', 'Bearer ' + jwt)
        history.push('/overview')
      })
      .catch(err => {
        setMessage(err.response.data)
        console.log(err.response.data)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="form-group col-md-3">Log in</h2>
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
            <button className="btn btn-primary" type="submit">Log in</button>
          </div>
        </div>
        {message && <p className="col-sm-10" style={{ color: 'red' }}>{message}</p>}
      </form>
      <div className="col-sm-10">
        Don't have an account? <Link to="/register">Create one now</Link>
      </div>
    </div>
  )
}

export default Login