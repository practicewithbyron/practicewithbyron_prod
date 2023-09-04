import './App.css';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { TestPage } from './Pages/TestPage';

class App extends Component {
  render()
  {
    return (
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/test" element={<TestPage/>}></Route>
      </Routes>
    )
  }
}

export default App;