import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import { useAuthContext } from "./hooks/useAuthContext";

function App() {

  const { user } = useAuthContext()

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={ !user ? <LandingPage/> : <Navigate to='/home'/>} />
          <Route path='/home' element={ user ? <HomePage/> : <Navigate to='/'/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;