import React from "react";
import '../Styles/about.css';
import { withRouter } from "react-router-dom";
import Modal from 'react-modal';
import axios from 'axios';

class About extends React.Component {
    constructor() {
        super();
        this.state = {
            content: [],
            image: ''
        }
    }
    componentDidMount() {
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:9992/about',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ content: response.data.about })
        })
            .catch(err => console.log(err));
    }
    handleNavigatehome = () => {
        this.props.history.push(`/`);
    }
    render() {
        const { content, image } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="logo ">
                            <a onClick={this.handleNavigatehome}><img src="./Assets/logo-roar-bikes.png" alt="logo supposed" /></a>
                        </div>
                    <img src='./Assets/bikeims.jpg' className="bikeimg" alt="" height="350" width="100%" />
                    <div className="container_about">
                        <h2>Our Story</h2>
                        <p>We are passionate about cycling and committed to providing high-quality bicycle parts and accessories to cyclists of all levels. Our journey began with a love for the open road and the desire to make every ride unforgettable. We believe that having the right parts and equipment can transform your cycling experience.</p>

                        <h2>Our Mission</h2>
                        <p>Our mission is to empower cyclists to explore the world on two wheels. We source and offer a wide range of top-notch parts, from frames to pedals, to enhance your ride. We are dedicated to delivering the best products, exceptional customer service, and sharing our love for cycling with the community.</p>

                        <h2>Contact Us</h2>
                        <p>If you have any questions, feedback, or need assistance with your order, please feel free to contact us:</p>
                        <p>Email: <a href="mailto:info@bicyclepartsstore.com">info@bicyclepartsstore.com</a></p>
                        <p>Phone: (+91) 011 2553 2553</p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(About);