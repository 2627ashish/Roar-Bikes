import {BrowserRouter,Route} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Contact from './Contact';
import Book from './Book';
import About from './About';
import Footer from './Footer';
import Quicksearch from './Quicksearch';
import Items from './Items';
import Details from './Details';
import Cart from './Cart';
import Checkout from './Checkout';
import Myorder from './Myorder';
function Router() {
        return (
            <BrowserRouter>
            <Header/>
            <Route exact path="/" component={Home}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/book" component={Book}/>
            <Route path="/quicksar" component={Quicksearch}/>
            <Route path="/about" component={About}/>
            <Route path="/items" component={Items}/>
            <Route path="/details" component={Details}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/myorders" component={Myorder}/>
            <Footer/>
            </BrowserRouter>
        )
    
}

export default Router;