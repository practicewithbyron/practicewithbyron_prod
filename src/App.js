import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

export class App extends Component {
  render()
  {
    return (
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
      </Routes>
    )
  }
}
