import preloadImg from "../assets/imgs/preload.svg";
import React from "react";

const Preloader =() =>{
    return (
        <div className="preloader">
            {
                <img src={preloadImg} alt=""/>
            }
        </div>
    )
}
export default Preloader;
