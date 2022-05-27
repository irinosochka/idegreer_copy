import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

interface EditProfileButtonProps {
    icon: string,
    onClick: () => any,
    isActive: boolean,
    path: string
}

const MenuButton: FC<EditProfileButtonProps> = ({icon, path, onClick, children}) => {

    return (
        <NavLink to={path} className={({isActive}) =>
            isActive ? 'edit__btn active' : 'edit__btn'
        }
                 style={{display: 'flex', alignItems: 'center', marginTop: '30px', cursor: 'pointer'}}
                 onClick={onClick}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50px',
                padding: '16px',
                background: '#fff',
            }}>
                <img src={icon} style={{width: '20px', height: '20px'}} alt=""/>
            </div>
            <button style={{
                textAlign: 'left',
                fontSize: '15px',
                paddingLeft: '30px',
                textTransform: 'initial'
            }}>{children}</button>
        </NavLink>
    );
};

export default MenuButton;
