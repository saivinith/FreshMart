import React,{Component} from 'react'
import './App.css'
import Header from './headers'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Alert from 'react-bootstrap/Alert'
import Login from './components/login'
import Home from './components/home'
import Footer from './components/footer'
import Createaccount from './components/signup'
import Addproduct from './components/Addproduct'
import Favorite from './components/Favorite'
import history from './history';
import History from './components/History'
import ProductFilter from './components/ProductFilter'
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
    filterCategory:[],
    filterPrice:'',
    tempInput:''
}
changeInput = (e) =>{
  this.setState({tempInput:e.target.value})
  console.log('In changeInput')
}
applyCategoryFilter = (e) =>{
  var temp = [];
  temp = this.state.filterCategory.map(function(item) {
    return item;
  })
  //temp.push(this.state.filterCategory);
  if(e.target.checked)
  {temp.push(e.target.name)}
  else
  {
    temp = temp.filter(function(item) {
    return item !== e.target.name
  })
  }
  this.setState({
    filterCategory: temp});
    console.log(this.state.filterCategory);
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
            <ProductFilter applyCategoryFilter={this.applyCategoryFilter.bind(this)}/>
            <div className="add-filter-space">
            <Home searchInput={this.state.searchInput} filterCategory = {this.state.filterCategory}/>
            </div>
          </Route>
        </Switch>
       <Footer />
        </div>
      </Router>
    
  );
}

  }
  
export default App;
