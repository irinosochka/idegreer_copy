import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../../../reduxStore/auth-reducer";
import {actions as lectionActions, getAllLectionsFromCourse} from "../../../../reduxStore/lection-reducer";
import YouTube from "react-youtube";
import {ICourse} from "../../../../models/ICourse";
import {ILection} from "../../../../models/ILection";
import {AppStateType} from "../../../../reduxStore/store";
import {addUserToCourse, getAllMembersFromCourse, getOneCourse} from "../../../../reduxStore/course-reducer";
import PhotoMockup, {sizeTypes} from "../../../../common/photoMockup/PhotoMockup";

import backIcon from "../../../../assets/img/back-svgrepo-com.svg"
import LectureList from "../../../CourseItem/Lecture/LectureList";

import "./userCourse.css"

interface UserCourseProps {
    getOneCourse: (courseId: string) => void,
    getAllLectionsFromCourse: (courseId: string) => void,
    setLection: () => void,
    lections: ILection[],
    getAllMembersFromCourse: (courseId: string) => void,
    selectedCourse: ICourse,
    setVisibleEditPanel: (bool: boolean) => void,
    setVisibleList: (bool: boolean) => void
}

const UserCourse: FC<UserCourseProps> = ({
                                        lections,
                                        getOneCourse,
                                        getAllLectionsFromCourse,
                                             selectedCourse,  setVisibleEditPanel, setVisibleList
                                    }) => {
    const [activeLection, setActiveLection] = useState<ILection | null>();
    const [homeworkText, setHomeworkText] = useState('');


    useEffect(() => {
        if (selectedCourse) {
            getOneCourse(selectedCourse._id);
            getAllLectionsFromCourse(selectedCourse._id);
        }
    }, []);


    const handleClose = (event: any) => {
        event.preventDefault();
        setVisibleEditPanel(false);
        setVisibleList(true);
    };

    return (
         <div className="user_course">
             <div className="back__container" onClick={handleClose}>
                 <img src={backIcon} alt=""/>
             </div>

             <div className="course-info__container">
                 <h2>{selectedCourse.title}</h2>
                 <div className="evaluation">
                     <span>★★★★★</span>
                     <p style={{marginLeft: '8px'}}>5/5 (236 reviews)</p>
                 </div>
                 <div className="mentor-info">
                     <PhotoMockup size={sizeTypes.small}/>
                     <div style={{marginLeft: '10px'}}>
                         <p>Mentor</p>
                         {selectedCourse.author && <h4>{selectedCourse.author.name}</h4>}
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
                     <div style={{ marginBottom: '20px'}}>
                         <YouTube videoId={activeLection?.link}/>
                     </div>

                     <hr/>
                     <div className="homework">
                         <div style={{marginRight: '10px'}}>
                             <PhotoMockup size={sizeTypes.small}/>
                         </div>

                         <div>
                             {selectedCourse.author &&
                             <h3>
                                 {selectedCourse.author.name}
                             </h3>}
                             <p>
                                 Curabitur nunc ipsum, venenatis et molestie in, tristique eu velit. In hac habitasse platea dictumst. Integer id volutpat mi. Ut hendrerit lorem a ullamcorper iaculis.
                             </p>
                         </div>
                     </div>

                     <div className="add-homework">
                         <div style={{marginRight: '10px'}}>
                             <PhotoMockup size={sizeTypes.small}/>
                         </div>
                         <form>
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
                         </form>
                     </div>
                 </div>}
             </div>
         </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isLoading: state.auth.isLoading,
        lections: state.lection.lections,
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
    getAllMembersFromCourse
})(UserCourse);
