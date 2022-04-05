import React, {FC} from 'react';
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../reduxStore/auth-reducer";
import './navbar.css'

/* IMG */
import logoutIcon from '../../assets/img/logout-svgrepo-com.svg'
import homeIcon from '../../assets/img/home-svgrepo-com.svg'
import profileIcon from '../../assets/img/user-profile-svgrepo-com.svg'
import NavbarIcon from "./NavbarIcon";
import Logo from "../../common/Logo";

interface NavbarProps {
    logout: () => void
}

const Navbar: FC<NavbarProps> = ({logout}) => {

    const location = useLocation();

    return (
        <div className={'navbar__wrapper'}>
            <div className={'navbar__content_wrapper'} style={{justifyContent: `${location.pathname === '/' || location.pathname === '/course/:id' ? 'space-between' : 'end'}`}}>
                {(location.pathname === '/' || location.pathname === '/course/:id') && <Logo />}
                <div className={'icons__wrapper'}>
                    <NavbarIcon icon={homeIcon} link={'/'} />
                    <NavbarIcon icon={profileIcon} link={'/profile'} />
                    <NavbarIcon icon={logoutIcon} func={logout} bg={'rgb(217 115 115)'} />
                </div>
            </div>
        </div>
    );
};

export default connect(null, {logout})(Navbar);
