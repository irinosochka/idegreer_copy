import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../reduxStore/auth-reducer";
import {actions as courseActions} from "../../reduxStore/course-reducer";
import {
    actions as lectionActions,
    addHomeworkResponse,
    getAllLectionsFromCourse
} from "../../reduxStore/lection-reducer";
import YouTube from "react-youtube";
import {ICourse} from "../../models/ICourse";
import {ILection} from "../../models/ILection";
import {AppStateType} from "../../reduxStore/store";
import {addUserToCourse, getOneCourse} from "../../reduxStore/course-reducer";
import PhotoMockup, {sizeTypes} from "../../common/photoMockup/PhotoMockup";

import backIcon from "../../assets/img/back-svgrepo-com.svg"
import LectureList from "../../components/CourseItem/Lecture/LectureList";

import "./course.css"
import Button from "../../common/button/Button";
import {IUser} from "../../models/IUser";
import {useNavigate} from "react-router-dom";
import Message, {MessageType} from "../../common/Messages/Message";

interface UserCourseProps {
    authUser: IUser,
    course: { course: ICourse, author: IUser },
    setLection: () => void,
    setCourse: (course: { course: ICourse, author: IUser }) => void,
    lections: ILection[],
    addHomeworkResponse: (userId: string, courseId: string, lectionId: string, resp: string) => void,
    getAllLectionsFromCourse: (courseId: string) => void,
    getOneCourse: (courseId: string) => void,
}

const UserCourse: FC<UserCourseProps> = ({
                                             course,
                                             authUser,
                                             setCourse,
                                             lections,
                                             addHomeworkResponse,
                                             getAllLectionsFromCourse,
                                             getOneCourse
                                         }) => {
    const [activeLection, setActiveLection] = useState<ILection | null>(lections[0]);
    const [homeworkText, setHomeworkText] = useState('');
    const [isError, setError] = useState(false);
    const [sentHomework, setSentHomework] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (course) {
            getOneCourse(course.course._id)
            getAllLectionsFromCourse(course.course._id);
        }
        return () => setCourse({course: {} as ICourse, author: {} as IUser})
    }, [])

    const handleClose = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onHomeworkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (authUser && course && activeLection && homeworkText.length !== 0) {
            addHomeworkResponse(authUser._id, course.course._id, activeLection._id, homeworkText);
            setSentHomework(true);
        } else {
            setError(true);
        }
    }

    const initial = () => {
        if (course && course.author && course.author.name) {
            const splits = course.author.name.split(" ");
            let stringResult = "";

            for (let i = 0; i < splits.length; i++) {
                let name = splits[i];
                let first = name.substr(0, 1).toUpperCase();
                stringResult += first;
            }
            return stringResult;
        }
    };

    return (
        <div className="user_course">
            <div className="back__container" onClick={handleClose}>
                <img src={backIcon} onClick={() => navigate(-1)} alt=""/>
            </div>

            <div className="course-info__container">
                <h2>{course.course && course.course.title}</h2>
                {/*<div className="evaluation">*/}
                {/*    <span>★★★★★</span>*/}
                {/*    <p style={{marginLeft: '8px'}}>5/5 (236 reviews)</p>*/}
                {/*</div>*/}
                <div className="mentor-info">
                    {/*<PhotoMockup size={sizeTypes.small}/>*/}

                    <div className='professor__icon'>
                        <h2 style={{margin: 'auto', color: '#e6ebff', fontWeight: 400}}>
                            {initial()}
                        </h2>
                    </div>

                    <div style={{marginLeft: '10px'}}>
                        <p>Mentor</p>
                        {course.author && <h4>{course.author.name}</h4>}
                    </div>
                </div>

                {activeLection && <div className="lecture-description">
                    {activeLection.description}
                </div>}


                <hr style={{width: '300px'}}/>

                <LectureList lessons={lections} setActiveLection={setActiveLection}/>
            </div>

            <div className="lecture-player__container">
                {activeLection &&
                    <div>
                        <h2 style={{textAlign: 'center'}}>{activeLection.title}</h2>
                        <div style={{marginBottom: '20px'}}>
                            <YouTube videoId={activeLection?.link}/>
                        </div>

                        <hr/>
                        <div className="homework">
                            <div className='professor__icon' style={{marginRight: '10px'}}>
                                <h2 style={{margin: 'auto', color: '#e6ebff', fontWeight: 400}}>
                                    {initial()}
                                </h2>
                            </div>

                            <div>
                                {course.author &&
                                    <h3>
                                        {course.author.name}
                                    </h3>}
                                <p>
                                    {activeLection.homework}
                                </p>
                            </div>
                        </div>

                        <div className="add-homework">
                            <div style={{marginRight: '10px'}}>
                                <PhotoMockup size={sizeTypes.small}/>
                            </div>
                            {!sentHomework &&
                                <form onSubmit={onHomeworkSubmit}>
                                    {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                                    <div className="input-wrapper" style={{marginTop: '10px'}}>
                                     <textarea className="form-control"
                                               onChange={(event) => {
                                                   setHomeworkText(event.target.value)
                                               }}
                                               value={homeworkText}
                                               name="textarea"
                                               id="homework_text"
                                               placeholder='Enter your homework'
                                     />
                                    </div>
                                    <Button>Submit</Button>
                                </form>
                            }
                            {sentHomework &&
                                <div className="message-sentHomework" style={{marginTop: '10px'}}>
                                    Homework was sent
                                </div>
                            }
                        </div>
                    </div>}
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        isLoading: state.auth.isLoading,
        lections: state.lection.lections,
        course: state.course.course,
        addUserToCourseSuccess: state.course.addUserToCourseSuccess,
        addUserToCourseError: state.course.addUserToCourseError,
    }
}

export default connect(mapStateToProps, {
    setLection: lectionActions.setLections,
    setLoading: authActions.setLoading,
    addUserToCourse,
    addHomeworkResponse,
    getAllLectionsFromCourse,
    getOneCourse,
    setCourse: courseActions.setCourse
})(UserCourse);
