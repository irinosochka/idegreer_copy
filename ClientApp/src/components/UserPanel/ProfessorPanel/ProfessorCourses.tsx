import React, {FC, useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {getCoursesOfAuthor} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import {IUser} from "../../../models/IUser";
import ManageCourse from "./ManageCourse";
import './ProfessorPanel.css'
import ProfessorCourseItem from "./ProfessorCourseItem";

interface ProfessorCoursesProps {
    authUser: IUser,
    courses: ICourse[],
    getCoursesOfAuthor: (authorId: string) => void
}

const ProfessorCourses: FC<ProfessorCoursesProps> = ({courses, getCoursesOfAuthor, authUser}) => {
    const [selectedCourse, setSelectedCourse] = useState<ICourse>();
    const [visibleList, setVisibleList] = useState(true);
    const [visibleEditPanel, setVisibleEditPanel] = useState(false);


    useEffect(() => {
        getCoursesOfAuthor(authUser._id);
    }, [])

    const handleSelecting = (course: ICourse) => {
        setVisibleList(false);
        setVisibleEditPanel(true);
        setSelectedCourse(course);
    }

    return (
        <div className="page__content">
            <h3 className="page__title">You are the Author of this courses:</h3>
            {visibleEditPanel && selectedCourse && <ManageCourse selectedCourse={selectedCourse} setVisibleEditPanel={setVisibleEditPanel} setVisibleList={setVisibleList}/>}

            { visibleList && courses.length !==0 &&
                <table className="table">
                    <tr>
                        <th className="table__heading">Course name</th>
                        <th className="table__heading">Rate</th>
                        <th className="table__heading">Type</th>
                        <th className="table__heading">Members</th>
                        <th className="table__heading">Lectures</th>
                    </tr>
                    {courses.map((course: ICourse) => {
                    return <ProfessorCourseItem key={course._id} courseItem={course} onClick={() => handleSelecting(course)} />
                    })
                    }
                </table>
            }
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.authorCourses,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {getCoursesOfAuthor})(ProfessorCourses);
