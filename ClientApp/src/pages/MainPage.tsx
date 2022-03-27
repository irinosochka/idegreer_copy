import React, {FC, useEffect} from 'react';
import CourseItem from "../components/CourseItem/CourseItem";
import {ICourse} from "../models/ICourse";
import {connect} from "react-redux";
import {AppStateType} from "../reduxStore/store";
import {getAllCourses} from "../reduxStore/course-reducer";
import {NavLink} from "react-router-dom";

interface MainPageProps {
    courses: ICourse[],
    getAllCourses: () => void
}

const MainPage: FC<MainPageProps> = ({courses, getAllCourses}) => {

    useEffect(() => {
        getAllCourses()
    }, [])

    return (
        <div style={{width: '1200px', display: 'block', margin: '0 auto'}}>
            <h1 style={{textAlign: 'left', marginTop: '20px', fontSize: '20px'}}>All courses</h1>
            <div className="courses__container">
                {courses.map((course: ICourse) => {
                        return <NavLink key={course._id} to={'/course/:id'}><CourseItem course={course} /></NavLink>
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

export default connect(mapStateToProps, {getAllCourses})(MainPage);
