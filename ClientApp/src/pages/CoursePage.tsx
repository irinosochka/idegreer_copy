import React, {useState} from 'react';
import LessonList from "../components/CourseItem/Lesson/LessonList";

const CoursePage = () => {
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
                <h1>Course name</h1>
            </div>
            <div className="about-course-wrapper">
                <div className="course__desc">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including versions of
                        Lorem Ipsum.</p>
                </div>
                <div className="course-details">
                    <div className="course__about">
                        <header>About course</header>
                    </div>
                    <div className="course__author">
                        <h3>Author</h3>
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

export default CoursePage;