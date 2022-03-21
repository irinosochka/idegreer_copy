import React, {useContext} from 'react';
import {Context} from "../../index";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";

/* IMG */
// @ts-ignore
import logoutIcon from '../../assets/img/logout.png'
import PhotoMockup, {sizeTypes} from "../../common/photoMockup/PhotoMockup";

const Navbar = () => {

    const {store} = useContext(Context);

    const logout = () => {
        store.logout();
    }

    return (
        <div style={{background: '#4d6243'}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                padding: '20px',
                width: '1200px',
                margin: '0 auto'
            }}>
                <div>
                    <NavLink to={'/'} style={{fontSize: '28px'}}>
                        iDegreer
                    </NavLink>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <NavLink to={'/profile'} style={{display: 'flex', alignItems: 'center'}}>
                        <PhotoMockup size={sizeTypes.small}/>
                        <div>
                            <h1 style={{fontSize: '20px'}}><b>{store.authUser.name}</b></h1>
                            <div style={{fontSize: '14px'}}>{store.authUser.email}</div>
                        </div>
                    </NavLink>
                    <img src={logoutIcon} style={{width: '20px', height: '20px', cursor: 'pointer', marginLeft: '10px'}}
                         onClick={logout} alt="logout"/>
                </div>
            </div>
        </div>
    );
};

export default observer(Navbar);
