import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../Styles/myorder.css';

class Myorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.location.state.email,
            isLoggedIn: props.location.state.isLoggedIn,
            orders: [],
        };
    }

    componentDidMount() {
        const { email, isLoggedIn } = this.state;
        if (!isLoggedIn) {
            // Redirect to home page if not logged in
            this.props.history.push('/');
            return;
        }

        axios.get(`http://localhost:9992/getOrders/${email}`)
            .then(response => {
                this.setState({ orders: response.data.Orders });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }

    handleNavigatehome = () => {
        this.props.history.push('/');
    }

    render() {
        const { orders, isLoggedIn } = this.state;

        if (!isLoggedIn) {
            // No need to call handleNavigatehome() here
            return null; // or you can render a loading indicator, or a message
        }

        return (
            <div>
                <div className="logo">
                    <a onClick={this.handleNavigatehome}><img src="./Assets/logo-roar-bikes.png" alt="logo supposed" /></a>
                </div>
                <div className="order-container">
                    <h2 className="order-heading">My Orders</h2>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        <ul className="order-list">
                            {orders.map(order => (
                                <li key={order._id} className="order-item">
                                    <div className="order-section">
                                        <h3>Order ID: {order._id}</h3>
                                        <div className="container">
                                            <h1>Items Purchased</h1>
                                            <div>
                                                <div className="cart-list row">
                                                    <div className='col'>Item Image</div>
                                                    <div className='col'>Item</div>
                                                    <div className='col'>Quantity</div>
                                                    <div className='col'>Price/Pc</div>
                                                    <div className='col'>Total Sum</div>
                                                </div>
                                            </div>

                                            {order.cart.map(cartItem => (
                                                <div className='row cart-list'>
                                                    <div className='col'>
                                                        <img src={`./${cartItem.image}`} className="img" alt='image supposed to be here' />
                                                    </div>
                                                    <div className='col'>{cartItem.name}</div>
                                                    <div className='col'>{cartItem.quantity}</div>
                                                    <div className='col'>{cartItem.price}</div>
                                                    <div className='col'>{cartItem.price * cartItem.quantity}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Myorder);
