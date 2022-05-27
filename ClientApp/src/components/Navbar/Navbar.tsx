import React, {FC} from 'react';
import {connect} from "react-redux";
import {logout} from "../../reduxStore/auth-reducer";
import './navbar.css'

/* IMG */
import logoutIcon from '../../assets/img/logout-svgrepo-com.svg';
import homeIcon from '../../assets/img/home-svgrepo-com.svg';
import cartIcon from '../../assets/img/shopping-cart-svgrepo-com.svg';
import NavbarIcon from "./NavbarIcon";
import Logo from "../../common/Logo";
import {ICourse} from "../../models/ICourse";
import {AppStateType} from "../../reduxStore/store";

interface NavbarProps {
    logout: () => void,
    cartList: Array<ICourse>,
}

const Navbar: FC<NavbarProps> = ({logout, cartList}) => {

    return (
        <div className={'navbar__wrapper'}>
            <div className={'navbar__content_wrapper'}>
                {/*{(location.pathname === '/' || location.pathname === '/course/:id') && <Logo />}*/}
                <Logo />
                <div className={'icons__wrapper'}>
                    <NavbarIcon icon={homeIcon} link={'/'} />
                    <div className="cart-icon">
                        {cartList.length !== 0 && <span className="cart-items-counter">{cartList.length}</span>}
                        <NavbarIcon icon={cartIcon} link={'/cart'} />
                    </div>
                    <NavbarIcon icon={logoutIcon} func={logout} bg={'rgb(217 115 115)'} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        cartList: state.user.cartList,
    }
}

export default connect(mapStateToProps, {logout})(Navbar);
