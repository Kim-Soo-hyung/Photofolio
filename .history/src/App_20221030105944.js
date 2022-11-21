import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import PboardPage from './pboard/PboardPage';
import HeaderPage from './HeaderPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './login/LoginPage';


function App() {
  return (
    <div className="App">
      <HeaderPage/>
      <Route path="/" component={HomePage} exact/>
      <Route path="/pboard" component={PboardPage}/>
      <Route path="/login" component={LoginPage}/>
    </div>
  );
}

export default App;
