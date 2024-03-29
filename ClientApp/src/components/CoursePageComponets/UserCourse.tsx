import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../reduxStore/auth-reducer";
import {actions as courseActions} from "../../reduxStore/course-reducer";
import {
    actions as lectionActions,
    addHomeworkResponse,
    getAllLectionsFromCourse, getHomeworkResponse
} from "../../reduxStore/lection-reducer";
import YouTube from "react-youtube";
import {ICourse} from "../../models/ICourse";
import {ILection} from "../../models/ILection";
import {AppStateType} from "../../reduxStore/store";
import {addUserToCourse} from "../../reduxStore/course-reducer";
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
    homeworkResponse: any,
    setCourse: (course: { course: ICourse, author: IUser }) => void,
    clearHomeworkResponse: () => void
    lections: ILection[],
    addHomeworkResponse: (userId: string, courseId: string, lectionId: string, resp: string) => void,
    getAllLectionsFromCourse: (courseId: string) => void,
    getHomeworkResponse: (userId: string, courseId: string, lectionId: string) => void
}

const UserCourse: FC<UserCourseProps> = ({
                                             course,
                                             authUser,
                                             setCourse,
                                             homeworkResponse,
                                             lections,
                                             addHomeworkResponse,
                                             clearHomeworkResponse,
                                             getAllLectionsFromCourse,
                                             getHomeworkResponse
                                         }) => {
    const [activeLection, setActiveLection] = useState<ILection | null>(lections[0]);
    const [homeworkText, setHomeworkText] = useState('');
    const [isError, setError] = useState(false);
    const [sentHomework, setSentHomework] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (course && course.course._id && activeLection) {
            getAllLectionsFromCourse(course.course._id);
            getHomeworkResponse(authUser._id, course.course._id, activeLection._id)
        }
        return  () =>
            setCourse({course: {} as ICourse, author: {} as IUser});
    }, [])

    useEffect(() => {
        if (activeLection) {
            getHomeworkResponse(authUser._id, course.course._id, activeLection._id)
        }
        return () => {
            clearHomeworkResponse();
        }
    }, [activeLection])


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
                                <h2 style={{margin: 'auto', color: '#e6ebff', fontWeight: 400, width: '50px',display: 'flex', justifyContent: 'center'}}>
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

                        {!homeworkResponse && <div className="add-homework">
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
                        </div>}
                        {homeworkResponse && <div>
                            <div className="add-homework" style={{alignItems: 'center'}}>
                                <div style={{marginRight: '10px'}}>
                                    <PhotoMockup size={sizeTypes.small}/>
                                </div>
                                <div className="message-sentHomework" style={{padding: '15px'}}>
                                    {homeworkResponse.response}
                                </div>
                            </div>
                                <p style={{marginLeft: '115px',marginTop: '10px'}}>
                                    {homeworkResponse.mark ? `Work was checked by professor and you have got ${homeworkResponse.mark}` : `Work have not checked yet`}
                                </p>
                                {/*Your answer was: {homeworkResponse.response}. {homeworkResponse.mark ? `Work was checked by professor and you have got ${homeworkResponse.mark}` : `Work have not checked yet`}*/}

                        </div> }
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
        addUserToCourseSuccess: state.course.addUserToCourseSuccess,
        addUserToCourseError: state.course.addUserToCourseError,
        homeworkResponse: state.lection.homeworkResponse
    }
}

export default connect(mapStateToProps, {
    setLection: lectionActions.setLections,
    setLoading: authActions.setLoading,
    addUserToCourse,
    addHomeworkResponse,
    getAllLectionsFromCourse,
    setCourse: courseActions.setCourse,
    getHomeworkResponse,
    clearHomeworkResponse: lectionActions.clearHomeworkResponse
})(UserCourse);
