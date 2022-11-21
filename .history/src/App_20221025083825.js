import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage}/>
    </div>
  );
}

export default App;
