import { BrowserRouter, Route, Routes } from 'react-router-dom'
import logo from './logo.svg';
import Login from './login'
import Calendar from './calendar'
import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          /> */}
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/calendar" element={<Calendar setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
