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
    courses: Array<{ course: ICourse, author: IUser }>
    authUser: IUser
}

const RightMenu: FC<Props> = ({getNotification, getCoursesOfUser, authUser, courses}) => {

    useEffect(() => {
        getCoursesOfUser(authUser._id);
    }, [])

    useEffect(() => {
        courses.forEach(c => getNotification(c.course._id))
    }, [courses])

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
        courses: state.course.courses
    }
}
export default connect(mapStateToProps, {getNotification, getCoursesOfUser})(RightMenu);
