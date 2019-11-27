import React  from "react";
import {Field, reduxForm} from "redux-form";
import {StyledModal} from "./styled-components/StyledModal";
import Button from "@material-ui/core/Button";

import "./../assets/css/modal.scss"

export const Modal = ({handleSubmit,closeModal,...props}) => {
    return (
        <StyledModal {...props} class="modal-window">
            <form onSubmit={handleSubmit}>
                <Field name="createGroup"
                        component="input"
                        className="input-group"/>      
                <Button type="submit">Create</Button>
                <Button onClick={closeModal} type="close" className="close-btn">X</Button>
            </form>
        </StyledModal>)
}

export const ModalCreateGroup = reduxForm({
    form: "createGroup"
})(Modal);
