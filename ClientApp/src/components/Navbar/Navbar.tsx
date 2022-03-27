import React, {FC} from 'react';
import {useLocation} from "react-router-dom";

/* IMG */
// @ts-ignore
import logoutIcon from '../../assets/img/logout-svgrepo-com.svg'
// @ts-ignore
import homeIcon from '../../assets/img/home-svgrepo-com.svg'
// @ts-ignore
import profileIcon from '../../assets/img/user-profile-svgrepo-com.svg'
import {connect} from "react-redux";
import {logout} from "../../reduxStore/auth-reducer";
import NavbarIcon from "./NavbarIcon";
import Logo from "../../common/Logo";

interface NavbarProps {
    logout: () => void
}

const Navbar: FC<NavbarProps> = ({logout}) => {

    const location = useLocation();

    return (
        <div style={{background: '#4d6243'}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: `${location.pathname === '/' || location.pathname === '/course/:id' ? 'space-between' : 'end'}`,
                color: 'white',
                padding: '20px',
                textAlign: 'left'
            }}>
                {(location.pathname === '/' || location.pathname === '/course/:id') && <Logo />}
                <div style={{display: 'flex', alignItems: 'center', textAlign: 'right', padding: '5px 0'}}>
                    <NavbarIcon icon={homeIcon} link={'/'} />
                    <NavbarIcon icon={profileIcon} link={'/profile'} />
                    <NavbarIcon icon={logoutIcon} func={logout} bg={'rgb(217 115 115)'} />
                </div>
            </div>
        </div>
    );
};

export default connect(null, {logout})(Navbar);
