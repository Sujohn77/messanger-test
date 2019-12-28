import React from 'react';
import "./../assets/css/animate-input.scss"
import classnames from "classnames";

const FormsControl = ({meta,children,input,labelText}) =>{
    let hasError = (meta.error && meta.touched && !meta.active);
    return(
        <div>
            <div className={classnames("input-block")}>
                {children}
                <label name={input.name} htmlFor="">{labelText}</label>
            </div>
            { hasError && <span className="error">{meta.error}</span> }
        </div>
    )
};

export const Input = (props) =>{
    const {input, meta,child,...restProps} = props;
    return <FormsControl {...props}><input  {...input} {...restProps} /></FormsControl>
};