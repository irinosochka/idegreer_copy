import React, {FC, useEffect} from 'react';

import {connect} from "react-redux";

import {NavLink} from "react-router-dom";
import {ICourse} from "../models/ICourse";
import CourseItem from "../components/CourseItem/CourseItem";
import {AppStateType} from "../reduxStore/store";
import {getAllCourses} from "../reduxStore/course-reducer";
import {IUser} from "../models/IUser";

interface CourseCatalogProps {
    courses: Array<{ course: ICourse, author: IUser }>,
    getAllCourses: () => void
}

const CourseCatalogPage: FC<CourseCatalogProps> = ({courses, getAllCourses}) => {

    useEffect(() => {
        getAllCourses()
    }, [])

    return (
        <div className="page__content">
            <h3 className="page__title">All Courses:</h3>
            <div className="courses__container" style={{marginTop: '-30px', paddingLeft: '65px'}}>
                {courses.length !== 0 ? courses.map((course: { course: ICourse, author: IUser }) => {
                            return <NavLink key={course.course._id} to={`/course/${course.course._id}`}><CourseItem course={course} /></NavLink>
                        }
                    ) :
                    <div style={{marginTop: '40px', width: '100%'}}>
                        <h3 className="no-courses__info">Failed to load courses. Please try again later.</h3>
                    </div>}
            </div>
        </div>
);
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.courses
    }
}

export default connect(mapStateToProps, {getAllCourses})(CourseCatalogPage);
