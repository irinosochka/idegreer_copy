import React, {FC, useEffect, useState} from 'react';
import {AppStateType} from "../reduxStore/store";
import {connect} from "react-redux";
import {getCoursesOfAuthor} from "../reduxStore/course-reducer";
import {ICourse} from "../models/ICourse";
import {IUser} from "../models/IUser";
import backIcon from "../assets/img/back-svgrepo-com.svg";
import checkIcon from "../assets/img/check-svgrepo-com.svg"
import {useNavigate} from "react-router-dom";
import './coursePage.css'
import CheckHomeworkModal from "../components/UserPanel/ProfessorPanel/CheckHomeworkModal";

interface HomeworksProps {
    authUser: IUser,
    courses: Array<{ course: ICourse, author: IUser }>,
    getCoursesOfAuthor: (authorId: string) => void
}

const HomeworksPageOfProfessor: FC<HomeworksProps> = ({courses, getCoursesOfAuthor, authUser}) => {
    const navigate = useNavigate();
    const [showHomeworks, setShowHomeworks] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getCoursesOfAuthor(authUser._id);
    }, [])

    const handleHomework = () => {
        showHomeworks ? setShowHomeworks(false) : setShowHomeworks(true);
    }


    return (
        <div style={{display: 'flex'}}>
            <div style={{paddingTop: '30px', paddingLeft: '20px', width: '25px', cursor: 'pointer'}}>
                <img src={backIcon} onClick={() => navigate(-1)} alt=""/>
            </div>
            <div className="user__container"  style={{background: '#fff', borderRadius: '10px', padding: '40px'}}>
                <h3 className="page__title">Homeworks List:</h3>

                <ol className="rounded-list">
                    <li>Lecture 1</li>
                    <li onClick={()=> handleHomework()}>Lecture 2
                        { showHomeworks && <ol>
                            <li onClick={()=> setShowModal(true)}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p>Iryna Novoselska</p>
                                    <img className="check-icon" src={checkIcon} alt=""/>
                                </div>
                            </li>
                            <li>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p>Vadym Hvozditskyi</p>
                                    {/*<img className="check-icon" src={checkIcon} alt=""/>*/}
                                </div>
                            </li>
                            <li>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p>Oleksandr Matushevskyi</p>
                                    <img className="check-icon" src={checkIcon} alt=""/>
                                </div>
                            </li>
                        </ol> }
                    </li>
                    <li>Lecture 3</li>
                </ol>

            </div>

            <CheckHomeworkModal active={showModal} setActive={setShowModal}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.authorCourses,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {getCoursesOfAuthor})(HomeworksPageOfProfessor);
