import React from 'react';
import "./animate-input.css";

const FormsControl = ({meta,children}) =>{
    let hasError = (meta.error && meta.touched);
    return(
        <div>
            <div className={(hasError)? "error":null}>
                {children}
            </div>
            { hasError && <span className="error">{meta.error}</span> }
        </div>
    )
};

export const Input = (props) =>{
    const {input, meta,child,...restProps} = props;
    return <FormsControl {...props}><input  {...input} {...restProps} /></FormsControl>
};