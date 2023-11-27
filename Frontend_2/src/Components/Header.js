import React from "react";
import '../Styles/header.css';
import { withRouter } from "react-router-dom";
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightblue',
        border: 'solid 1px brown',
        borderRadius: '6px'
    },
};

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            showmsg: false,
            loginModalIsOpen: false,
            loginCredentialIsOpen: false,
            userName: undefined,
            isLoggedIn: false,
            createAccIsOpen: false,
            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
            phNumber: '',
            address: ''
        }
    }
    componentDidMount() {
        // Set the initial state based on local storage
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userName = isLoggedIn ? localStorage.getItem('userName') : undefined;

        this.setState({
            isLoggedIn,
            userName,
        });
    }
    handleNavigation = () => {
        this.props.history.push('/');
    }
    handleNaviagatecart = () => {
        this.props.history.push({
            pathname:'/cart',
            state:{isLoggedIn:this.state.isLoggedIn,
                userName:this.state.userName,
            }
        })
    }
    handleNaviagatemyorder = (email) => {
        this.props.history.push({
            pathname: '/myorders',
            state: { email: email ,isLoggedIn:this.state.isLoggedIn,}
        });
    }
    
    handleButtonClick = () => {
        this.setState({ showmsg: true });
        setTimeout(() => {
      this.setState({ showmsg: false });
    }, 2000);
    };
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }
    handleLogin = () => {
        this.setState({ loginModalIsOpen: true, createAccIsOpen: false });
    }
    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
        
        // Clear authentication status and username from local storage
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userName');
        // this.handleNavigation();
    }
    responseGoogle = (response) => {
        const userName = response.profileObj.name;
        this.setState({ isLoggedIn: true, userName, loginModalIsOpen: false });

        // Store authentication status and username in local storage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', userName);
    }
    handleInputChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }
    handleCreateAcc = () => {
        this.setState({ createAccIsOpen: true });
    }
    handleLoginwithData = () => {
        const { email, password } = this.state;
        console.log(email, password);
        const loginObj = {
            user: email,
            pwd: password,
        };
        axios({
            method: 'POST',
            url: 'http://localhost:9992/userlogin',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj
        })
            .then(response => {
                this.setState({
                    isLoggedIn: response.data.isAuthenticated,
                    email: email,
                    password: password,
                    isLoggedIn: true,
                    loginCredentialIsOpen: false,
                    userName: email,
                }); alert(response.data.message);
            })
            .catch(err => console.log(err))
    }

    handleSignUp = () => {
        const { email, password, firstname, lastname, phNumber, address } = this.state;
        const signupobj = {
            user: email,
            pwd: password,
            fn: firstname,
            ln: lastname,
            ph: phNumber,
            add: address
        };
        axios({
            method: 'POST',
            url: 'http://localhost:9992/userSignUp',
            headers: { 'Content-Type': 'application/json' },
            data: signupobj
        })
            .then(response => {
                this.setState({
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    phNumber: phNumber,
                    address: address,
                }); alert(response.data.message);
            })
            .catch(err => console.log(err))
        this.setState({ createAccIsOpen: false, loginCredentialIsOpen: true })
    }
    
    render() {
        const { loginModalIsOpen, loginCredentialIsOpen, isLoggedIn, userName, createAccIsOpen,showmsg,email} = this.state;
        return (
            <div>
                <div className="container-1">

                    {
                        !isLoggedIn ? <div className="Dss">
                            <span className="button-font border pointer" onClick={this.handleCreateAcc} >Create an account</span>
                            <span className="button-font pointer" onClick={this.handleLogin}>Login </span>
                            <span><i className="fa-solid fa-cart-shopping button-font pointer" onClick={this.handleButtonClick}></i></span>
                        </div> :
                            <div className="Dss">
                                <span className="button-font border pointer" onClick={this.handleLogout} >Logout</span>
                                <span className="button-font pointer">{userName.split('@')[0]} </span>
                                <span><i className="fa-solid fa-cart-shopping button-font pointer" onClick={this.handleNaviagatecart}></i></span>
                                <span className="button-font"><i className="fa-brands fa-first-order-alt pointer" onClick={()=>this.handleNaviagatemyorder(email)}></i> My Orders</span>

                            </div>
                    }
                    {showmsg && (
                                <div className="message">
                                    <p>Please login first to view your cart!</p>
                                </div>
                            )}

                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <div className="modal-login">
                            <button className="btn btn-primary"
                                onClick={() => {
                                    this.handleModal('loginModalIsOpen', false);
                                    this.handleModal('loginCredentialIsOpen', true);
                                }}
                            >Continue with Credentials</button>
                            <br />
                            <br />
                        </div>
                        <div className="modal-login">
                            <GoogleLogin
                                clientId="828947790591-m4utv0de292g57e3tb4gtnckk1k873fg.apps.googleusercontent.com"
                                buttonText="Continue with Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>

                    </div>
                </Modal>
                <Modal
                    isOpen={loginCredentialIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('loginCredentialIsOpen', false)}></div>
                        {
                            !isLoggedIn ? <div>
                                <div className="Log_head">Login</div>
                                <label className="Log_head">E-mail</label>
                                <input type="email" placeholder="Enter your e-mail" required onChange={(event) => this.handleInputChange(event, 'email')} className="form-log-c" />
                                <div>
                                    <label className="Log_head">password</label>
                                    <input type="password" placeholder="enter your password" required onChange={(event) => this.handleInputChange(event, 'password')} className="form-log-c" />
                                </div>
                                <button className="btn btn-danger PROCEED" onClick={this.handleLoginwithData}>Login</button>
                            </div> :
                                <div className="Dss">
                                    <span className="button-font border" onClick={this.handleLogout} >Logout</span>
                                    <span className="button-font">{userName} </span>
                                </div>
                        }
                    </div>
                </Modal>
                <Modal
                    isOpen={createAccIsOpen}
                    style={customStyles}>
                    <div style={{ height: '350px' }}>
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('createAccIsOpen', false)}></div>

                        <div style={{ padding: '5px' }}  >
                            <h3 className="Acc-name">Create An Account</h3>
                            <span className="NameHa"> <label className="NameH">firstname</label>
                                <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'firstname')} /></span>
                            <span className="NameHa">  <label className="NameH">lastname</label>
                                <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'lastname')} /></span>
                            <label className="NameH">E-mail</label>
                            <input type="email" placeholder="enter your name" className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                            <label className="NameH">password</label>
                            <input type="password" placeholder="enter your password" className="form-control" required onChange={(event) => this.handleInputChange(event, 'password')} />
                            <label className="NameH">Ph.number</label>
                            <input type="tel" placeholder="enter your number" className="form-control" onChange={(event) => this.handleInputChange(event, 'phNumber')} />
                            <label className="NameH">Address</label>
                            <textarea type="text" placeholder="enter your address" className="form-control text-areaH" onChange={(event) => this.handleInputChange(event, 'address')} />
                            <button className="btn btn-danger PROCEED" style={{ float: 'right' }} onClick={this.handleSignUp}>Register </button>

                        </div>
                        <div className="Path"></div>
                        <div>
                            <span className="haveaccount">Already have an account? <span onClick={this.handleLogin} style={{ color: 'orange' }}>Login</span></span>
                        </div>
                    </div>
                </Modal>
            </div>

        )
    }

}

export default withRouter(Header);