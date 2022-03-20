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

    function ini() {
        if (store.isAuth && store.user.name) {
            var splits = store.user.name.split(" ");
            var stringItog = "";

            for (let i = 0; i < splits.length; i++) {
                let Name = splits[i];
                let First = Name.substr(0, 1).toUpperCase();
                stringItog += First;
            }
            return stringItog;
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#4d6243',
            color: 'white',
            padding: '20px'
        }}>
            <div>
                <NavLink to={'/'} style={{fontSize: '28px'}}>
                    iDegreer
                </NavLink>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <NavLink to={'/profile'} style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        width: '45px',
                        height: '45px',
                        cursor: 'pointer',
                        display: 'flex',
                        marginRight: '10px'
                    }}>
                        <h2 style={{margin: 'auto', color: '#4d6243', fontWeight: 400}}>
                            {ini()}
                        </h2>
                    </div>
                    <div>
                        <h1 style={{fontSize: '20px'}}><b>{store.user.name}</b></h1>
                        <div style={{fontSize: '14px'}}>{store.user.email}</div>

                    </div>
                </NavLink>
                <img src={logoutIcon} style={{width: '20px', height: '20px', cursor: 'pointer', marginLeft: '10px'}}
                     onClick={logout} alt="logout"/>
            </div>
        </div>
    );
};

export default observer(Navbar);
