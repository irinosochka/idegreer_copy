import React, {FC, useEffect, useState} from 'react';
import {AppStateType} from "../reduxStore/store";
import {connect} from "react-redux";
import {getOneCourse} from "../reduxStore/course-reducer";
import backIcon from "../assets/img/back-svgrepo-com.svg";
import {useNavigate, useParams} from "react-router-dom";
import './coursePage.css'
import CheckHomeworkModal from "../components/UserPanel/ProfessorPanel/CheckHomeworkModal";
import {ILection} from "../models/ILection";
import {actions, getAllLectionsFromCourse} from "../reduxStore/lection-reducer";

interface HomeworksProps {
    getOneCourse: (courseId: string) => void,
    getAllLectionsFromCourse: (courseId: string) => void,
    lections: ILection[],
    setLections: () => void
}

const HomeworksPageOfProfessor: FC<HomeworksProps> = ({
                                                          getAllLectionsFromCourse,
                                                          lections,
                                                          getOneCourse,
                                                          setLections
                                                      }) => {
    const [showHomeworks, setShowHomeworks] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedLection, setSelectedLection] = useState<ILection>();

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getOneCourse(id)
            getAllLectionsFromCourse(id);
        }
    }, [])


    useEffect(() => {
        setLections()
    }, [id])


    const handleHomework = () => {
        showHomeworks ? setShowHomeworks(false) : setShowHomeworks(true);
    }

    const handleShowModal = (lection: ILection) => {
        setSelectedLection(lection);
        setShowModal(true);
    }


    return (
        <div style={{display: 'flex'}}>
            <div style={{paddingTop: '30px', paddingLeft: '20px', width: '25px', cursor: 'pointer'}}>
                <img src={backIcon} onClick={() => navigate(-1)} alt=""/>
            </div>
            <div className="user__container"  style={{background: '#fff', borderRadius: '10px', padding: '40px'}}>
                <h3 className="page__title">Homeworks List:</h3>


                <ol className="rounded-list">{lections.length !== 0 ? lections.map((lection: ILection) => {
                    return <li
                               key={lection._id}
                               onClick={() =>
                                   handleShowModal(lection)
                               }
                    >{lection.title}</li>
                }) : 'No lectures'}</ol>

                {/*<ol className="rounded-list">*/}
                {/*    <li>Lecture 1</li>*/}
                {/*    <li onClick={()=> handleHomework()}>Lecture 2*/}
                {/*        { showHomeworks && <ol>*/}
                {/*            <li onClick={()=> setShowModal(true)}>*/}
                {/*                <div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                {/*                    <p>Iryna Novoselska</p>*/}
                {/*                    <img className="check-icon" src={checkIcon} alt=""/>*/}
                {/*                </div>*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                {/*                    <p>Vadym Hvozditskyi</p>*/}
                {/*                    /!*<img className="check-icon" src={checkIcon} alt=""/>*!/*/}
                {/*                </div>*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                {/*                    <p>Oleksandr Matushevskyi</p>*/}
                {/*                    <img className="check-icon" src={checkIcon} alt=""/>*/}
                {/*                </div>*/}
                {/*            </li>*/}
                {/*        </ol> }*/}
                {/*    </li>*/}
                {/*    <li>Lecture 3</li>*/}
                {/*</ol>*/}

            </div>

            {selectedLection && <CheckHomeworkModal active={showModal} setActive={setShowModal} selectedLection={selectedLection} />}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        lections: state.lection.lections,
        setLections: actions.setLections
    }
}

export default connect(mapStateToProps, {getOneCourse, getAllLectionsFromCourse})(HomeworksPageOfProfessor);
