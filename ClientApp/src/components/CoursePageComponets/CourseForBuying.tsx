import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../reduxStore/auth-reducer";
import { getAllLectionsFromCourse } from "../../reduxStore/lection-reducer";
import {ICourse} from "../../models/ICourse";
import {ILection} from "../../models/ILection";
import {AppStateType} from "../../reduxStore/store";
import {addUserToCourse, getAllMembersFromCourse, getOneCourse} from "../../reduxStore/course-reducer";

import backIcon from "../../assets/img/back-svgrepo-com.svg"

import "./course.css"

import {useNavigate, useParams} from "react-router-dom";

import progIcon from "../../assets/img/programmingIcon.svg";

interface CourseProps {
    course: ICourse,
    getOneCourse: (courseId: string) => void,
    getAllLectionsFromCourse: (courseId: string) => void,
    lections: ILection[],
    getAllMembersFromCourse: (courseId: string) => void,
}

const CourseForBuying: FC<CourseProps> = ({
                                             course,
                                             lections,
                                             getOneCourse,
                                             getAllLectionsFromCourse,
                                         }) => {

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

    return (
        <div className="user_course" style={{marginLeft: '20px'}}>
            <div className="back__container" onClick={handleClose} style={{marginTop: '10px'}}>
                <img src={backIcon} onClick={() => navigate(-1)} alt=""/>
            </div>

            <div className="course__container">
                <div className="programming-icon__container">
                    <img className="programming-icon" src={progIcon} alt=""/>
                </div>

                <div style={{display: "flex", justifyContent: 'space-between', marginTop: '20px'}}>
                    <div style={{width: '600px'}}>
                        <h1 className="course-title">{course.title}</h1>
                        <p className="course-description">{course.description}</p>
                        <div className="info">
                            <h3>Type: </h3>
                            <p>{course.theme}</p>
                        </div>
                        <div className="info">
                            <h3>Mentor: </h3>
                            <p>{course.author.name}</p>
                        </div>
                    </div>
                    <div>
                        <div className="info-container">
                            <h3>Price: </h3>
                            <p>$ {course.price}</p>
                        </div>
                        <div className="info-container">
                            <h3>Rate: </h3>
                            <p>★ 4.8</p>
                        </div>
                        <div className="info-container">
                            <h3>Lectures: </h3>
                            <p>{lections.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="course-info__container">*/}
            {/*    <h2>{course.title}</h2>*/}
            {/*    <div className="evaluation">*/}
            {/*        <span>★★★★★</span>*/}
            {/*        <p style={{marginLeft: '8px'}}>5/5 (236 reviews)</p>*/}
            {/*    </div>*/}
            {/*    <div className="mentor-info">*/}
            {/*        <PhotoMockup size={sizeTypes.small}/>*/}
            {/*        <div style={{marginLeft: '10px'}}>*/}
            {/*            <p>Mentor</p>*/}
            {/*            {course.author && <h4>{course.author.name}</h4>}*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <hr style={{width: '300px'}}/>*/}

            {/*</div>*/}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        isLoading: state.auth.isLoading,
        lections: state.lection.lections,
    }
}

export default connect(mapStateToProps, {
    setLoading: authActions.setLoading,
    getOneCourse,
    getAllLectionsFromCourse,
    addUserToCourse,
    getAllMembersFromCourse,
})(CourseForBuying);
