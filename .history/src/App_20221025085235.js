import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import PboardPage from './pboard/PboardPage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact/>
      <Route path="/pboard" component={PboardPage}/>
    </div>
  );
}

export default App;
