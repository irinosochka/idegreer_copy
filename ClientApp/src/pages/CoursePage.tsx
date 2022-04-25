import React, {FC, useEffect, useState} from 'react';
import LessonList from "../components/CourseItem/Lesson/LessonList";
import {useParams} from "react-router-dom";
import {addUserToCourse, getAllMembersFromCourse, getOneCourse} from "../reduxStore/course-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../reduxStore/store";
import {ICourse} from "../models/ICourse";
import Button from "../common/button/Button";
import './coursePage.css'
import {actions} from "../reduxStore/auth-reducer";
import {actions as lectionActions, getAllLectionsFromCourse} from "../reduxStore/lection-reducer";
import {ILection} from "../models/ILection";
import YouTube from "react-youtube";
import {IUser} from "../models/IUser";
import Message, {MessageType} from "../common/Messages/Message";

interface CoursePage {
    getOneCourse: (courseId: string) => void,
    course: ICourse,
    getAllLectionsFromCourse: (courseId: string) => void,
    setLection: () => void,
    lections: ILection[],
    authUser: IUser,
    addUserToCourse: (courseId: string, userId: string) => void,
    addUserToCourseError: boolean,
    addUserToCourseSuccess: boolean,
    getAllMembersFromCourse: (courseId: string) => void,
}

const CoursePage: FC<CoursePage> = ({
                                        authUser,
                                        course,
                                        lections,
                                        getOneCourse,
                                        getAllLectionsFromCourse,
                                        addUserToCourse,
                                        addUserToCourseSuccess,
                                        addUserToCourseError,
                                        getAllMembersFromCourse,
                                    }) => {
    const [activeLection, setActiveLection] = useState<ILection | null>();
    const [visibleButton, setVisibleButton] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getOneCourse(id);
            getAllLectionsFromCourse(id);
        }
    }, []);

    useEffect(() => {
       getAllMembersFromCourse(course._id);
    }, [course])

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
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="course__author" style={{marginTop: '30px'}}>
                        {course.author && <div>Course author: {course.author.name}</div>}
                    </div>
                    {course.author && authUser._id !== course.author._id && <div className="course__price">
                        <h2>Price: ${course.price}</h2>
                        {authUser._id === course._id ? visibleButton : !visibleButton && <Button onClick={() => {
                            addUserToCourse(course._id, authUser._id);
                        }}>Add to cart</Button>}
                    </div>}
                </div>
                <div style={{width: '300px', margin: '0 auto'}}>
                    {addUserToCourseSuccess && <Message type={MessageType.SUCCESS}>The course has been added</Message>}
                    {addUserToCourseError && <Message type={MessageType.ERROR}>The course hasn't been added</Message>}
                </div>
            </div>

            <div className="video-lesson-content">
                <LessonList lessons={lections} setActiveLection={setActiveLection}/>
                <div className="video-player-container">
                    {activeLection && <header className="content-header">
                        {activeLection?.title}
                    </header>}
                    {activeLection &&<div className="video-player-wrapper">
                        <YouTube videoId={activeLection?.link} />;
                    </div>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        course: state.course.course,
        isLoading: state.auth.isLoading,
        lections: state.lection.lections,
        addUserToCourseSuccess: state.course.addUserToCourseSuccess,
        addUserToCourseError: state.course.addUserToCourseError,
    }
}

export default connect(mapStateToProps, {
    setLection: lectionActions.setLections,
    setLoading: actions.setLoading,
    getOneCourse,
    getAllLectionsFromCourse,
    addUserToCourse,
    getAllMembersFromCourse
})(CoursePage);
