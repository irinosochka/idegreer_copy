import React, {FC, useEffect} from 'react';
import {AppStateType} from "../reduxStore/store";
import {connect} from "react-redux";
import {getOneCourse} from "../reduxStore/course-reducer";
import backIcon from "../assets/img/back-svgrepo-com.svg";
import {useNavigate, useParams} from "react-router-dom";
import './coursePage.css'
import {ILection} from "../models/ILection";
import {actions, getAllLectionsFromCourse, getMembersWithHomework} from "../reduxStore/lection-reducer";
import HomeworksMembersListItem from "./HomeworksMembersListItem";

interface HomeworksProps {
    getOneCourse: (courseId: string) => void,
    getAllLectionsFromCourse: (courseId: string) => void,
    lections: ILection[],
    setLections: () => void,
    getMembersWithHomework: (courseId: string, lectionId: string) => void
}

const HomeworksPageOfProfessor: FC<HomeworksProps> = ({
                                                          getAllLectionsFromCourse,
                                                          lections,
                                                          getOneCourse,
                                                          setLections,
                                                      }) => {

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


    return (
        <div style={{display: 'flex'}}>
            <div style={{paddingTop: '30px', paddingLeft: '20px', width: '25px', cursor: 'pointer'}}>
                <img src={backIcon} onClick={() => navigate(-1)} alt=""/>
            </div>
            <div className="user__container" style={{background: '#fff', borderRadius: '10px', padding: '40px'}}>
                <h3 className="page__title">Homeworks List:</h3>
                <ol className="rounded-list">{lections.length !== 0 ? lections.map((lection: ILection) => {
                    return <div key={lection._id}><HomeworksMembersListItem lection={lection}   /></div>
                }) : 'No lectures'}</ol>
            </div>

        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        lections: state.lection.lections,
        setLections: actions.setLections
    }
}

export default connect(mapStateToProps, {
    getOneCourse,
    getAllLectionsFromCourse,
    getMembersWithHomework
})(HomeworksPageOfProfessor);
