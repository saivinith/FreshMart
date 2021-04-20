import React, { Component } from 'react'
import './signup.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Createaccount extends Component{
    state = {
        email:'',
        username:'',
        password:'',
        cpassword:'',
        mobile:''
    }
    handleSignUp = e =>{
        e.preventDefault();
        console.log('fsdf');
        axios.post('http://127.0.0.1:5000/signup',{
            
                email:this.state.email,
                username:this.state.username,
                password:this.state.password,
                cpassword:this.state.cpassword,
                mobile:this.state.mobile   
        }).then((res)=>{
            console.log(res.data);
            window.location = '/';
            if(res.data.code===200){
                localStorage.setItem("user", JSON.stringify(res.data.username));
            }
        })
    }
    handleEmailChange = e =>{
        this.setState({
            email: e.target.value
        })
    }
    handleUsernameChange = e =>{
        this.setState({
            username: e.target.value
        })
    }
    handlePasswordChange = e =>{
        this.setState({
            password: e.target.value
        })
    }
    handleCPasswordChange = e =>{
        this.setState({
            cpassword: e.target.value
        })
    }
    handleMobileChange = e =>{
        this.setState({
            mobile: e.target.value
        })
    }
    render(){
        return(
            
            <div className="register">
                <div className="Signup_container">
                    <h1>Register</h1>
                    <form onSubmit={this.handleSignUp}>
                        <h5>E-mail</h5>
                        <input type="email" name = "email" value = {this.state.email} onChange = {this.handleEmailChange}/>
                        <h5>Username</h5>
                        <input type="text" name = "username" value = {this.state.username} onChange = {this.handleUsernameChange}/>
                        <h5>Password</h5>
                        <input type="password" name = "password" value = {this.state.password} onChange = {this.handlePasswordChange}/>
                        <h5>Confirm Password</h5>
                        <input type="password" name = "cpassword" value = {this.state.cpassword} onChange = {this.handleCPasswordChange}/>
                        <h5>Mobile Number</h5>
                        <input type="number" name = "mobile" value = {this.state.mobile} onChange = {this.handleMobileChange}/>
                        <Link to="/" >
                            <button type="submit" className="signup" onClick={this.handleSignUp}>submit</button>
                        </Link>
                    </form>
                    
                </div>
            </div>
        )
    }
}
export default Createaccount