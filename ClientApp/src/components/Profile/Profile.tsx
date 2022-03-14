import React, {useContext} from 'react';
import {Context} from "../../index";

/* IMG */
// @ts-ignore
import logoutIcon from '../../assets/img/logout.png'
import {useNavigate} from "react-router-dom";

const Profile = () => {

    const {store} = useContext(Context);

    const navigate = useNavigate()

    const logout = () => {
        store.logout();
        navigate('/auth');
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            background: '#4d6243',
            color: 'white',
            padding: '20px'
        }}>
            <div>
                <h1 style={{fontSize: '20px'}}><b>{store.user.username}</b></h1>
                <div style={{fontSize: '14px'}}>Role: {store.user.roles}</div>
            </div>
            <img src={logoutIcon} style={{width: '20px', height: '20px', cursor: 'pointer', marginLeft: '10px'}} onClick={logout} alt="logout"/>
        </div>
    );
};

export default Profile;