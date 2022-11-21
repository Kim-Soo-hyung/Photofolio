import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import PboardPage from './pboard/PboardPage';
import HeaderPage from './HeaderPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './login/LoginPage';
import { useState } from 'react';
import { UserContext } from './context/UserContext';


function App() {
  const [loginUser, setLoginUser] = useState('');
  return (
    <UserContext.Provider value={{ loginUser, setLoginUser }}>
    <div className="App">
      <HeaderPage/>
      <HomePage/>
      <Route path="/" component={HomePage} exact/>
      <Route path="/pboard" component={PboardPage}/>
      <Route path="/login" component={LoginPage}/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
