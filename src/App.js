import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { CatalogPage } from './pages/CatalogPage/CatalogPage.jsx';
import { NavigationBar } from './components/NavigationBar/NavigationBar';
import { PracticePage } from './pages/PracticePage/PracticePage';
import { CatalogLandingPage } from './pages/CatalogLandingPage/CatalogLandingPage';
import { ResetPassword } from './pages/LoginPage/Forms/ResetPasswordForm.jsx';
import { StatsPage } from './pages/Stats/StatsPage';
import { PaymentPage } from './pages/Payment/PaymentPage';
import { Home } from './pages/Home/HomePage';
import { LearningPlanPage } from './pages/LearningPlan/LearningPlanPage';
import { TrainingPage } from './pages/TrainingPage/TrainingPage';
import { Page404 } from './pages/Error/Page404';
import { TAndCPage } from './pages/TandC/TandCPage';
import { ReactNotifications } from 'react-notifications-component';

class App extends Component {
  render() {
    return (
      <Router> {/* Router wraps the entire application */}
        <div className="flex-column min-height-100vh">
          <ReactNotifications />
          <NavigationBar/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element={<LoginPage/>}/>
              <Route exact path="/catalog" element={<CatalogPage/>}/>
              <Route exact path="/catalog/:name" element={<CatalogLandingPage/>}/>
              <Route exact path="/passwordreset/:token" element={<ResetPassword/>}/>
              <Route exact path="/tandc" element={<TAndCPage/>}/>
              <Route exact path="/*" element={<Page404/>}/>
              {/* Routes requiring a login */}
              <Route exact path="/dashboard" element={<DashboardPage/>}/>
              <Route exact path="/practice/:name" element={<PracticePage/>}/>
              <Route exact path="/stats/:exam" element={<StatsPage/>}/>
              <Route exact path="/payment/:exam" element={<PaymentPage/>}/>
              <Route exact path="/learningpath" element={<LearningPlanPage/>}/>
              <Route exact path="/training" element={<TrainingPage/>}/>
            </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
