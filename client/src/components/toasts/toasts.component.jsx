import React from "react";
import { ToastContainer, toast } from 'react-toastify';


const CustomToast = ({position}) => {

    return (
        <div>
            <ToastContainer position={position} autoClose={5000} closeOnClick theme="colored"/>
        </div>
    )
}

export default CustomToast;