import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import pboardPage from './pboard/pboardPage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact/>
      <Route path="/pboard" component={pboardPage}/>
    </div>
  );
}

export default App;
