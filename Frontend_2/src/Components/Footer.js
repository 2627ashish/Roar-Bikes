import React from "react";
import '../Styles/footer.css';
import { withRouter } from "react-router-dom";

class Footer extends React.Component {
    handleNavigation = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="fft">
                <footer className="marketing-site-footer">
                    <div className="row medium-unstack">
                        <div className="medium-4 col">
                            <h4 className="marketing-site-footer-name">Roar Cycles</h4>
                            <p>Roar Bikes, a trailblazer in the cycling industry, combines cutting-edge technology with a passion for adventure. From mountain terrains to urban streets, Roar's bicycles cater to riders seeking innovation, durability, and an unparalleled riding experience.</p>
                            <div className="menu marketing-site-footer-menu-social simple">
                                <span><a href="#"><i class="fa fa-youtube-square" aria-hidden="true"></i></a></span>
                                <span><a href="#"><i class="fa fa-facebook-square" aria-hidden="true"></i></a></span>
                                <span><a href="#"><i class="fa fa-twitter-square" aria-hidden="true"></i></a></span>
                            </div>
                        </div>
                        <div className="medium-4 col">
                            <h4 className="marketing-site-footer-title">Contact Info</h4>
                            <div className="marketing-site-footer-block">
                                <i className="fa fa-map-marker hell" aria-hidden="true"></i>
                                <p>100 W Raor Bikes<br></br>DELHI, CA 94015</p>
                            </div>
                            <div className="marketing-site-footer-block">
                                <i className="fa fa-phone hell" aria-hidden="true"></i>
                                <p>1 (800) 555-5555</p>
                            </div>
                            <div className="marketing-site-footer-block">
                                <i className="fa fa-envelope-o hell" aria-hidden="true"></i>
                                <p>roarbikes@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
export default withRouter(Footer);