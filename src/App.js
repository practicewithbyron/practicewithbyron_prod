import './App.css';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';

class App extends Component {
  render()
  {
    return (
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
      </Routes>
    )
  }
}

export default App;