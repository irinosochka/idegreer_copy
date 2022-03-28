import React, {FC, useEffect} from 'react';
import LessonList from "../components/CourseItem/Lesson/LessonList";
import {useParams} from "react-router-dom";
import {getOneCourse} from "../reduxStore/course-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../reduxStore/store";
import {ICourse} from "../models/ICourse";
import Button from "../common/button/Button";
import './coursePage.css'

interface CoursePage {
    getOneCourse: (courseId: string) => void,
    course: ICourse
}

const CoursePage: FC<CoursePage> = ({course, getOneCourse}) => {
  const {id} = useParams();
    useEffect(() => {
        if (id) {
            getOneCourse(id)
        }
    }, []);
    const lessons = [
        {id: 1, title: 'Lesson 1', time: '00:10:15'},
        {id: 2, title: 'Lesson 2', time: '00:34:13'},
        {id: 3, title: 'Lesson 3', time: '00:23:43'},
        {id: 4, title: 'Lesson 4', time: '00:12:33'},
        {id: 5, title: 'Lesson 5', time: '00:42:01'},
        {id: 6, title: 'Lesson 6', time: '00:22:34'},
        {id: 7, title: 'Lesson 7', time: '00:12:54'},
        {id: 8, title: 'Lesson 8', time: '00:45:25'}
    ];

    const params = useParams()

    useEffect(() => {
        getOneCourse(params.id!)
    }, [])


    return (
        <div className="course-page">
            <div className="course__title">
                <h1>{course.title}</h1>
                <div className="course__desc">
                    {course.description}
                </div>
                <div className="about-course-wrapper">
                    <div className="course__details">
                        <div className="course__evaluation">
                            Course evaluation: <span>★★★★★</span>
                        </div>
                        <div className="course__members">
                            Number of members: 18
                        </div>
                    </div>
                    <div className="course__price">
                        <h2>Price: ${course.price}</h2>
                        <Button>Add to cart</Button>
                    </div>
                </div>
                <div className="course__author">
                    {course.author && <div>Course author: {course.author.name}</div> }
                </div>
            </div>


            <div className="video-lesson-content">
                <div className="video-player-container">
                    <header className="content-header">
                        Lesson 1. Start of course
                    </header>
                    <div className="video-player-wrapper">
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
