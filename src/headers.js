import React,{Component} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './headers.css'
import logo from './grocery_img.jpg'
import {Link} from 'react-router-dom'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
class Header extends Component{
    state = {
        user:'',
        accesscode:0
    }
    componentDidMount() {
        var user = localStorage.getItem('user');
        var code = localStorage.getItem('accesscode');
        this.setState({user:JSON.parse(user),accesscode:JSON.parse(code)});

    }
    logout = e => {
        e.preventDefault();
        this.setState({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("accesscode");
      };
    render(){
        return(
            <nav className="header">
                <img className="header_logo" alt="logo" src={logo}/>
                {/* <h1 className="header_title">Grocery</h1> */}
                <div className="header_search">
                    <input type="text" className="header_searchInput"/>
                    <SearchIcon className="header_searchIcon"/>
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
                    <Link to="/" className="header_link">
                        <div className="header_option">
                            {/* <span className="header_optionLineOne">Hello</span> */}
                            <span className="header_optionLineTwo">Add Product</span>
                        </div>
                    </Link>
                )}
                <Link to="/" className="header_link">
                    <div className="header_option">
                        {/* <span className="header_optionLineOne">Hello</span> */}
                        <span className="header_optionLineTwo">Products</span>
                    </div>
                </Link>
                <Link to="/checkout" className="header_link">
                    <div className="header_optionBasket">
                        {/* <span className="header_optionLineOne">Hello</span> */}
                        <ShoppingBasketIcon/>
                        <span className="header_optionLineTwo header_basketCount">2</span>
                    </div>
                </Link>
            </nav>
        )
    }
}
    
export default Header;