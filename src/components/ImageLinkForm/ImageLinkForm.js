import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 white">
                {"This Magic Brain will detect faces in your picture. Type in image link below (.jpg format)"}
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5 form center">
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <a className="w-30 grow f4 link ph3 pv2 dib white bg-dark-blue"
                    onClick={onButtonSubmit}>Detect</a>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;