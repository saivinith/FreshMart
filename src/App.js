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
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: 'purple',
//     secondary: 'green',
//     error: 'red',
//   },
// });
class App extends Component {

  state = {
    searchInput:'',
    tempInput:''
}
changeInput = (e) =>{
  this.setState({tempInput:e.target.value})
}
handleClick = () =>{
    this.setState({searchInput:this.state.tempInput})
    localStorage.setItem("searchInput",this.state.searchInput)

}
  render(){
    return (
      <Router history={history}>
        <div className="App">
          <Header handleClick={this.handleClick.bind(this)} changeInput={this.changeInput.bind(this)}/>
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
            <Home searchInput={this.state.searchInput}/>
          </Route>
        </Switch>
        {/* <Footer /> */}
        </div>
      </Router>
    
  );
}

  }
  
export default App;
