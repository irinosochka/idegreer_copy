import React, {FC, useState} from 'react';
import EditProfile from "../components/UserPanel/EditProfile";
import ChangePassword from "../components/UserPanel/ChangePassword";
import AddCourse from "../components/UserPanel/ProfessorPanel/AddCourse";
import Profile from "../components/UserPanel/Profile";
import {NavLink} from "react-router-dom";
import PhotoMockup, {sizeTypes} from "../common/photoMockup/PhotoMockup";
import EditProfileButton from "../components/UserPanel/EditProfileButton";
import {AppStateType} from "../reduxStore/store";
import {connect} from "react-redux";
import {IUser} from "../models/IUser";
import ProfessorCourses from "../components/UserPanel/ProfessorPanel/ProfessorCourses";
import EditCourse from "../components/UserPanel/AdminPanel/EditCourse";
import ManageRoles from "../components/UserPanel/AdminPanel/ManageRoles";

/* IMG */
import profileIcon from '../assets/img/user-profile-svgrepo-com.svg';
import editIcon from '../assets/img/edit-svgrepo-com.svg';
import passwordIcon from '../assets/img/password-svgrepo-com.svg';
import addCourseIcon from '../assets/img/add-svgrepo-com.svg';
import requestIcon from '../assets/img/question-svgrepo-com.svg';
import courseList from '../assets/img/list-svgrepo-com.svg';



export enum UserPageSlidesItems {
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    ADD_COURSE = 'addCourse',
    INFO_PROFILE = 'infoProfile',
    MANAGE_ROLE = 'manageRole',
    EDIT_COURSE = 'editCourse',
    PROFESSOR_COURSES = 'professorCourses',
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
                        {authUser && authUser.roles && authUser.roles.includes('PROFESSOR') && <EditProfileButton isActive={slideItem === UserPageSlidesItems.PROFESSOR_COURSES} icon={courseList} onClick={() => setSlideItem(UserPageSlidesItems.PROFESSOR_COURSES)}>Course list</EditProfileButton>}
                        <EditProfileButton isActive={slideItem === UserPageSlidesItems.EDIT_PROFILE} icon={editIcon} onClick={() => setSlideItem(UserPageSlidesItems.EDIT_PROFILE)}>Edit profile</EditProfileButton>
                        <EditProfileButton isActive={slideItem === UserPageSlidesItems.CHANGE_PASSWORD} icon={passwordIcon} onClick={() => setSlideItem(UserPageSlidesItems.CHANGE_PASSWORD)}>Change password</EditProfileButton>
                        {authUser && authUser.roles && authUser.roles.includes('PROFESSOR') && <EditProfileButton isActive={slideItem === UserPageSlidesItems.ADD_COURSE} icon={addCourseIcon} onClick={() => setSlideItem(UserPageSlidesItems.ADD_COURSE)}>Add course</EditProfileButton>}
                        {authUser && authUser.roles && authUser.roles.includes('ADMIN') && <EditProfileButton isActive={slideItem === UserPageSlidesItems.MANAGE_ROLE} icon={requestIcon} onClick={() => setSlideItem(UserPageSlidesItems.MANAGE_ROLE)}>Manage roles</EditProfileButton>}
                        {authUser && authUser.roles && authUser.roles.includes('ADMIN') &&<EditProfileButton isActive={slideItem === UserPageSlidesItems.EDIT_COURSE} icon={editIcon} onClick={() => setSlideItem(UserPageSlidesItems.EDIT_COURSE)}>Edit course</EditProfileButton>}
                    </div>
                </div>
            </div>
            <div style={{flexGrow: '1', background: 'rgb(77, 98, 67)', height: 'calc(100vh - 85px)'}}>
                <div style={{background: '#fff', borderRadius: '50px 0 0 0', height: 'calc(100vh - 85px)'}}>
                    <div className="edit__container">
                        {slideItem === UserPageSlidesItems.INFO_PROFILE && <Profile/>}
                        {slideItem === UserPageSlidesItems.PROFESSOR_COURSES && authUser && authUser.roles.includes('PROFESSOR') && <ProfessorCourses/>}
                        {slideItem === UserPageSlidesItems.EDIT_PROFILE && <EditProfile/>}
                        {slideItem === UserPageSlidesItems.CHANGE_PASSWORD && <ChangePassword/>}
                        {slideItem === UserPageSlidesItems.ADD_COURSE && authUser && authUser.roles.includes('PROFESSOR') &&
                        <AddCourse/>}
                        {slideItem === UserPageSlidesItems.EDIT_COURSE && authUser && authUser.roles.includes('ADMIN') &&
                        <EditCourse/>}
                        {slideItem === UserPageSlidesItems.MANAGE_ROLE && authUser && authUser.roles.includes('ADMIN') &&
                        <ManageRoles/>}
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
