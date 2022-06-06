import React, {FC, useState} from 'react';
import MenuButton from "../../common/MenuButton";
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {IUser} from "../../models/IUser";
import './leftMenu.css';
import {getCoursesOfUser} from "../../reduxStore/course-reducer";
import {getNotification} from "../../reduxStore/user-reducer";
import ManualWindow from "./ManualWindow/ManualWindow";

/* IMG */
import profileIcon from '../../assets/img/user-profile-svgrepo-com.svg';
import editIcon from '../../assets/img/edit-svgrepo-com.svg';
import addCourseIcon from '../../assets/img/add-svgrepo-com.svg';
import requestIcon from '../../assets/img/question-svgrepo-com.svg';
import courseList from '../../assets/img/list-svgrepo-com.svg';
import homeIcon from '../../assets/img/home-svgrepo-com.svg';


export enum UserPageSlidesItems {
    ADD_COURSE = 'addCourse',
    USER_COURSES = 'userCourses',
    MANAGE_ROLE = 'manageRole',
    EDIT_COURSE = 'editCourse',
    PROFESSOR_COURSES = 'professorCourses',
    ALL_COURSES_LIST = 'allCoursesLink',
}

interface UserPageProps {
    authUser: IUser,
}

const LeftMenu: FC<UserPageProps> = ({authUser}) => {
    const [slideItem, setSlideItem] = useState(UserPageSlidesItems.USER_COURSES);
    const [manualActive, setManualActive] = useState(false);


    return (
        <div style={{width: '300px', flexGrow: '0', background: '#6675bc', height: 'calc(100vh - 85px)'}}>
            <div className="leftMenu__wrapper">
                <div className="btn__menu">
                    <MenuButton path={'/'} isActive={slideItem === UserPageSlidesItems.ALL_COURSES_LIST}
                                icon={homeIcon}
                                onClick={() => setSlideItem(UserPageSlidesItems.ALL_COURSES_LIST)}>Course
                        Catalog</MenuButton>
                    <MenuButton path={'/your-courses'} isActive={slideItem === UserPageSlidesItems.USER_COURSES}
                                icon={profileIcon}
                                onClick={() => setSlideItem(UserPageSlidesItems.USER_COURSES)}>Your
                        Courses</MenuButton>
                    {authUser && authUser.roles && authUser.roles.includes('PROFESSOR') &&
                        <MenuButton path={'/course-list'}
                                    isActive={slideItem === UserPageSlidesItems.PROFESSOR_COURSES}
                                    icon={courseList}
                                    onClick={() => setSlideItem(UserPageSlidesItems.PROFESSOR_COURSES)}>Course
                            list</MenuButton>}
                    {authUser && authUser.roles && authUser.roles.includes('PROFESSOR') &&
                        <MenuButton path={'/add-course'} isActive={slideItem === UserPageSlidesItems.ADD_COURSE}
                                    icon={addCourseIcon}
                                    onClick={() => setSlideItem(UserPageSlidesItems.ADD_COURSE)}>Add
                            course</MenuButton>}
                    {authUser && authUser.roles && authUser.roles.includes('ADMIN') &&
                        <MenuButton path={'/manage-roles'}
                                    isActive={slideItem === UserPageSlidesItems.MANAGE_ROLE}
                                    icon={requestIcon}
                                    onClick={() => setSlideItem(UserPageSlidesItems.MANAGE_ROLE)}>Manage
                            roles</MenuButton>}
                    {authUser && authUser.roles && authUser.roles.includes('ADMIN') &&
                        <MenuButton path={'/admin-courses-management'}
                                    isActive={slideItem === UserPageSlidesItems.EDIT_COURSE} icon={editIcon}
                                    onClick={() => setSlideItem(UserPageSlidesItems.EDIT_COURSE)}>Edit
                            course</MenuButton>}
                    <button onClick={() => setManualActive(true)} className="manual-btn">?</button>
                    <ManualWindow active={manualActive} setActive={setManualActive}/>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        notifications: state.user.userNotifications,
        courses: state.course.userCourses,
    }
}

export default connect(mapStateToProps, {getCoursesOfUser, getNotification})(LeftMenu);
