import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later...
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div><strong>Login</strong></div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
        id="email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
        id ="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <span><Link to="/Calendar" className="btn btn-primary">Login</Link></span>
        <span> <strong><Link to="/register"> Sign up </Link></strong></span>
      </div>
      <br />
      <div >
        <Link to="/reset"> Forgot Password </Link>
      </div>
      
    </div>
  )
}

export default Login