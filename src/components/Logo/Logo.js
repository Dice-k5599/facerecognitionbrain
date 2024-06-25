import React from "react";
import Tilt from "react-parallax-tilt";
import facelogo from "./icons8-facial-detection-100.png"
import './Logo.css'

const Logo = () => {
    return (
        <div className="center mb4">
            <Tilt className="Tilt" options={{ max: 25 }} style={{ height: "150px", width: "150px"}}>
                <div className="Tilt-inner pa3"><img style={{paddingTop: "5px"}} alt='logo' src={facelogo}></img></div>
            </Tilt>
        </div>
    )
}

export default Logo;