import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../../reduxStore/auth-reducer";
import {actions as userActions} from "../../../reduxStore/user-reducer";
import {
    getAllLectionsFromCourse
} from "../../../reduxStore/lection-reducer";
import {AppStateType} from "../../../reduxStore/store";
import {getAllMembersFromCourse, getOneCourse} from "../../../reduxStore/course-reducer";
import "./userCoursePage.css"
import {IUser} from "../../../models/IUser";
import {useParams} from "react-router-dom";
import CourseForBuying from "../../../components/CoursePageComponets/CourseForBuying";
import UserCourse from "../../../components/CoursePageComponets/UserCourse";
import {ICourse} from "../../../models/ICourse";

interface UserCourseProps {
    course: ICourse,
    authUser: IUser,
    getOneCourse: (courseId: string) => void,
    members: Array<IUser>,
    getAllMembersFromCourse: (courseId: string) => void,

}

const UserCoursePage: FC<UserCourseProps> = ({
                                                 course,
                                                 authUser,
                                                 members,
                                                 getOneCourse,
                                                 getAllMembersFromCourse,
                                         }) => {

    const {id} = useParams();
    const [isMember, setMember] = useState(false);

    useEffect(() => {
        if (id) {
            getOneCourse(id);
            getAllLectionsFromCourse(id);
            getAllMembersFromCourse(id);
        }
    }, []);


    // members.forEach(e => e._id === authUser._id ? setMember(true) : setMember(false));

    return (
        <div>
            {isMember ? <UserCourse /> : <CourseForBuying />}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        course: state.course.course,
        authUser: state.auth.authUser,
        isLoading: state.auth.isLoading,
        members: state.course.members
    }
}

export default connect(mapStateToProps, {
    setLoading: authActions.setLoading,
    addCourseToCart: userActions.addCourseToCart,
    getOneCourse,
    getAllMembersFromCourse,
})(UserCoursePage);
