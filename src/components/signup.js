import React, { Component } from 'react'
import './signup.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import { green } from '@material-ui/core/colors'
class Createaccount extends Component{
    state = {
        email:'',
        username:'',
        password:'',
        cpassword:'',
        mobile:'',
        errorEmail:false,
        errorName:false,
        errorPwd:false,
        errorCPwd:false,
        errorMobile:false,
        error:false,
        errorValue:'',
        strongPwd:false,
        color:'black'
    }
    handleSignUp = e =>{
        e.preventDefault();
            var re = /\S+@\S+\.\S+/;
            //this.setState({error:true,errorValue:'*Please enter valid information'})
            if(this.state.email.length===0){
                this.setState({errorEmail:true,error:true,errorValue:'*Please enter Email'})
            }
            else if(!re.test(this.state.email)){
                this.setState({error:true,errorValue:'*Please enter valid Email: abc@test.com'})
            }
            else if(this.state.username.length===0)
                this.setState({errorName:true,error:true,errorValue:'*Please enter UserName'})
            else if(this.state.password.length===0){
                this.setState({errorPwd:true,error:true,errorValue:'*Please enter Password'})
            }
            else if(!this.state.strongPwd){
                this.setState({errorPwd:true,error:true,errorValue:'*Please enter Strong Password: aA1@bcde'})
            }
            else if(this.state.cpassword.length===0)
                this.setState({errorCPwd:true,error:true,errorValue:'*Please enter Confirm Password'})
            else if(this.state.cpassword!==this.state.password){
                this.setState({errorPwd:true,errorCPwd:true,error:true,errorValue:'*Passwords do not match'})
            }
            else if(this.state.mobile.length===0)
                this.setState({errorMobile:true,error:true,errorValue:'*Please enter Mobile'})        
            else if(this.state.mobile.length!==10){
                this.setState({error:true,errorValue:'*Mobile number must contains 10 digits'})
            }        
        else{
            
            axios.post('http://127.0.0.1:5000/signup',{
            
                email:this.state.email,
                username:this.state.username,
                password:this.state.password,
                cpassword:this.state.cpassword,
                mobile:this.state.mobile   
            }).then((res)=>{
                console.log(res.data);
                
                if(res.data.code===200){
                    localStorage.setItem("user", JSON.stringify(res.data.username));
                    axios.get('http://127.0.0.1:5000/user').then((res)=>{

                        if(res.data.code===200){
                            localStorage.setItem("userId", JSON.stringify(res.data.id));
                        }

                    })
                    localStorage.setItem("accesscode", 0);
                    localStorage.setItem("cartItems", 0);
                    window.location = '/';
                }
                else{
                    if(res.data.code===401){
                        this.setState({error:true,errorValue:'*User Already Exists!'})
                    }
                }
            })
        }
        //console.log('fsdf');
        
    }
    handleEmailChange = e =>{
        this.setState({
            email: e.target.value,
            error:false,
            errorEmail:false
        })
    }
    handleUsernameChange = e =>{
        this.setState({
            username: e.target.value,
            error:false,
            errorName:false
        })
    }
    handlePasswordChange = e =>{
        // eslint-disable-next-line
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(strongRegex.test(e.target.value)){
            this.setState({color:'green',strongPwd:true})
        }
        else{
            this.setState({color:'red',strongPwd:false})
        }
        this.setState({
            password: e.target.value,
            error:false,
            errorPwd:false
        })
    }
    handleCPasswordChange = e =>{
        this.setState({
            cpassword: e.target.value,
            error:false,
            errorCPwd:false
        })
    }
    handleMobileChange = e =>{
        this.setState({
            mobile: e.target.value,
            error:false,
            errorMobile:false
        })
    }
    render(){
        return(
            
            <div className="register">
                <div className="Signup_container">
                    <h1>Register</h1>
                    <form onSubmit={this.handleSignUp}>
                        <h5>E-mail</h5>
                        <input type="email" className={!this.state.errorEmail?'':'errorType'}name = "email" value = {this.state.email} onChange = {this.handleEmailChange}/>
                        <h5>Username</h5>
                        <input type="text" className={!this.state.errorName?'':'errorType'}name = "username" value = {this.state.username} onChange = {this.handleUsernameChange}/>
                        <h5>Password</h5>
                        <input type="password" className={` ${!this.state.errorPwd?'':'errorType'}`}name = "password" value = {this.state.password} onChange = {this.handlePasswordChange} style={{borderColor:this.state.color}}/>
                        {/* {this.state.strongPwd&&(
                            <span><p className="error">strong password </p></span>
                        )} */}
                        <h5>Confirm Password</h5>
                        <input type="password" className={!this.state.errorCPwd?'':'errorType'}name = "cpassword" value = {this.state.cpassword} onChange = {this.handleCPasswordChange}/>
                        <h5>Mobile Number</h5>
                        <input type="number" className={!this.state.errorMobile?'':'errorType'}name = "mobile" value = {this.state.mobile} onChange = {this.handleMobileChange}/>
                        {this.state.error&&(
                            <span><p className="error">{this.state.errorValue}</p></span>
                        )}
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