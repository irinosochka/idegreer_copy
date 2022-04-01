import React, {FC, useEffect} from 'react';
import LessonList from "../components/CourseItem/Lesson/LessonList";
import {useParams} from "react-router-dom";
import {getOneCourse} from "../reduxStore/course-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../reduxStore/store";
import {ICourse} from "../models/ICourse";
import Button from "../common/button/Button";
import './coursePage.css'
import {actions} from "../reduxStore/auth-reducer";
import {actions as lectionActions, getAllLectionsFromCourse} from "../reduxStore/lection-reducer";
import {ILection} from "../models/ILection";

interface CoursePage {
    getOneCourse: (courseId: string) => void,
    course: ICourse,
    setLoading: (bool: boolean) => void,
    isLoading: boolean,
    getAllLectionsFromCourse: (courseId: string) => void,
    setLection: () => void,
    lections: ILection[],
}

const CoursePage: FC<CoursePage> = ({
                                        course,
                                        lections,
                                        getOneCourse
                                    }) => {
    const {id} = useParams();
    useEffect(() => {
        if (id) {
            getOneCourse(id)
        }
    }, []);

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
                    {course.author && <div>Course author: {course.author.name}</div>}
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

                <LessonList lessons={lections}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        course: state.course.course,
        isLoading: state.auth.isLoading,
        lections: state.lection.lections
    }
}

export default connect(mapStateToProps, {
    setLection: lectionActions.setLections,
    setLoading: actions.setLoading,
    getOneCourse,
    getAllLectionsFromCourse
})(CoursePage);
