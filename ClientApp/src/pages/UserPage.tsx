import React, {FC, useState} from 'react';
import EditProfile from "../components/UserPanel/EditProfile";
import ChangePassword from "../components/UserPanel/ChangePassword";
import AddCourse from "../components/UserPanel/ProfessorPanel/AddCourse";
import Profile from "../components/UserPanel/Profile";
import {NavLink} from "react-router-dom";
import PhotoMockup, {sizeTypes} from "../common/photoMockup/PhotoMockup";

/* IMG */
// @ts-ignore
import profileIcon from '../assets/img/user-profile-svgrepo-com.svg'
// @ts-ignore
import editIcon from '../assets/img/edit-svgrepo-com.svg'
// @ts-ignore
import passwordIcon from '../assets/img/password-svgrepo-com.svg'
// @ts-ignore
import addCourseIcon from '../assets/img/add-svgrepo-com.svg'
import EditProfileButton from "../components/UserPanel/EditProfileButton";
import AddRole from "../components/UserPanel/AdminPanel/AddRole";
import {AppStateType} from "../reduxStore/store";
import {connect} from "react-redux";
import {IUser} from "../models/IUser";
import RoleRequestList from "../components/UserPanel/AdminPanel/RoleRequestList";

export enum UserPageSlidesItems {
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    ADD_COURSE = 'addCourse',
    INFO_PROFILE = 'infoProfile',
    ADD_ROLE = 'addRole',
    ROLE_REQUEST = 'roleRequest'
}

interface UserPageProps {
    authUser: IUser
}

const UserPage: FC<UserPageProps> = ({authUser}) => {

    const [slideItem, setSlideItem] = useState('infoProfile');

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '300px', flexGrow: '0', background: 'rgb(77, 98, 67)', height: 'calc(100vh - 85px)'}}>
                <div className="leftMenu__wrapper">
                    <div>
                        <NavLink to={'/profile'} style={{}}>
                            <div style={{margin: '0 auto'}}><PhotoMockup size={sizeTypes.small}/></div>
                            <div>
                                <h1 style={{fontSize: '20px', textAlign: 'center', marginTop: '20px'}}>
                                    <b>{authUser.name}</b></h1>
                            </div>
                        </NavLink>
                    </div>
                    <div className="btn__menu">
                        <EditProfileButton isActive={slideItem === UserPageSlidesItems.INFO_PROFILE} icon={profileIcon}  onClick={() => setSlideItem(UserPageSlidesItems.INFO_PROFILE)}>Profile</EditProfileButton>
                        <EditProfileButton isActive={slideItem === UserPageSlidesItems.EDIT_PROFILE} icon={editIcon} onClick={() => setSlideItem(UserPageSlidesItems.EDIT_PROFILE)}>Edit profile</EditProfileButton>
                        <EditProfileButton isActive={slideItem === UserPageSlidesItems.CHANGE_PASSWORD} icon={passwordIcon} onClick={() => setSlideItem(UserPageSlidesItems.CHANGE_PASSWORD)}>Change password</EditProfileButton>
                        {authUser && authUser.roles && authUser.roles.includes('PROFESSOR') &&<EditProfileButton isActive={slideItem === UserPageSlidesItems.ADD_COURSE} icon={addCourseIcon} onClick={() => setSlideItem(UserPageSlidesItems.ADD_COURSE)}>Add course</EditProfileButton>}
                        {authUser && authUser.roles && authUser.roles.includes('ADMIN') && <EditProfileButton isActive={slideItem === UserPageSlidesItems.ADD_ROLE} icon={addCourseIcon} onClick={() => setSlideItem(UserPageSlidesItems.ADD_ROLE)}>Add role</EditProfileButton>}
                        {authUser && authUser.roles && authUser.roles.includes('ADMIN') && <EditProfileButton isActive={slideItem === UserPageSlidesItems.ROLE_REQUEST} icon={addCourseIcon} onClick={() => setSlideItem(UserPageSlidesItems.ROLE_REQUEST)}>Role request</EditProfileButton>}
                    </div>
                </div>
            </div>
            <div style={{flexGrow: '1', background: 'rgb(77, 98, 67)', height: 'calc(100vh - 85px)'}}>
                <div style={{background: '#fff', borderRadius: '50px 0 0 0', height: 'calc(100vh - 85px)'}}>
                    <div className="edit__container">
                        {slideItem === UserPageSlidesItems.INFO_PROFILE && <Profile/>}
                        {slideItem === UserPageSlidesItems.EDIT_PROFILE && <EditProfile/>}
                        {slideItem === UserPageSlidesItems.CHANGE_PASSWORD && <ChangePassword/>}
                        {slideItem === UserPageSlidesItems.ADD_COURSE && authUser && authUser.roles.includes('PROFESSOR') &&
                            <AddCourse/>}
                        {slideItem === UserPageSlidesItems.ADD_ROLE && authUser && authUser.roles.includes('ADMIN') &&
                        <AddRole/>}
                        <div style={{marginTop: '30px', marginLeft: '50px', justifyContent: 'start'}}>
                            {slideItem === UserPageSlidesItems.ROLE_REQUEST && authUser && authUser.roles.includes('ADMIN') &&
                                <RoleRequestList/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {})(UserPage);
