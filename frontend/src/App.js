import { useEffect, useState } from 'react';
// import { Routes, Route } from 'react-dom';
import { Route, Routes } from "react-router-dom";
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Leagues from './components/Leagues';
import Contact from './components/Contact';
import Main from './components/Main';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);

  useEffect( () => {
    // Connect to the backend
    const fetchData = async () => {
      const res = await fetch('http://localhost:4523/api/users');
      // console.log( 'res.json() --> ', await res.json() );
      const users = await res.json();
      console.log( 'res ----> ', res );
      // const data = await res.json();

      // Set data to the state users variable
      // setUsers(data);
    }

    fetchData();

  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </div>
  );
}

export default App;
