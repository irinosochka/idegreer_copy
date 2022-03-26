import React, {FC} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";

/* IMG */
// @ts-ignore
import logoutIcon from '../../assets/img/logout-svgrepo-com.svg'
// @ts-ignore
import homeIcon from '../../assets/img/home-svgrepo-com.svg'
// @ts-ignore
import profileIcon from '../../assets/img/user-profile-svgrepo-com.svg'
import {connect} from "react-redux";
import {logout} from "../../reduxStore/auth-reducer";

interface NavbarProps {
    logout: () => void
}

const Navbar: FC<NavbarProps> = ({logout}) => {

    const navigator = useNavigate();

    const location = useLocation();

    return (
        <div style={{background: '#4d6243'}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: `${location.pathname === '/' ? 'space-between' : 'end'}`,
                color: 'white',
                padding: '20px',
                textAlign: 'left'
            }}>
                {location.pathname === '/' && <div>
                    <NavLink to={'/'} style={{fontSize: '28px'}}>
                        iDegreer
                    </NavLink>
                </div>}

                <div style={{display: 'flex', alignItems: 'center', textAlign: 'right', padding: '5px 0'}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', borderRadius: '50px', width: '35px', height: '35px', marginRight: '10px', cursor: 'pointer'}} onClick={() => {
                        navigator('/')
                    }}>
                        <img src={homeIcon} style={{color: '#fff', width: '15px', height: '15px'}}  alt=""/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', borderRadius: '50px', width: '35px', height: '35px', marginRight: '10px', cursor: 'pointer'}} onClick={() => {
                        navigator('/profile')
                    }}>
                        <img src={profileIcon} style={{color: '#fff', width: '15px', height: '15px'}}  alt=""/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgb(217 115 115)', borderRadius: '50px', width: '35px', height: '35px', cursor: 'pointer'}} onClick={logout}>
                        <img src={logoutIcon} style={{width: '15px', height: '15px'}}
                              alt="logout"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, {logout})(Navbar);
