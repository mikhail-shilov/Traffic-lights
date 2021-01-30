import '../App.css';
import {useState, useEffect} from "react";

function Light(props) {

    return (
        <div className={props.isActive ? `light light--active light--${props.type}` : `light light--${props.type}`}>
            {props.isActive.toString()}
        </div>
    );
}

export default Light;
