import './App.css';
import { useEffect, useState } from 'react';
import Nav from './components/Nav';

function App() {

  // const [users, setUsers] = useState([]);

  useEffect( () => {
    // Connect to the backend
    const fetchData = async () => {
      const res = await fetch('http://localhost:3023/api/users');
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
    </div>
  );
}

export default App;
