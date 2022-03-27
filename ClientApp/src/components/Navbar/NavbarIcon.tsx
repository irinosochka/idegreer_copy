import React, {FC} from 'react';
// @ts-ignore
import homeIcon from "../../assets/img/home-svgrepo-com.svg";
import {useNavigate} from "react-router-dom";

interface NavbarIcon {
    icon: string,
    bg?: string,
    link?: string,
    func?: () => void
}

const NavbarIcon: FC<NavbarIcon> = ({icon, link, func, bg}) => {
    const navigator = useNavigate();
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: bg ? bg : '#fff',
            borderRadius: '50px',
            width: '35px',
            height: '35px',
            marginRight: '10px',
            cursor: 'pointer'
        }} onClick={link ? () => {
            navigator(link)
        } : func}>
            <img src={icon} style={{color: '#fff', width: '15px', height: '15px'}} alt=""/>
        </div>
    );
};

export default NavbarIcon;
