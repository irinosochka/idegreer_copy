import React, {FC, useEffect} from 'react';

import "../../UserPanel/userPanel.css"
import ProfileSection from "./ProfileSection";
import Notifications from "./Notifications";
import {connect} from "react-redux";
import {getNotification} from "../../../reduxStore/user-reducer";
import {getCoursesOfUser} from "../../../reduxStore/course-reducer";
import {AppStateType} from "../../../reduxStore/store";
import {IUser} from "../../../models/IUser";
import {ICourse} from "../../../models/ICourse";

interface Props {
    getNotification: (id: string) => void,
    getCoursesOfUser: (userId: string) => void,
    userCourses: Array<{ course: ICourse, author: IUser }>
    authUser: IUser
}

const RightMenu: FC<Props> = ({getNotification, getCoursesOfUser, authUser, userCourses}) => {

    useEffect(() => {
        getCoursesOfUser(authUser._id)
    }, [])

    useEffect(() => {
        if (userCourses) {
            userCourses.forEach(c => c.course && c.course._id && getNotification(c.course._id) )
        }
    }, [userCourses])

    return (
        <>
            <ProfileSection />
            <Notifications />
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        userCourses: state.course.userCourses
    }
}
export default connect(mapStateToProps, {getNotification, getCoursesOfUser})(RightMenu);
