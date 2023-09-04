import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { CatalogPage } from './pages/CatalogPage/CatalogPage.jsx';
import { NavigationBar } from './components/NavigationBar/NavigationBar';
import { AdminPage } from './pages/Admin/AdminPage';
import { PracticePage } from './pages/PracticePage/PracticePage';
import { CatalogLandingPage } from './pages/CatalogLandingPage/CatalogLandingPage';
import { ResetPassword } from './pages/ForgotPassword/ResetPassword';
import { StatsPage } from './pages/Stats/StatsPage';
import { PaymentPage } from './pages/Payment/PaymentPage';
import { Home } from './pages/Home/HomePage';

class App extends Component {
  render() {
    return (
      <Router> {/* Router wraps the entire application */}
        <div className="flex-column">
          <NavigationBar/>
          <div style={{height: "100vh"}}>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element={<LoginPage/>}/>
              <Route exact path="/dashboard" element={<DashboardPage/>}/>
              <Route exact path="/catalog" element={<CatalogPage/>}/>
              <Route exact path="/catalog/:name" element={<CatalogLandingPage/>}/>
              <Route exact path="/admin" element={<AdminPage/>}/>
              <Route exact path="/practice/:name" element={<PracticePage/>}/>
              <Route exact path="/passwordreset/:token" element={<ResetPassword/>}/>
              <Route exact path="/stats/:exam" element={<StatsPage/>}/>
              <Route exact path="/payment/:name" element={<PaymentPage/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
