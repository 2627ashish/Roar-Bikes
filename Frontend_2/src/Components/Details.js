import React, { Component } from 'react';
import Modal from 'react-modal';
import querystring from 'query-string';
import axios from 'axios';
import '../Styles/details.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bike: {},
            bikeId: props.location.state.bikeId,
            categoryId: props.location.state.categoryId,
            Category: [],
            quantity: 1,
            subtotal: 0,
            cart: [],
            itemadded: false,
        };
    }

    componentDidMount() {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.setState({ cart: storedCart });
        const { bikeId, categoryId } = this.state;
        axios({
            method: 'GET',
            url: `http://localhost:9992/bikes/${bikeId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ bike: response.data.bikes })
        })
            .catch(err => console.log(err));
        axios({
            method: 'GET',
            url: `http://localhost:9992/category/${categoryId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ Category: response.data.Category })
        })
            .catch(err => console.log(err));
        window.addEventListener('beforeunload', this.handleBeforeUnload);

    }

    componentDidUpdate() {
        // Update cart data in localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }
    componentWillUnmount() {
        // Remove event listener when component is about to unmount
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    // Function to handle beforeunload event
    handleBeforeUnload = () => {
        // Clear the cart when the user leaves the page
        this.setState({
            cart: [],
            itemadded: false,
        });
    };
    increaseQuantity = () => {
        if (this.state.quantity < 9) {
            this.setState({ quantity: this.state.quantity + 1 });
        } else {
            alert("Cannot order more than 9 Bikes");
        }
    }

    decreaseQuantity = () => {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        } else {
            alert("Cannot order less than 1 Bike");
        }
    }

    addItems = (bikeId) => {
        const { quantity, cart, bike } = this.state;
        const existingCartItemIndex = cart.findIndex((item) => item.id === bikeId);

        if (existingCartItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingCartItemIndex].quantity += quantity;
            this.setState({
                cart: updatedCart,
                itemadded: true,
            });
        } else {
            const updatedCart = [
                ...cart,
                {
                    id: bikeId,
                    // Assuming you have a way to get the bike details based on the bikeId
                    name: bike.name, // Replace with actual bike name
                    quantity,
                    price: bike.price,
                    image:bike.image, // Replace with actual bike price
                },
            ];
            this.setState({
                cart: updatedCart,
                itemadded: true,
            });
        }
    };


    handleNavigatehome = () => {
        this.props.history.push(`/`);
    }
    handleNavigatecart = (cart) => {
        this.props.history.push({
            pathname: '/cart', // Adjust the pathname accordingly
            state: { Cart: cart
             }
        });
    }
    render() {
        const { bike, Category, quantity, cart,itemadded} = this.state;
        return (
            <div>
                <div className="logo">
                    <a onClick={()=>this.handleNavigatehome()}><img src="./Assets/logo-roar-bikes.png" alt="logo supposed" /></a>
                </div>
                <div className='container'>
                    <div>
                        {itemadded && (
                            <div className="cart-notification">
                                <i class="fa-solid fa-circle-check m-3" style={{color: '#144413;'}}>   </i>
                                "{bike.name}" has been added to your cart.
                                <button className='viewcart' onClick={()=>this.handleNavigatecart(cart)}>VIEW CART</button>
                                {console.log(cart)}
                            </div>
                        )}
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12 col-sm-12'>
                            <img src={`./${bike.image}`} className="img" alt='image supposed to be here' />
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12'>
                            <div>Bike</div>
                            {Category.name}
                            <div className='det-name'>
                                {bike.name}
                            </div>
                            <div className='det-price'>
                                &#8377;{bike.price}<span> & Free Shipping</span>
                            </div>
                            <div className='features'>
                                {bike.features && bike.features.map((feature, index) => (
                                    <div key={index}><i className="fas fa-check-circle"></i>{feature}</div>
                                ))}
                            </div>
                            <div className='add-items'>
                                <button onClick={this.decreaseQuantity} className='btt'>-</button>
                                <span className="qty">{quantity}</span>
                                <button onClick={this.increaseQuantity} className='btt'>+</button>
                                <button onClick={() => this.state.bike._id && this.addItems(this.state.bike._id)} className='btt'>ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {bike.description}
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;
