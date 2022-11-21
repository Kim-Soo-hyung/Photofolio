import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import AboutPage from './AboutPage';
import './App.css';
import { UserContext } from './context/UserContext';
import HeaderPage from './HeaderPage';
import HomePage from './HomePage';
import LoginPage from './login/LoginPage';
import MyPage from './my/MyPage';
import PboardPage from './pboard/PboardPage';


function App() {
  const [loginUser, setLoginUser] = useState({});

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
