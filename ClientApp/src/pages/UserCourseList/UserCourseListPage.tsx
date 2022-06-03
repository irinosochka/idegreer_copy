import React, {FC, useEffect, useState} from 'react';
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {ICourse} from "../../models/ICourse";
import CourseItem from "../../components/CourseItem/CourseItem";
import {NavLink} from "react-router-dom";
import {IUser} from "../../models/IUser";
import {getCoursesOfUser} from "../../reduxStore/course-reducer";

interface UserCourseListProps {
    courses: Array<{ course: ICourse, author: IUser }>,
    authUser: IUser,
    getCoursesOfUser: (userId: string) => void
}

const UserCourseListPage: FC<UserCourseListProps> = ({courses, authUser, getCoursesOfUser}) => {
    const [visibleList, setVisibleList] = useState(true);

    useEffect(() => {
        getCoursesOfUser(authUser._id)
    }, [])

    const handleSelecting = () => {
        setVisibleList(false);
    }

    return (
        <div className="page__content">
            {visibleList &&
            <>
            <h3 className="page__title">Your Courses:</h3>
            <div className="courses__container" style={{marginTop: '-30px', paddingLeft: '65px'}}>
                {courses.length !== 0 ? courses.map((course: { course: ICourse, author: IUser }) => {
                        return <div key={course.course._id}
                                    onClick={() => {
                                        handleSelecting()
                                    }} style={{cursor: 'pointer'}}>
                           <NavLink to={`/course/${course.course._id}`} ><CourseItem course={course}/></NavLink>
                        </div>
                    }
                ) : <div style={{marginTop: '70px', width: '100%'}}>
                    <h3 className="no-courses__info">You don't have a course. Buy it for starting learning new programing language now.</h3>
                </div>}
            </div>
            </>
            }
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.userCourses,
        authUser: state.auth.authUser,
    }
}

export default connect(mapStateToProps, {getCoursesOfUser})(UserCourseListPage);
