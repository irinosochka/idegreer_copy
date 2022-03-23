import React, {FC, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import EditProfile from "../components/EditProfile/EditProfile";
import ChangePassword from "../components/EditProfile/ChangePassword";
import AddCourse from "../components/EditProfile/AddCourse";
import {Context} from "../index";
import Profile from "../components/EditProfile/Profile";
import {NavLink} from "react-router-dom";
import PhotoMockup, {sizeTypes} from "../common/photoMockup/PhotoMockup";

interface UserPageProps{
}

export enum UserPageSlidesItems {
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    ADD_COURSE = 'addCourse',
    INFO_PROFILE = 'infoProfile'
}

const UserPage:FC<UserPageProps> = () => {

    const {store} = useContext(Context)

    const [slideItem, setSlideItem] = useState('infoProfile');

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '300px', flexGrow: '0', background: 'rgb(77, 98, 67)', height: 'calc(100vh - 85px)'}}>
                <div className="leftMenu__wrapper">
                    <div>
                        <NavLink to={'/profile'} style={{}}>
                            <div style={{margin: '0 auto'}}><PhotoMockup size={sizeTypes.small}/></div>
                            <div>
                                <h1 style={{fontSize: '20px', textAlign: 'center', marginTop: '20px'}}><b>{store.authUser.name}</b></h1>
                            </div>
                        </NavLink>
                    </div>
                    <div className="btn__menu">
                        <div><button className={`edit__btn ${slideItem === UserPageSlidesItems.INFO_PROFILE && 'active'}`} onClick={()=> setSlideItem(UserPageSlidesItems.INFO_PROFILE)}> Profile </button></div>
                        <div><button className={`edit__btn ${slideItem === UserPageSlidesItems.EDIT_PROFILE && 'active'}`} onClick={()=> setSlideItem(UserPageSlidesItems.EDIT_PROFILE)}>Edit Profile</button></div>
                        <div><button className={`edit__btn ${slideItem === UserPageSlidesItems.CHANGE_PASSWORD && 'active'}`} onClick={()=> setSlideItem(UserPageSlidesItems.CHANGE_PASSWORD)}>Change password</button></div>
                        <div>{store.authUser.roles && store.authUser.roles.includes('PROFESSOR') && <button className={`edit__btn ${slideItem === UserPageSlidesItems.ADD_COURSE && 'active'}`} onClick={()=> setSlideItem(UserPageSlidesItems.ADD_COURSE)}>Add course</button>}</div>
                    </div>
                </div>
            </div>
            <div style={{flexGrow: '1', background: 'rgb(77, 98, 67)', height: 'calc(100vh - 85px)'}}>
                <div style={{background: '#fff', borderRadius: '50px 0 0 0', height: 'calc(100vh - 85px)'}}>
                    <div className="edit__container">
                        {slideItem === UserPageSlidesItems.INFO_PROFILE && <Profile/>}
                        {slideItem === UserPageSlidesItems.EDIT_PROFILE && <EditProfile/>}
                        {slideItem === UserPageSlidesItems.CHANGE_PASSWORD && <ChangePassword />}
                        {slideItem === UserPageSlidesItems.ADD_COURSE && store.authUser && store.authUser.roles.includes('PROFESSOR') && <AddCourse/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(UserPage);
