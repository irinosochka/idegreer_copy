import React, {FC} from 'react';
import {connect} from "react-redux";
import {actions as authActions} from "../../reduxStore/auth-reducer";
import {getAllLectionsFromCourse} from "../../reduxStore/lection-reducer";
import {ICourse} from "../../models/ICourse";
import {ILection} from "../../models/ILection";
import {AppStateType} from "../../reduxStore/store";

import backIcon from "../../assets/img/back-svgrepo-com.svg"

import "./course.css"
import Button from "../../common/button/Button";
import {IUser} from "../../models/IUser";
import {useNavigate} from "react-router-dom";
import progIcon from "../../assets/img/programmingIcon.svg";
import {actions as userActions} from "../../reduxStore/user-reducer";

interface CourseProps {
    course: { course: ICourse, author: IUser },
    getAllLectionsFromCourse: (courseId: string) => void,
    lections: ILection[],
    addCourseToCart: (course: ICourse) => void,

}

const CourseForBuying: FC<CourseProps> = ({
                                              course,
                                              lections,
                                              addCourseToCart
                                          }) => {


    const navigate = useNavigate();

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
                        <h1 className="course-title">{course.course ? course.course.title : ''}</h1>
                        <p className="course-description">{course.course && course.course.description}</p>
                        <div className="info">
                            <h3>Type: </h3>
                            <p>{course.course && course.course.theme}</p>
                        </div>
                        <div className="info">
                            <h3>Mentor: </h3>
                            {course.author && <p>{course.author.name}</p>}
                        </div>
                        <Button onClick={() => {
                            addCourseToCart(course.course);
                        }}>Add to cart</Button>
                    </div>
                    <div>
                        <div className="info-container">
                            <h3>Price: </h3>
                            <p>$ {course.course && course.course.price}</p>
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
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isLoading: state.auth.isLoading,
        lections: state.lection.lections,
        course: state.course.course,
    }
}

export default connect(mapStateToProps, {
    setLoading: authActions.setLoading,
    getAllLectionsFromCourse,
    addCourseToCart: userActions.addCourseToCart,
})(CourseForBuying);

