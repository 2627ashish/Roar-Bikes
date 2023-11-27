import React, { Component } from 'react';
import Modal from 'react-modal';
import querystring from 'query-string';
import axios from 'axios';
import '../Styles/cart.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Cart: this.loadCartFromLocalStorage() || [],
            isLoggedIn:props.location.state.isLoggedIn,
            usernmae:props.location.state.userName,
            quantity: 1,
            subtotal: 0,
            itemadded: false,
            emptycart: false,
        }
    }
    componentDidMount() {
        // Calculate subtotal when the component mounts
        this.updateSubtotal();
    }

    updateSubtotal = () => {
        const { Cart } = this.state;
        const subtotal = Cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        this.setState({ subtotal });
    };
    checkout =(cart)=>{
        if(this.state.subtotal===0){
            this.setState(({ emptycart: true }));
        }
        else{
        this.props.history.push({
            pathname: '/checkout',
            state: { Cart: cart,
                isLoggedIn:this.state.isLoggedIn,
                username:this.state.usernmae,
             }
        });
        }
    }

    loadCartFromLocalStorage = () => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : null;
    };
    saveCartToLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    increaseQuantity = (index) => {
        const updatedCart = [...this.state.Cart];
        updatedCart[index].quantity += 1;
        this.setState({ Cart: updatedCart }, () => {
            this.updateSubtotal();
        });
    };
    decreaseQuantity = (index) => {
        const updatedCart = [...this.state.Cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            this.setState({ Cart: updatedCart }, () => {
                this.updateSubtotal();
            });
        } else {
            alert("Cannot order less than 1 Bike");
        }
    };
    removeitem = (index) => {
        const { Cart } = this.state;
        if (index >= 0 && index < Cart.length) {
            const updatedCart = [...Cart.slice(0, index), ...Cart.slice(index + 1)];
            this.setState({ Cart: updatedCart }, () => {
                this.updateSubtotal();
                this.saveCartToLocalStorage(updatedCart);
                if (updatedCart.length === 0) {
                    this.setState({ emptycart: true });
                }
            });
        } else {
            alert("Cannot Remove item");
        }
    }

    handleNavigatehome = () => {
        this.props.history.push(`/`);
    }

    render() {
        const { Cart, subtotal,emptycart} = this.state;
        return (
            <div>
                <div className="logo">
                    <a onClick={() => this.handleNavigatehome()}><img src="./Assets/logo-roar-bikes.png" alt="logo supposed" /></a>
                </div>
                <div className='container'>
                    <h1 id='carthead'>Cart</h1>
                    <div className='row'>
                        <div className='col-9'>
                            <div className='tabledeg'>
                                <div className='item-box-head row'>
                                    <div className='col-5'>Prouct</div>
                                    <div className='col'>Price</div>
                                    <div className='col'>Qunatity</div>
                                    <div className='col'>Subtotal</div>
                                </div>
                                {emptycart&& (
                                    <div className="cart-notification">
                                        Your cart is Currently empty.
                                    </div>
                                )}
                                {Cart.map((item, index) => (
                                    <div className='row align-txt'>
                                        <div className='col-5'>
                                            <div><img src={`./${item.image}`} className="img-cart" alt='image supposed to be here' /></div>
                                            <span className='smallSpan'>{item.name}</span>
                                        </div>
                                        <div className='col'><i class="fa-solid fa-indian-rupee-sign"></i> {item.price}</div>
                                        <div className='col'>
                                            <button onClick={() => this.decreaseQuantity(index)}><i class="fa-solid fa-minus"></i></button>
                                            <span className="qty">{item.quantity}</span>
                                            <button onClick={() => this.increaseQuantity(index)}><i class="fa-solid fa-plus"></i></button>
                                        </div>
                                        <div className='col'>
                                            <i class="fa-solid fa-indian-rupee-sign"></i> {item.price * item.quantity}
                                            <i class="fa-regular fa-circle-xmark" onClick={() => this.removeitem(index)}></i>
                                        </div>
                                    </div>
                                ))}
                                {console.log(Cart)}
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className='tabledeg align-txt'>
                                <div className='item-box-head'>
                                    Cart totals
                                </div>
                                <div>
                                    <span>Subtotal</span>
                                    <span><i class="fa-solid fa-indian-rupee-sign"></i>{subtotal}</span>
                                </div>
                                <div>
                                    <span>Total</span>
                                    <span><i class="fa-solid fa-indian-rupee-sign"></i>{subtotal}</span>
                                </div>
                                <div>
                                    <button onClick={()=>this.checkout(Cart)}>Proceed To Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Details;