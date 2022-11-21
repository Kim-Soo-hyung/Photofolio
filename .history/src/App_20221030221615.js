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
import AboutPage from './AboutPage';
import LoginRegister from './login/LoginRegister';
import MyPage from './my/MyPage';


function App() {
  const [loginUser, setLoginUser] = useState('');
  return (
    <UserContext.Provider value={{ loginUser, setLoginUser }}>
    <div className="App">
      <HeaderPage/>
      <Route path="/" component={HomePage} exact/>
      <Route path="/pboard" component={PboardPage}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/about" component={AboutPage}/>
      <Route path="/my" component={MyPage}/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
