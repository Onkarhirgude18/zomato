import { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import "../Styles/header.css"

import { GoogleLogin } from 'react-google-login';

const customStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightgrey',
        border: 'solid 2px tomato'
    }
};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            FN: '',
            LN: '',
            Email: '',
            Password: '',
            isSignUpFormOpen: false,
            isSignInFormOpen: false,
            userDetails: undefined
        }
    }

    loginOpenHandler = () => {
        this.setState({
            isSignInFormOpen: true
        })
    }

    signUpOpenHandler = () => {
        this.setState({
            isSignUpFormOpen: true
        })
    }

    signUpHandler = () => {
        const { FN, LN, Email, Password } = this.state;

        // make an API call here to save the data in mongoDB
        const req = {
            firstName: FN,
            lastName: LN,
            email: Email,
            password: Password
        }

        axios({
            method: 'POST',
            url: 'https://obscure-retreat-97028.herokuapp.com/api/userSignUp',
            headers: { 'Content-Type' : 'application/json' },
            data: req,
        }).then(result => {
            alert('User Signed up Successfully !!');
            this.signUpCancelHandler();
        }).catch(error => {
            alert('Error signing up');
        })
    }

    signUpCancelHandler = () => {
        this.setState({
            FN: '',
            LN: '',
            Email: '',
            Password: '',
            isSignUpFormOpen: false
        });
    }

    signInHandler = () => {
        const { Email, Password } = this.state;

        // make an API call here to save the data in mongoDB
        const req = {
            email: Email,
            password: Password
        }

        axios({
            method: 'POST',
            url: 'https://obscure-retreat-97028.herokuapp.com/api/userLogin',
            headers: { 'Content-Type' : 'application/json' },
            data: req,
        }).then(result => {
            this.setState({
                userDetails: result.data.user
            })
            this.signInCancelHandler();
        }).catch(error => {
            alert('Error signing In');
        })
    }

    signInCancelHandler = () => {
        this.setState({
            Email: '',
            Password: '',
            isSignInFormOpen: false
        });
    }

    handleChange = (event, stateVariable) => {
        this.setState({
          [stateVariable]: event.target.value
        });
    }

    logoutHandler = () => {
        this.setState({
            userDetails: undefined
        });
    }

    handleClick = (socialMedia) => {
        switch(socialMedia) {
            case 'facebook':
                this.handleFaceBookLogin();
                break;
            case 'google':
                this.handleGoogleLogin();
                break;
            default:
        }
    }

    handleFaceBookLogin() {
        debugger
        // 1. the auth (user authentication) information from your server
        // 2. pass the auth information to the facebook server to log you in
        // 3. facebook takes care of your login

        // interface with facebook login library
    }

    handleGoogleLogin() {
        debugger
        // interface with goole login library

        /*
        1. create a goole developer account (careful)
        2. generate an Oauth ID: https://developers.google.com/identity/sign-in/web/sign-in
        3. integrate with 'react-google-login'
        4. You will need the ID generated in step 2
        5. Do the event handling
        */
    }

    responseGoogleSuccess() {
        alert('Success fully logged in to google')
    }

    responseGoogleFailure() {
        alert('Error while logging in to google')
    }

    render() {
        const { FN, LN, Email, Password, isSignUpFormOpen, isSignInFormOpen, userDetails } = this.state;
        return(
            <>
                <div className="App-header">
                    <span>Zomato App</span>
                    <div className="action-buttons">
                        {
                            userDetails 
                            ?
                            <>
                                <span>{userDetails[0].firstName}</span>
                                <button className="navigationLink" onClick={this.logoutHandler}>Logout</button>
                            </>
                            :
                            <>
                                <button className="navigationLink" onClick={this.loginOpenHandler}>Login</button>
                                <button className="navigationLink" onClick={this.signUpOpenHandler}>Signup</button>
                            </>
                        }
                        
                    </div>
                </div>
                <Modal isOpen={isSignUpFormOpen} style={customStyle} ariaHideApp={false}>
                <form>
                        <h1>SignUp Form</h1>
                       
                        <input placeholder="First Name" type="text" value={FN} onChange={(event) => this.handleChange(event, 'FN')}></input>
                        <br/>
                       
                        <input placeholder="Last Name" type="text" value={LN} onChange={(event) => this.handleChange(event, 'LN')}></input>
                        <br/>
                       
                        <input placeholder="Email" type="email" value={Email} onChange={(event) => this.handleChange(event, 'Email')}></input>
                        <br/>
                       
                        <input placeholder="Password" type="password" value={Password} onChange={(event) => this.handleChange(event, 'Password')}></input>
                        <br/>
                        <button onClick={this.signUpHandler}>Sign Up</button>
                        <button onClick={this.signUpCancelHandler}>Cancel</button>
                        <GoogleLogin
                            clientId="425040852305-ouakvg2ce2i8e99c77dcpg9692s2ttbj.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogleSuccess}
                            onFailure={this.responseGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </form>
                </Modal>
                <Modal isOpen={isSignInFormOpen} style={customStyle} ariaHideApp={false}>
                    <form>
                        <h1>SignIn Form</h1>
                        
                        <input placeholder="Email" type="email" value={Email} onChange={(event) => this.handleChange(event, 'Email')}></input>
                        <br/>
                        
                        <input  placeholder="Password" type="password" value={Password} onChange={(event) => this.handleChange(event, 'Password')}></input>
                        <br/>
                        <button onClick={this.signInHandler}>Sign In</button>
                        <button onClick={this.signInCancelHandler}>Cancel</button>

                      
                      <GoogleLogin
                            clientId="425040852305-ouakvg2ce2i8e99c77dcpg9692s2ttbj.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogleSuccess}
                            onFailure={this.responseGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </form>
                </Modal>
            </>
        )
    }
}

export default Header;
