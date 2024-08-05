import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    props.setLoggedIn(true)
    props.setEmail(email)
    navigate('/calendar', {state:{email}})
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
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
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