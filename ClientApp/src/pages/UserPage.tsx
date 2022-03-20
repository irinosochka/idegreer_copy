import React, {FC, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import EditProfile from "../components/EditProfile/EditProfile";
import ChangePassword from "../components/EditProfile/ChangePassword";
import AddCourse from "../components/AddCourse/AddCourse";
import {Context} from "../index";

interface UserPageProps{
}

export enum UserPageSlidesItems {
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    ADD_COURSE = 'addCourse'
}

const UserPage:FC<UserPageProps> = () => {

    const {store} = useContext(Context)

    const [slideItem, setSlideItem] = useState('editProfile');

    return (
        <div>
            <div className="edit__container">
                <div className="btn__menu">
                    <button className={`edit__btn ${slideItem === UserPageSlidesItems.EDIT_PROFILE && 'active'}`} onClick={()=> setSlideItem(UserPageSlidesItems.EDIT_PROFILE)}>Edit Profile</button>
                    <button className={`password__btn ${slideItem === UserPageSlidesItems.CHANGE_PASSWORD && 'active'}`} onClick={()=> setSlideItem(UserPageSlidesItems.CHANGE_PASSWORD)}>Change password</button>
                    {store.authUser.roles && store.authUser.roles.includes('PROFESSOR') && <button className={`password__btn ${slideItem === UserPageSlidesItems.ADD_COURSE && 'active'}`} onClick={()=> setSlideItem(UserPageSlidesItems.ADD_COURSE)}>Add course</button>}
                </div>
                {slideItem === UserPageSlidesItems.EDIT_PROFILE && <EditProfile/>}
                {slideItem === UserPageSlidesItems.CHANGE_PASSWORD && <ChangePassword />}
                {slideItem === UserPageSlidesItems.ADD_COURSE && store.authUser && store.authUser.roles.includes('PROFESSOR') && <AddCourse/>}
            </div>
        </div>
    );
};

export default observer(UserPage);
