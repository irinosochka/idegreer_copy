import React from 'react';
import {NavLink} from "react-router-dom";

const Logo = () => {
    return (
        <div>
            <NavLink to={'/'} style={{fontSize: '28px'}}>
                iDegreer
            </NavLink>
        </div>
    );
};

export default Logo;
