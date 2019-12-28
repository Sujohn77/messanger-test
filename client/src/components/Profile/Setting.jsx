import React from 'react';

import logoutImg from "./../../assets/imgs/logout.png"
import {Main, Row} from "./../../styled-components/Settings";

const Settings = ({logout}) =>{
    return <Main>
        <div onClick={logout}>
            <Row>
                <p >
                    LOGOUT
                </p>
                <div>
                    <img src={logoutImg} alt="logout"/>
                </div> 
            </Row>
        </div>
    </Main>
};
export default Settings;

