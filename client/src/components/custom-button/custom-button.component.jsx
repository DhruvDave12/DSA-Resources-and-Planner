import React from "react";
import { Button } from 'antd';

const CustomButton = ({text, handleChange}) => {
    return (
        <Button type="primary" onClick={handleChange}>{text}</Button>
    )
}

export default CustomButton;