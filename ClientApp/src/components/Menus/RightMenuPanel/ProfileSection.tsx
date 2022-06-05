import React, {useState} from 'react';

import "../../UserPanel/userPanel.css"
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import editPhoto from "../../../assets/img/edit-svgrepo-com.svg";
import changePassword from "../../../assets/img/password-svgrepo-com.svg";

import closeIcon from "../../../assets/img/close-svgrepo-com.svg";
import Profile from "./Profile";

export enum ButtonItems {
    PROFILE = 'profile',
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
}

const ProfileSection = () => {
    const [slideItem, setSlideItem] = useState('profile');

    const handleClose = () => {
        setSlideItem(ButtonItems.PROFILE)
    }

    return (
        <div style={{background: '#6675bc', borderRadius: '10px', margin: '10px', padding: '10px 10px 0', color: '#fff'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end' ,marginTop: '5px'}}>



                <div className='tooltip'>
                    <img className={`svg-color ${slideItem === ButtonItems.EDIT_PROFILE && 'active'}`} onClick={()=> setSlideItem(ButtonItems.EDIT_PROFILE)} style={{width: '20px', margin: '0 10px', transform: 'scale(-1,1)'}} src={editPhoto} alt=""/>
                    <span className="tooltiptext">Edit profile</span>
                </div>
                <div className='tooltip'>
                    <img className={`svg-color ${slideItem === ButtonItems.CHANGE_PASSWORD && 'active'}`} onClick={()=> setSlideItem(ButtonItems.CHANGE_PASSWORD)} style={{width: '20px', margin: '0 10px'}} src={changePassword} alt=""/>
                    <span className="tooltiptext">Change password</span>
                </div>

                { (slideItem === ButtonItems.EDIT_PROFILE || slideItem === ButtonItems.CHANGE_PASSWORD ) && <img className='svg-color' style={{width: '18px', margin: '0 10px'}} src={closeIcon} alt="" onClick={handleClose}/>}

            </div>
            <div style={{margin: '20px 0'}}>
                {slideItem === ButtonItems.PROFILE && <Profile/>}
                {slideItem === ButtonItems.EDIT_PROFILE && <EditProfile handleClose={handleClose}/>}
                {slideItem === ButtonItems.CHANGE_PASSWORD && <ChangePassword handleClose={handleClose}/>}
            </div>
        </div>
    );
};

export default ProfileSection;
