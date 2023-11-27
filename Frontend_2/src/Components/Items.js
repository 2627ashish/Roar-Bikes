import React from "react";
import '../Styles/item.css';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Itemscomponent from "./Itemscomponent";
class Items extends React.Component {
    constructor() {
        super();
        this.state = {
            category: undefined,
            isSidebarOpen: false,
            items: [],
            stock: undefined,
            lcost: undefined,
            hcost: undefined,
            sort: 1
        }
    }
    toggleSidebar = () => {
        this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
    };
    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:9992/items',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ items: response.data.Items })
        })
            .catch(err => console.log(err));
    }
    handleNavigatehome = () => {
        this.props.history.push(`/`);
    }
    handleSortChange = (sort) => {
        const { category, lcost, hcost, stock } = this.state;
        const filterobj = {
            category,
            sort,
            lcost,
            hcost,
            stock
        }
        axios({
            method: 'POST',
            url: 'http://localhost:9992/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterobj
        }).then(response => {
            this.setState({ items: response.data.bikes, sort })
        })
            .catch(err => console.log(err));
    }
    handleCategory = (categoryId) => {
        const { category, lcost, hcost, sort, stock } = this.state;
        const updatedCategory = category === categoryId ? '' : categoryId;
        const filterObj = {
            category: updatedCategory,
            sort,
            lcost,
            hcost,
            stock
        }

        axios({
            method: 'POST',
            url: 'http://localhost:9992/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ items: response.data.bikes, category })
            })
            .catch(err => console.log(err));
    }
    handleStockChange = (stock) => {
        const { category, lcost, hcost, sort } = this.state;
        const filterobj = {
            category,
            sort,
            lcost,
            hcost,
            stock
        }
        axios({
            method: 'POST',
            url: 'http://localhost:9992/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterobj
        }).then(response => {
            this.setState({ items: response.data.bikes, stock })
        })
            .catch(err => console.log(err));
    }
    render() {
        const { items } = this.state;
        return (
            <div>
                <div className="logo">
                            <a onClick={this.handleNavigatehome}><img src="./Assets/logo-roar-bikes.png" alt="logo supposed" /></a>
                        </div>
                <div className={`sidebar ${this.state.isSidebarOpen ? 'open' : ''}`}>
                    <h1>Filter by price</h1>
                    <div className="Fil-subhead">Sort</div>
                    <div>
                        <input type="radio" name="range" onChange={() => this.handleSortChange(1)} />
                        <span className="checkbox-items">Price low to high</span>
                    </div>
                    <div>
                        <input type="radio" name="range" onChange={() => this.handleSortChange(-1)} />
                        <span className="checkbox-items">Price high to low</span>
                    </div>
                    <div>
                        <div className="Fil-subhead">Category</div>
                        <div>
                            <input type="radio" name="categ" onChange={() => this.handleCategory(1)} />
                            <span className="checkbox-items">Hybrid</span>
                        </div>
                        <div>
                            <input type="radio" name="categ" onChange={() => this.handleCategory(2)} />
                            <span className="checkbox-items">Mountain</span>
                        </div>
                        <div>
                            <input type="radio" name="categ" onChange={() => this.handleCategory(3)} />
                            <span className="checkbox-items">Flat Tyre</span>
                        </div>
                        <div>
                            <input type="radio" name="categ" onChange={() => this.handleCategory(4)} />
                            <span className="checkbox-items">City</span>
                        </div>
                        <div>
                            <input type="radio" name="categ" onChange={() => this.handleCategory(5)} />
                            <span className="checkbox-items">Folding</span>
                        </div>
                        <div>
                            <input type="radio" name="categ" onChange={() => this.handleCategory(6)} />
                            <span className="checkbox-items">Road</span>
                        </div>
                        <div>
                            <input type="radio" name="categ" onChange={() => this.handleCategory(7)} />
                            <span className="checkbox-items">BMX</span>
                        </div>
                    </div>
                    <div>
                        <div className="Fil-subhead">Stock</div>
                        <div>
                            <input type="radio" name="stocks" onChange={() => this.handleStockChange('yes')} />
                            <span className="checkbox-items">In Stock</span>
                        </div>
                        <div>
                            <input type="radio" name="stocks" onChange={() => this.handleStockChange('no')} />
                            <span className="checkbox-items">Out of Stock</span>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="bikehead">Bikes</div>
                    <div className="itemcardHead">
                        <a className="button1" onClick={this.toggleSidebar}> <i className="fa-solid fa-bars"></i> FILTER BIKES</a>
                        <i>Showing all {items.length} results</i>
                        {/* <i class="fa-solid fa-border-all"></i> */}
                    </div>

                    <div className="row">
                        {items.length > 0 ? items.map((item) => {
                            return <Itemscomponent qsData={item} />
                        }) : <div className="no-records">
                            No Records Found...
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Items);