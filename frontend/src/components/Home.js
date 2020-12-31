import './Home.css'

export default function Home() {
  return (
    <div className="Home-container">
      <div className="row">
        <div className="col">
          <h2 className="app-description">A workout tracker app modelled after the PPL program to easily plan and keep track of your sessions and progress.</h2>
          <button className="register-btn btn"><a className="register-login-anchor" href="/register"><h2>Register</h2></a></button>
        </div>
        <div className="col">
          <img className="image-1" src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="man holding barbell" width="600" />
        </div>
      </div>
    </div>
  )
}