import React from "react";

export default function Start(props){
    return(
        <div className="start">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>   
            <button 
            className="start--button"
            onClick={props.startHandler}
            >Start quiz</button>
        </div>
    )
}