import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CheatersList from './components/CheatersList';
import CheaterForm from './components/CheaterForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={CheaterForm} />
          <Route path="/cheaters" Component={CheatersList} />
        </Routes>
        {/* You can add more routes here as needed */}
      </div>
    </Router>
  );
}

export default App;
