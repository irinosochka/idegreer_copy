import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../../reduxStore/auth-reducer";
import {actions as userActions} from "../../../reduxStore/user-reducer";
import {
    getAllLectionsFromCourse
} from "../../../reduxStore/lection-reducer";
import {AppStateType} from "../../../reduxStore/store";
import {getAllMembersFromCourse, getOneCourse} from "../../../reduxStore/course-reducer";
import {IUser} from "../../../models/IUser";
import {useParams} from "react-router-dom";
import CourseForBuying from "../../../components/CoursePageComponets/CourseForBuying";
import UserCourse from "../../../components/CoursePageComponets/UserCourse";
import {ICourse} from "../../../models/ICourse";

interface UserCourseProps {
    course: { course: ICourse, author: IUser },
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

    useEffect(() => {
        members.forEach(m => {
            if (m._id === authUser._id) {
                setMember(true);
                return
            }
        })
    }, [members])

    return (
        <div>
            {isMember ? <UserCourse /> : course.author && authUser._id === course.author._id ? <UserCourse /> : <CourseForBuying />}
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
