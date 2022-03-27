import React, {FC, useEffect, useState} from 'react';
import LessonList from "../components/CourseItem/Lesson/LessonList";
import {AppStateType} from "../reduxStore/store";
import {ICourse} from "../models/ICourse";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {getOneCourse} from "../reduxStore/course-reducer";

interface CoursePageProps {
    course: ICourse,
    getOneCourse: (id: string) => void
}

const CoursePage: FC<CoursePageProps> = ({course, getOneCourse}) => {
    const {id} = useParams();
    useEffect(() => {
        if (id) {
            getOneCourse(id)
        }
    }, []);

    const [lessons, setLessons] = useState([
        {id: 1, title: 'Lesson 1', time: '00:10:15'},
        {id: 2, title: 'Lesson 2', time: '00:34:13'},
        {id: 3, title: 'Lesson 3', time: '00:23:43'},
        {id: 4, title: 'Lesson 4', time: '00:12:33'},
        {id: 5, title: 'Lesson 5', time: '00:42:01'},
        {id: 6, title: 'Lesson 6', time: '00:22:01'}
    ])

    return (
        <div className="course-page">
            <div className="course__title">
                <h1>{course.title}</h1>
            </div>
            <div className="about-course-wrapper">
                <div className="course__desc">
                    {course.description}
                </div>
                <div className="course-details">
                    <div className="course__about">
                        <header>About course</header>
                    </div>
                    <div className="course__author">
                        {course.author && <h3>{course.author.name}</h3> }
                    </div>
                </div>
            </div>

            <div className="video-lesson-content" style={{height: "100%"}}>
                <div className="video-player-container" style={{padding: "0 15px 10px", display: 'block'}}>
                    <div className="content-header">
                        Lesson nr. 1
                    </div>
                    <div className="video-player-wrapper" style={{border: "1px solid black", height: "90%",textAlign:"center"}}>
                        Video
                    </div>
                </div>

                <LessonList lessons={lessons} />
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        course: state.course.course
    }
}

export default connect(mapStateToProps, {getOneCourse})(CoursePage);