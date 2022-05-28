import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../reduxStore/auth-reducer";
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
import {useNavigate, useParams} from "react-router-dom";

interface UserCourseProps {
    authUser: IUser,
    course: ICourse,
    getOneCourse: (courseId: string) => void,
    getAllLectionsFromCourse: (courseId: string) => void,
    setLection: () => void,
    lections: ILection[],
    addHomeworkResponse: (userId: string, courseId: string, lectionId: string, resp: string) => void
}

const UserCourse: FC<UserCourseProps> = ({
                                                 course,
                                                 authUser,
                                                 lections,
                                                 getOneCourse,
                                                 getAllLectionsFromCourse,
                                                 addHomeworkResponse
                                             }) => {
    const [activeLection, setActiveLection] = useState<ILection | null>();
    const [homeworkText, setHomeworkText] = useState('');

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getOneCourse(id);
            getAllLectionsFromCourse(id);
        }
    }, []);


    const handleClose = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onHomeworkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (authUser && activeLection && homeworkText && id) {
            addHomeworkResponse(authUser._id, id, activeLection._id, homeworkText)
        }
    }

    return (
        <div className="user_course">
            <div className="back__container" onClick={handleClose}>
                <img src={backIcon} onClick={() => navigate(-1)} alt=""/>
            </div>

            <div className="course-info__container">
                <h2>{course.title}</h2>
                <div className="evaluation">
                    <span>★★★★★</span>
                    <p style={{marginLeft: '8px'}}>5/5 (236 reviews)</p>
                </div>
                <div className="mentor-info">
                    <PhotoMockup size={sizeTypes.small}/>
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
                        <div style={{marginRight: '10px'}}>
                            <PhotoMockup size={sizeTypes.small}/>
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
                        <form onSubmit={onHomeworkSubmit}>
                            <div className="input-wrapper" style={{margin: '0'}}>
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
    getOneCourse,
    getAllLectionsFromCourse,
    addUserToCourse,
    addHomeworkResponse
})(UserCourse);
