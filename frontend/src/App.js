import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAccount from '../src/components/forms/createacc'
import Login from '../src/components/forms/login'
import Reservation from '../src/components/forms/reservation'
import HomePage from '../src/components/homepage/homepage'

function App() {
  React.useEffect(() => {
    document.title = 'Pemesanan';
  }, []);

  return (
    <Router>
    <div className="App container">
      <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/signup" element={<CreateAccount />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/reservation" element={<Reservation />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
