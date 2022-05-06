import React from 'react';
import {NavLink} from "react-router-dom";

const Logo = () => {
    return (
        <div>
            <NavLink to={'/'} style={{marginLeft: '60px', fontSize: '32px', filter: 'brightness(0) saturate(100%) invert(41%) sepia(70%) saturate(344%) hue-rotate(192deg) brightness(99%) contrast(91%)' }}>
                iDegreer
            </NavLink>
        </div>
    );
};

export default Logo;
