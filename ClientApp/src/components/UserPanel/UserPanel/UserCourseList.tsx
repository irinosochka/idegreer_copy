import React, {FC, useEffect} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {getCoursesOfUser} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import CourseItem from "../../CourseItem/CourseItem";
import {IUser} from "../../../models/IUser";
import {NavLink, useNavigate} from "react-router-dom";

interface UserCourseListProps {
    authUser: IUser,
    courses: ICourse[],
    getCoursesOfUser: (userId: string) => void
}

const UserCourseList: FC<UserCourseListProps> = ({courses, getCoursesOfUser, authUser}) => {
    const navigator = useNavigate();

    useEffect(() => {
        getCoursesOfUser(authUser._id);
    }, [])

    function handleClick() {
        navigator('/');
    }

    return (
        <>
            <div className="courses__container">
                {courses.length !== 0 ? courses.map((course: ICourse) => {
                        return <NavLink key={course._id} to={`/course/${course._id}`}><CourseItem course={course} /></NavLink>
                    }
                ) : <div style={{marginTop: '70px', width: '100%'}}>
                    <h3 style={{fontWeight: 'inherit', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>You don't have a course.
                        <div style={{color: 'orange', cursor: 'pointer', textDecoration: 'underline', margin: '0 5px'}} onClick={handleClick}>
                            Buy it</div>
                        for starting learning new programing language now.</h3>
                    </div>}
            </div>
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.userCourses,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {getCoursesOfUser})(UserCourseList);
