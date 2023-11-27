import React from "react";
import '../Styles/parts.css';
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
class Parts extends React.Component {

    constructor() {
        super();
        this.state = {
            saveModalIsOpen: false,
            show: false,
            firstName: '',
            lastName: '',
            email: '',
            phNumber: '',
            address: ''
        }
    }
    handlebooking = () => {
        this.setState({ saveModalIsOpen: true });
    }
    handleDetail = () => {
        this.setState({ show: true });
    }
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }
    handleInputChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }
    handleOrder = () => {
        const { firstName, email, address, lastName, phNumber } = this.state;
        const Orders = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phNumber: phNumber,
            address: address
        };
        axios({
            method: 'POST',
            url: 'http://localhost:9992/saveOrder',
            headers: { 'Content-Type': 'application/json' },
            data: Orders
        })
            .then(response => {
                this.setState({
                    email: email,
                    firstName: firstName,
                    address: address,
                    lastName: lastName,
                    phNumber: phNumber
                }); alert(response.data.message);
            })
            .catch(err => console.log(err))
        this.handleModal('saveModalIsOpen', false);
    }
    render() {

        const { qsData } = this.props;
        const { show } = this.state;
        const { saveModalIsOpen } = this.state;
        return (
            // <div className='background'>
            //     <div className='top'>
            <div>
                <div>
                    <div className="item">
                        <div className="row">
                            <div className="col-8">
                                <img src={`${qsData.image}`} alt="" className='object-fit-contain prtimg' />
                            </div>
                            <div className="col-4">
                                <div className="item-heading">
                                    {qsData.name}
                                </div>
                                <div className="item-sub-heading">
                                    {qsData.content}
                                </div>
                                <div className="alg">
                                <button className="btn btn-primary" onClick={this.handleDetail}>
                                    Know the Brand
                                </button>
                                {/* <button className="btn btn-primary" onClick={this.handlebooking}>
                                    Book Now!
                                </button> */}
                            </div>
                            </div>
                            
                        </div>
                    </div>

                    <Modal isOpen={show}>
                        <div className="mod">
                            <h1>{qsData.name}</h1>
                            <div className="row">
                                <div className="col-6">
                                    <img src={`${qsData.image}`} alt="" className='object-fit-contain prtimg' />
                                    <p>{qsData.content}</p>
                                </div>

                                <div className="col-6">
                                    <div>
                                    <div dangerouslySetInnerHTML={{ __html: qsData.age }} />
                                    </div>
                                    <div>
                                        <p>Embark on a journey of health, adventure, and freedom – experience the joy of cycling, your gateway to an active lifestyle and endless exploration.</p>
                                        Bikes Starting at &#8377; {qsData.min_price}
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={() => this.handleModal('show', false)}>
                                CLOSE
                            </button>
                        </div>
                    </Modal>


                    <Modal
                        isOpen={saveModalIsOpen}

                    >
                        <div className='mod'>
                            <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('saveModalIsOpen', false)}></div>
                            <div className='bhed'>Book</div>
                            <div><label className='Log_head'>First Name</label>
                                <input type="text" placeholder="Enter your Name" required onChange={(event) => this.handleInputChange(event, 'firstName')} className="form-log-c" /></div>
                            <div><label className='Log_head'>Last Name</label>
                                <input type="text" placeholder="Enter your Name" required onChange={(event) => this.handleInputChange(event, 'lastName')} className="form-log-c" /></div>
                            <div><label className='Log_head'>email</label>
                                <input type="email" placeholder="Enter your email" required onChange={(event) => this.handleInputChange(event, 'email')} className="form-log-c" /></div>
                            <div><label className='Log_head'>Phone No.</label>
                                <input type="text" placeholder="Enter your phone no" required onChange={(event) => this.handleInputChange(event, 'phNumber')} className="form-log-c" /></div>
                            <div><label className='Log_head'>Address</label>
                                <input type="text" placeholder="Enter your Address" required onChange={(event) => this.handleInputChange(event, 'address')} className="form-log-c" /></div>
                            <div> <button className="btn btn-primary" style={{ float: 'right' }} onClick={this.handleOrder}>Place Order </button></div>
                        </div>
                    </Modal>
                </div>
            </div>
            //     </div>
            // </div>
        )
    }
}
export default withRouter(Parts);