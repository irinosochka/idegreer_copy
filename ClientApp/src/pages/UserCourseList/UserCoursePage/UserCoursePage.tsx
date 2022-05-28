import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../../reduxStore/auth-reducer";
import {
    getAllLectionsFromCourse
} from "../../../reduxStore/lection-reducer";
import {AppStateType} from "../../../reduxStore/store";
import {getAllMembersFromCourse, getOneCourse} from "../../../reduxStore/course-reducer";
import "./userCoursePage.css"
import {IUser} from "../../../models/IUser";
import {useParams} from "react-router-dom";
import CourseForBuying from "../../../components/CoursePageComponets/CourseForBuying";

interface UserCourseProps {
    authUser: IUser,
    getOneCourse: (courseId: string) => void,
    members: Array<IUser>,
    getAllMembersFromCourse: (courseId: string) => void,
}

const UserCoursePage: FC<UserCourseProps> = ({
                                                 authUser,
                                                 members,
                                                 getOneCourse,
                                                 getAllMembersFromCourse,
                                         }) => {

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getOneCourse(id);
            getAllLectionsFromCourse(id);
            getAllMembersFromCourse(id);
        }
    }, []);

    return (
        <div>
            <CourseForBuying />
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        isLoading: state.auth.isLoading,
        members: state.course.members,
    }
}

export default connect(mapStateToProps, {
    setLoading: authActions.setLoading,
    getOneCourse,
    getAllMembersFromCourse,
})(UserCoursePage);
