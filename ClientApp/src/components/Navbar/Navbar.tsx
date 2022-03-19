import React, {useContext} from 'react';
import {Context} from "../../index";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";

/* IMG */
// @ts-ignore
import logoutIcon from '../../assets/img/logout.png'

const Navbar = () => {

    const {store} = useContext(Context);

    const logout = () => {
        store.logout();
    }

    return (
        <div  style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#4d6243',
            color: 'white',
            padding: '20px'
        }}>
            <div>
                <NavLink to={'/'}>
                    iDegreer
                </NavLink>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div>
                    <NavLink to={'/profile'}>
                        <h1 style={{fontSize: '20px'}}><b>{store.user.name}</b></h1>
                        <div style={{fontSize: '14px'}}>{store.user.email}</div>
                    </NavLink>
                </div>
                <img src={logoutIcon} style={{width: '20px', height: '20px', cursor: 'pointer', marginLeft: '10px'}}
                     onClick={logout} alt="logout"/>
            </div>
        </div>
    );
};

export default observer(Navbar);