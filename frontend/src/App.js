import { useEffect, useState } from 'react';
// import { Routes, Route } from 'react-dom';
import { Route, Routes } from "react-router-dom";
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Leagues from './components/Leagues';
import Contact from './components/Contact';
import Main from './components/Main';
import Profile from './components/Profile';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);

  useEffect( () => {
    // Connect to the backend
    const fetchData = async () => {
      const res = await fetch('http://localhost:4523/api/users');
      // console.log( 'res.json() --> ', await res.json() );
      const users = await res.json();
      console.log( 'users ----> ', users );
      // const data = await res.json();

      // Set data to the state users variable
      setUsers(users);
    }

    fetchData();
    // console.log( 'from app.js useEffect - users --> ', users );

  }, []);


  return (
    <div className="App hwuBox">
      <header className="App-header hwuRow">
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile users={users} />} />
        </Routes>
      </main>
        <footer className="hwuRow hwuFooter">
          <Footer />
        </footer>
    </div>
  );
}

export default App;
