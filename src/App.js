import React,{Component} from 'react'
import './App.css'
import Header from './headers'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Alert from 'react-bootstrap/Alert'
import Login from './components/login'
import Home from './components/home'
import Createaccount from './components/signup'
import Addproduct from './components/Addproduct'
import Favorite from './components/Favorite'
import history from './history';
import History from './components/History'
class App extends Component {
  render(){
    return (
      <Router history={history}>
        <div className="App">
          <Header/>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Createaccount/>
          </Route>
          <Route path="/add">
            <Addproduct/>
          </Route>
          <Route path="/cart">
            <Favorite/>
          </Route>
          <Route path="/history">
            <History/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>

        </Switch>
        </div>
      </Router>
    
  );
}

  }
  
export default App;
