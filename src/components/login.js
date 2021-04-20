import React,{Component} from 'react'
import './login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Login extends Component {
    state = {
        email:'', 
        password:'',
       
    }
    validate = e =>{
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/validate',{          
                email:this.state.email,
                password:this.state.password,
        }).then((res)=>{
           if(res.data.code===200){
            localStorage.setItem("user", JSON.stringify(res.data.username));   
            window.location = '/';
           }
           else{
            console.log(res.data.code);
            console.log(res);
           }
            //window.location = '/';
            
        })
    }
    handleEmailChange = e =>{
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = e =>{
        this.setState({
            password: e.target.value
        })
    } 
    render() {
        return(    
            <div className="login">
                <div className="login_container">
                    <h1>Sign In</h1>
                    <form>
                        <h5>E-mail</h5>
                        <input type="email" name="email" value = {this.state.email} onChange = {this.handleEmailChange}/>
                        <h5>password</h5>
                        <input type="password" name="password" value = {this.state.password} onChange = {this.handlePasswordChange}/>
                        <Link to="/" >
                            <button type="submit" className="login_signIn" onClick={this.validate}>Sign In</button>
                        </Link>
                    </form>
                    <p>Create an account </p>
                    <Link to="/signup" >
                        <button className="login_register" >Create Account</button>
                    </Link>
                        
                    
                </div>
            </div>
        )
    }
}
export default Login