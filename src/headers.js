import React,{Component} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './headers.css'
import logo from './freshmart-logo.png'
import {Link} from 'react-router-dom'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
// import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
class Header extends Component{
    state = {
        user:'',
        accesscode:0,
        cart:0
    }
    componentDidMount() {
        var user = localStorage.getItem('user');
        var code = localStorage.getItem('accesscode');
        this.setState({user:JSON.parse(user),accesscode:JSON.parse(code)});
        this.setState({cart:localStorage.getItem('cartItems')})
    }
    logout = e => {
        e.preventDefault();
        this.setState({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("accesscode");
        localStorage.removeItem("cartItems");
        // axios.get('http://127.0.0.1:5000/logout')
        // .then((res)=>{
        //     if(res.data.code===200){
        //         window.location = '/';   
        //     }
        // })
        window.location = '/';   
      };
  
    
    render(){
        return(
            <nav className="header" expand="lg">
                <img className="header_logo" alt="logo" src={logo}/>
                <div className="header_search">
                    <input type="text" value={this.props.searchInput} onChange = {this.props.changeInput} name = "search" className="header_searchInput"/>
                    <SearchIcon className="header_searchIcon" onClick={this.props.handleClick}/>
                </div>
                
                        
                {!this.state.user ? (
                  <Link to="/login" className="header_link">
                  <div className="header_option">
                      <span className="header_optionLineOne">Hello</span>
                      <span className="header_optionLineTwo">Sign In</span>
                  </div>
                    </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="header_link">
                    <div className="header_option">
                    <span className="header_optionLineOne">Hello {this.state.user}</span>
                        <span className="header_optionLineTwo">Logout</span>
                    </div>
                  </Link>
                )}
                {this.state.user && this.state.accesscode > 0 && (
                    <Link to="/add" className="header_link">
                        <div className="header_option">
                            {/* <span className="header_optionLineOne">Hello</span> */}
                            <span className="header_optionLineTwo">Add Product</span>
                        </div>
                    </Link>
                )}
                {this.state.user && this.state.accesscode === 0 && (
                    <Link to="/history" className="header_link">
                        <div className="header_option">
                            {/* <span className="header_optionLineOne">Hello</span> */}
                            <span className="header_optionLineTwo">History</span>
                        </div>
                    </Link>
                )}
                <Link to="/" className="header_link">
                    <div className="header_option">
                        {/* <span className="header_optionLineOne">Hello</span> */}
                        <span className="header_optionLineTwo">Products</span>
                    </div>
                </Link>
                <Link to="/cart" className="header_link">
                    <div className="header_optionBasket">
                        {/* <span className="header_optionLineOne">Hello</span> */}
                        <ShoppingBasketIcon/>
                        <span className="header_optionLineTwo header_basketCount">{this.state.cart}</span>
                    </div>
                </Link>
            </nav>
        )
    }
}
    
export default Header;