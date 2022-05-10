import React, {FC, useEffect} from 'react';

import {connect} from "react-redux";

import {NavLink} from "react-router-dom";
import {ICourse} from "../../models/ICourse";
import CourseItem from "../CourseItem/CourseItem";
import {AppStateType} from "../../reduxStore/store";
import {getAllCourses} from "../../reduxStore/course-reducer";

interface CourseCatalogProps {
    courses: ICourse[],
    getAllCourses: () => void
}

const CourseCatalog: FC<CourseCatalogProps> = ({courses, getAllCourses}) => {

    useEffect(() => {
        getAllCourses()
    }, [])

    return (
        <div style={{background: '#fff', borderRadius: '10px', padding: '20px'}}>
            <h3 style={{fontWeight: '400', letterSpacing: '2px', fontSize: '24px', textAlign: 'center'}}>All Courses:</h3>
            <div className="courses__container">
                {courses.map((course: ICourse) => {
                            return <NavLink key={course._id} to={`/course/${course._id}`}><CourseItem course={course} /></NavLink>
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

export default connect(mapStateToProps, {getAllCourses})(CourseCatalog);
