import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ boxes, imageUrl }) => {
    return (
        <div id='finalimage'className="center ma3">
            <div className="absolute mt2 mb2">
                <img id='inputimage'alt="" src={imageUrl} width="500px" height="auto"/>
                {boxes.map(box => {
                    return <div className="bounding-box" style={{top: box.top_row, right: box.right_col,
                        bottom: box.bottom_row, left: box.left_col}}></div>
                })}
            </div>
        </div>
    )
}

export default FaceRecognition;