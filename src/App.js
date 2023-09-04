import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router
import { Home } from './Pages/Home/Home.jsx';


class App extends Component {
  render() {
    return (
      <Router> {/* Wrap your entire app in a Router */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
