import React from 'react';
import '../Styles/parts.css';
import Parts from './Parts';
import axios from 'axios';
import Modal from 'react-modal';
import { withRouter } from "react-router-dom";

class Quicksearch extends React.Component {
    constructor() {
        super();
        this.state = {
            parttypes: [],
            saveModalIsOpen: false,
            show: false
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:9992/parttypes',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ parttypes: response.data.pats })
            // ye jo Meals hai ye mera controllers me jo meal hai woh same hi hona chaiye
        })
            .catch(err => console.log(err));
    }
    handleNavigate = () => {
        this.props.history.push('/');
    }
    
    render() {
        const { parttypes ,saveModalIsOpen} = this.state;
        return (
            <div>
                <div className='background'>
                    <div className='logoalign' onClick={this.handleNavigate}> <img src="./Assets/logo-roar-bikes.png" /></div>
                    <div className="container-fluid">
                        <div className="item-heading">Quick Searches</div>
                        <div className="item-sub-heading">Get your Brand new Part with Full Saftey</div>
                        <div className="container-fluid">
                            <div className="row">
                                {parttypes.map((item) => {
                                    return <Parts qsData={item} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default withRouter(Quicksearch);