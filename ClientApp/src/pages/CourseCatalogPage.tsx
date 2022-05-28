import React, {FC, useEffect} from 'react';

import {connect} from "react-redux";

import {NavLink} from "react-router-dom";
import {ICourse} from "../models/ICourse";
import CourseItem from "../components/CourseItem/CourseItem";
import {AppStateType} from "../reduxStore/store";
import {getAllCourses} from "../reduxStore/course-reducer";

interface CourseCatalogProps {
    courses: ICourse[],
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
                {courses.map((course: ICourse) => {
                            return <NavLink key={course._id} to={`/course/buy/${course._id}`}><CourseItem course={course} /></NavLink>
                        }
                    )}
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
