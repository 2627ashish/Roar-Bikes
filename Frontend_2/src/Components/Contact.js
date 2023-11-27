import React from 'react';
import Modal from 'react-modal';
import querystring from 'query-string';
import axios from 'axios';
import '../Styles/contact.css';

class Contact extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
        }
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }
    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onSubmitForm() {
        console.log(this.state)
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:9992/locations',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ locations: response.data.locations })
        })
            .catch(err => console.log(err));
    }
    handleNavigate = () => {
        this.props.history.push(`/`);
    }
    handleNavigateParts=()=>{
        this.props.history.push('/quicksar');
    }
    handleReset = () => {
        document.getElementById("feedback").reset();
    }
    handlebook=()=>{
        this.props.history.push('/book');
    }
    handlefeedback = () => {
        const { firstName, email, city,message,phNumber,lastName } = this.state;
        const feedobj = {
            email: email,
            firstName: firstName,
            city: city,
            message:message,
            lastName:lastName,
            phNumber:phNumber
        };
        axios({
            method: 'POST',
            url: 'http://localhost:9992/feedBack',
            headers: { 'Content-Type': 'application/json' },
            data: feedobj
        })
            .then(response => {
                this.setState({
                    email: '',
                    firstName: '',
                    city: '',
                    message:'',
                    lastName:'',
                    phNumber:''
                }); 
                alert(response.data.message);
            })
            .catch(err => console.log(err))
            
    }
    render() {
        const { locations, items } = this.state;
        return (
            <div className="background">
                <div className="container">
                    <div className='pdt' >
                        <div className="logo disp">
                            <a onClick={this.handleNavigate}><img src="./Assets/logo-roar-bikes.png" alt="logo supposed" /></a>
                        </div>
                        <nav className='disp' style={{ float: "right" }}>
                            <div className="navbutton1">
                                <a >BookOnline</a>
                                <div className="dropdown">

                                    <div className="navbutton1" onClick={this.handlebook}>Onsite Service</div>
                                    <div className="navbutton1" onClick={this.handleNavigateParts}>Parts Delivery</div>
                                </div>

                            </div>
                            <div className="navbutton1">
                                <a href="#">About</a>
                            </div>
                            
                        </nav>
                    </div>
                    <div className="main2">
                        <h1>Contact us</h1>
                        <p>Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.</p>
                        <form id='feedback'>
                            <div className="inputwrapper">
                                <label for="firstName" className="newline">First Name</label>
                                <input type="text" name="firstName" id="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.onInputchange} />
                                {console.log(this.state.firstName)}
                            </div>
                            <div className="inputwrapper">
                                <label for="lastName" className="newline">Last Name</label>
                                <input type="text" name="lastName" id="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.onInputchange} />
                            </div>
                            <div className="inputwrapper">
                                <label for="email" className="newline" >Email</label>
                                <input type="email" name="email" id="email" placeholder="abc@sample.com" value={this.state.email} onChange={this.onInputchange}/>
                            </div>
                            <div className="inputwrapper">
                                <label for="phNumber" className="newline">Contact Number</label>
                                <input type="text" name="phNumber" id="phNumber" placeholder="+91 8246666650" value={this.state.phNumber} onChange={this.onInputchange} />
                            </div>
                            <div className="inputwrapper">
                                <textarea name="message" id="message" cols="100" rows="5" placeholder="tell us what you think" value={this.state.message} onChange={this.onInputchange}></textarea>
                            </div>
                            <div className="inputwrapper">
                                <select name="city" id="city" className="button1" value={this.state.city} onChange={this.onInputchange}>
                                    <option value={0}>select</option>
                                    {locations.map((item) => {
                                        return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                    })}
                                </select>
                            </div>
                            <input type="button" value="Reset Data" className="button1" onClick={this.handleReset}></input>
                            <input type="button" value="Submit" className="button1" onClick={this.handlefeedback}></input>
                        </form>
                    </div>
                    <div className="cards">
                        <div className="card1">
                            <a href="#">
                                <i className="fa-solid fa-tractor"></i>
                                <h2>Book Online</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam doloribus ratione iusto quas
                                    alias. </p>
                            </a>
                        </div>
                        <div className="card2">
                            <a href="#">
                                <i className="fa-solid fa-tractor"></i>
                                <h2>Service Type</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus blanditiis perspiciatis</p>
                            </a>
                        </div>
                        {/* <!-- .cards p means i want a to apply cards if it has a p tag inside it -->
                    <!-- a.buton1 means a anchor tag with a button1 className --> */}
                        <div className="card3">
                            <a href="#"><i className="fa-solid fa-tractor"></i>
                                <h2>Call for Advice</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente delectus repellendus </p>
                            </a>
                        </div>
                    </div>
                    <div className="testimonials">
                        <div className="tbox">
                            <p>I would like to personally thank you for your outstanding product. You guys rock! It's all good. I
                                can't say enough about Roar Cycles.</p>
                            <p>- Tammara I.</p>
                        </div>

                        <div className="tbox">
                            <p>Roar Cycles is the most valuable business resource we have EVER purchased. I will let my mum know
                                about this, she could really make use of Roar Cycles! Roar Cycles has completely surpassed our
                                expectations.</p>
                            <p>- Floris V.</p>
                        </div>

                        <div className="tbox">
                            <p>I'm good to go. Roar Cycles is both attractive and highly adaptable. I will refer everyone I know.
                            </p>
                            <p>- Carlin B.</p>
                        </div>

                        <div className="tbox">
                            <p>Roar Cycles impressed me on multiple levels. I would gladly pay over 600 dollars for Roar Cycles. We
                                can't understand how we've been living without Roar Cycles.</p>
                            <p>- Eve V.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Contact;