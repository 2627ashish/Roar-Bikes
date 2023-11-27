import React from 'react';
import '../Styles/book.css';
import { withRouter } from "react-router-dom";
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightbrown',
        color: 'grey',
        border: 'solid 1px brown',
        borderRadius: '6px'
    },
};
class Book extends React.Component {
    constructor() {
        super();
        this.state = {
            bookModelIsOpen: false,
            visitModalIsOpen: false,
            firstName: '',
            lastName: '',
            email: '',
            phNumber: '',
            city: ''
        }
    }
    handleNavigatehome = () => {
        this.props.history.push(`/`);
    }
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }
    handlebooking = () => {
        this.setState({ bookModelIsOpen: true });
    }
    handleInputChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }
    handlebookUp = () => {
        const { firstName, email, city, lastName, phNumber } = this.state;
        const Bookobj = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phNumber: phNumber,
            city: city
        };
        axios({
            method: 'POST',
            url: 'http://localhost:9992/feedBack',
            headers: { 'Content-Type': 'application/json' },
            data: Bookobj
        })
            .then(response => {
                this.setState({
                    email: email,
                    firstName: firstName,
                    city: city,
                    lastName: lastName,
                    phNumber: phNumber
                }); alert(response.data.message);
            })
            .catch(err => console.log(err))
        this.setState({ bookModelIsOpen: false, visitModalIsOpen: true })
    }
    render() {
        const { bookModelIsOpen, visitModalIsOpen } = this.state;
        return (
            <div className="marg">
                <div className='background'>
                    <div className='container'>
                        <div className="logo">
                            <a onClick={this.handleNavigatehome}><img src="./Assets/logo-roar-bikes.png" alt="logo supposed" /></a>
                        </div>
                        <div className="margin1">
                            <div>Welcome to Rorar Bicycles </div>
                        </div>
                        <div>
                            <div className='col-lg-9 col-sm-12 texxt ddpp'>
                                Onsite Service
                            </div>
                            <p>At Roar Bikes, we understand the importance of keeping your bicycle in peak condition. Our Onsite Service is designed to provide you with convenient and professional maintenance right at your doorstep.</p>
                            <div>Why Choose Onsite Service?</div>
                            <ul>
                                <li>Convenience at Your Doorstep: Enjoy the luxury of having our skilled technicians come directly to your home or office. No more hassle of transporting your bicycle to a service center.</li>
                                <li>Expert Bicycle Care: Our team of experienced technicians is equipped with the knowledge and tools to handle a wide range of bicycle maintenance and repair tasks. From routine tune-ups to complex repairs, we've got you covered.</li>
                                <li>Time-Saving:Time is valuable, and we respect yours. Our Onsite Service ensures that your bicycle receives the attention it needs without disrupting your schedule. Focus on what matters while we take care of your bike.</li>
                                <li>Personalized Service: Every bicycle is unique, and so are its maintenance requirements. Our technicians provide personalized service, addressing the specific needs of your bike for optimal performance.</li>
                            </ul>
                           <div> How It Works</div>
                           <ul>
                            <li>Schedule an Appointment: Use our easy online booking system to schedule an appointment at a time that suits you.</li>
                            <li>Technician Visit: On the scheduled day, our technician will arrive at your location with the necessary tools and equipment.</li>
                            <li>Diagnosis and Service: Our technician will conduct a thorough assessment of your bicycle and proceed with the required maintenance or repairs.</li>
                            <li>Quality Check: Before leaving, we ensure that your bicycle meets our high-quality standards. You can test ride with confidence.</li>
                           </ul>
                            <div>Book Your Onsite Service Today</div>
                            <div>Give your bicycle the care it deserves. Schedule an Onsite Service appointment now and experience the convenience of premium maintenance without leaving your home.</div>
                        </div>
                        <div className='bt'>
                            <button className="btn btn-outline-light" onClick={this.handlebooking}>Book Now !</button>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={bookModelIsOpen}
                    style={customStyles}
                >
                    <div className='mod1'>
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('bookModelIsOpen', false)}></div>
                        <div>Book</div>
                        <div><label className='Log_head'>First Name</label>
                            <input type="text" placeholder="Enter your Name" required onChange={(event) => this.handleInputChange(event, 'firstName')} className="form-log-c" /></div>
                        <div><label className='Log_head'>Last Name</label>
                            <input type="text" placeholder="Enter your Name" required onChange={(event) => this.handleInputChange(event, 'lastName')} className="form-log-c" /></div>
                        <div><label className='Log_head'>email</label>
                            <input type="email" placeholder="Enter your email" required onChange={(event) => this.handleInputChange(event, 'email')} className="form-log-c" /></div>
                        <div><label className='Log_head'>Phone No.</label>
                            <input type="text" placeholder="Enter your phone no" required onChange={(event) => this.handleInputChange(event, 'phNumber')} className="form-log-c" /></div>
                        <div><label className='Log_head'>Address</label>
                            <input type="text" placeholder="Enter your Address" required onChange={(event) => this.handleInputChange(event, 'city')} className="form-log-c" /></div>
                        <div> <button className="btn btn-danger PROCEED" style={{ float: 'right' }} onClick={this.handlebookUp}>Confirm Booking ! </button></div>
                    </div>
                </Modal>
                <Modal
                    isOpen={visitModalIsOpen}
                    style={customStyles}
                >
                    <div className='back_img'>
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('visitModalIsOpen', false)}></div>
                        <div className='textmod2'>
                            Thank You for shopping with us!
                        </div>
                        <div className='textmod2'>our Executive will contact in 24 hrs</div>
                        <div className='textmod2'>For more help dial : 1800 180 1555</div>
                    </div>
                </Modal>
            </div>

        )
    }
}
export default withRouter(Book);
// onClick={()=>this.handleModal('bookModalIsOpen', true)}