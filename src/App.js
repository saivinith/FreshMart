

import './App.css'
import Header from './headers'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Alert from 'react-bootstrap/Alert'
import Login from './components/login'
import Home from './components/home'
import Createaccount from './components/signup'
function App() {
  return (
      <Router>
        <div className="App">
          <Header/>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Createaccount/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
        
        </div>
      </Router>
    
  );
}

export default App;
