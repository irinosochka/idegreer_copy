import React, {FC, useEffect} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {getAllCourses} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import {NavLink} from "react-router-dom";
import CourseItem from "../../CourseItem/CourseItem";
import {IUser} from "../../../models/IUser";

interface ProfessorCoursesProps {
    authUser: IUser,
    courses: ICourse[],
    getAllCourses: () => void
}

const ProfessorCourses: FC<ProfessorCoursesProps> = ({courses,getAllCourses, authUser}) => {
    useEffect(() => {
        getAllCourses();
        // courses.map((course: ICourse) => {
        //     if(course.author.name === authUser.name) {
        //         getAllCourses();
        //     }
        // })
    }, [])

    return (
        <div className="courses__container">
            {courses.map((course: ICourse) => {
                {return course.author.name === authUser.name && <NavLink key={course._id} to={`/course/${course._id}`}><CourseItem course={course} /></NavLink>}
                }
            )}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.courses,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {getAllCourses})(ProfessorCourses);
