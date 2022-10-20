import React from 'react'
import Video from '../../img/landingVideo.mp4';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    
    return (
        <div className="landing">

            <video autoPlay muted loop id="myVideo">
                <source src={Video} type="video/mp4"></source>
            </video>

            <div className="landingText">
                <span className="landingName">Fetch Pups</span>
                <div className="landingWrapper">
                    <h1 className="landingTitle">Do you love dogs?</h1>
                    <p>Then if you do, take a peek through every breed of the man's best companion.</p>

                    <div className="landingLinks">
                        <Link className="landingButton" to="/home">
                            <button>Woof along</button>
                        </Link>

                        <Link className="landingAbout" to="/about">
                            <button>About us</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );

};

export default LandingPage;