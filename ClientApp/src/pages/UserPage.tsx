import React, {FC, useState} from 'react';
import AddCourse from "../components/UserPanel/ProfessorPanel/AddCourse";
import EditProfileButton from "../components/UserPanel/EditProfileButton";
import {AppStateType} from "../reduxStore/store";
import {connect} from "react-redux";
import {IUser} from "../models/IUser";
import ProfessorCourses from "../components/UserPanel/ProfessorPanel/ProfessorCourses";
import ManageRoles from "../components/UserPanel/AdminPanel/ManageRoles";

/* IMG */
import profileIcon from '../assets/img/user-profile-svgrepo-com.svg';
import editIcon from '../assets/img/edit-svgrepo-com.svg';
import addCourseIcon from '../assets/img/add-svgrepo-com.svg';
import requestIcon from '../assets/img/question-svgrepo-com.svg';
import courseList from '../assets/img/list-svgrepo-com.svg';
import ManageCourses from "../components/UserPanel/AdminPanel/ManageCourses";
import RightMenu from "../components/UserPanel/RightMenuPanel/RightMenu";
import UserCourseList from "../components/UserPanel/UserPanel/UserCourseList";


export enum UserPageSlidesItems {
    ADD_COURSE = 'addCourse',
    USER_COURSES = 'userCourses',
    MANAGE_ROLE = 'manageRole',
    EDIT_COURSE = 'editCourse',
    PROFESSOR_COURSES = 'professorCourses',
}

interface UserPageProps {
    authUser: IUser
}

const UserPage: FC<UserPageProps> = ({authUser}) => {

    const [slideItem, setSlideItem] = useState('userCourses');

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '300px', flexGrow: '0', background: '#6675bc', height: 'calc(100vh - 85px)'}}>
                <div className="leftMenu__wrapper">
                    <div className="btn__menu">
                        <EditProfileButton isActive={slideItem === UserPageSlidesItems.USER_COURSES} icon={profileIcon} onClick={() => setSlideItem(UserPageSlidesItems.USER_COURSES)}>Your Courses</EditProfileButton>
                        {authUser && authUser.roles && authUser.roles.includes('PROFESSOR') && <EditProfileButton isActive={slideItem === UserPageSlidesItems.PROFESSOR_COURSES} icon={courseList} onClick={() => setSlideItem(UserPageSlidesItems.PROFESSOR_COURSES)}>Course list</EditProfileButton>}
                        {authUser && authUser.roles && authUser.roles.includes('PROFESSOR') && <EditProfileButton isActive={slideItem === UserPageSlidesItems.ADD_COURSE} icon={addCourseIcon} onClick={() => setSlideItem(UserPageSlidesItems.ADD_COURSE)}>Add course</EditProfileButton>}
                        {authUser && authUser.roles && authUser.roles.includes('ADMIN') && <EditProfileButton isActive={slideItem === UserPageSlidesItems.MANAGE_ROLE} icon={requestIcon} onClick={() => setSlideItem(UserPageSlidesItems.MANAGE_ROLE)}>Manage roles</EditProfileButton>}
                        {authUser && authUser.roles && authUser.roles.includes('ADMIN') &&<EditProfileButton isActive={slideItem === UserPageSlidesItems.EDIT_COURSE} icon={editIcon} onClick={() => setSlideItem(UserPageSlidesItems.EDIT_COURSE)}>Edit course</EditProfileButton>}
                    </div>
                </div>
            </div>
            <div style={{height: 'calc(100vh - 85px)', width: '1100px'}}>
                <div style={{background: '#e6ebff', height: 'calc(100vh - 85px)'}}>
                    <div className="edit__container" >
                        {slideItem === UserPageSlidesItems.USER_COURSES && <UserCourseList/>}
                        {slideItem === UserPageSlidesItems.PROFESSOR_COURSES && authUser && authUser.roles.includes('PROFESSOR') && <ProfessorCourses/>}
                        {slideItem === UserPageSlidesItems.ADD_COURSE && authUser && authUser.roles.includes('PROFESSOR') &&
                        <AddCourse/>}
                        {slideItem === UserPageSlidesItems.EDIT_COURSE && authUser && authUser.roles.includes('ADMIN') &&
                        <ManageCourses/>}
                        {slideItem === UserPageSlidesItems.MANAGE_ROLE && authUser && authUser.roles.includes('ADMIN') &&
                        <ManageRoles/>}
                    </div>
                </div>
            </div>
            <div className="rightMenu__wrapper" style={{width: '400px', background: '#e6ebff'}}>
                <RightMenu />
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
