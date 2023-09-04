import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router

import { Home } from './Pages/Home/Home';
import { TestPage } from './Pages/TestPage';
import { TestPage2 } from './Pages/TestPage2';

class App extends Component {
  render() {
    return (
      <Router> {/* Wrap your entire app in a Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test2" element={<TestPage2 />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
