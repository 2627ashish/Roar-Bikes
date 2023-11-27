import React from "react";
import '../Styles/item.css';
import { withRouter } from "react-router-dom";
class Itemscomponent extends React.Component {
    // handlenavigate = (bikeId) => {
    //     this.props.history.push(`/details?bike=${bikeId}`);
    // }
    handlenavigate = (bikeId,categoryId) => {
        this.props.history.push({
            pathname: '/details', // Adjust the pathname accordingly
            state: { bikeId: bikeId,
                     categoryId:categoryId
             }
        });
    }
    render() {
        const {qsData} = this.props;
        return (
                <div className="col-lg-4 col-md-12 col-sm-12">
                    {/* onClick={()=>this.handlenavigate(qsData.meal_type)} */}
                    <div className="item-card" >
                        <div className="row">
                            <img src={`${qsData.image}`} className="img"/>
                            <div onClick={()=>this.handlenavigate(qsData._id,qsData.category_id)} className="pointer1">
                                <div className="item-head">
                                    {qsData.name}
                                </div>
                                <div>
                                    <span className="currency">&#8377;</span>
                                    <span className="price">{qsData.price}</span>
                                </div>
                                <div className="item-sub-head">
                                <i className="fa-solid fa-star"></i>
                                {qsData.aggregate_rating}/5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default withRouter(Itemscomponent);