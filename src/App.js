import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Alert from './components/Alert';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';

function App() {
  //For Dark and Light Mode:
  const [mode, setMode] = useState("light");

  // For Dark and Light Mode:
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  //For Alert in Alert.js File
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar showAlert={showAlert} mode={mode} toggleStyle={toggleMode} title="NoteSaver
          " />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} mode={mode} />}></Route>
              <Route exact path="/about" element={<About mode={mode} />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} mode={mode} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} mode={mode} />}></Route>
              <Route exact path="/profile" element={<Profile showAlert={showAlert} mode={mode} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
