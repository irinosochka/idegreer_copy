import React, {FC, useEffect} from 'react';
import {AppStateType} from "../reduxStore/store";
import {connect} from "react-redux";
import {getCoursesOfAuthor} from "../reduxStore/course-reducer";
import {ICourse} from "../models/ICourse";
import {IUser} from "../models/IUser";
import '../components/UserPanel/ProfessorPanel/ProfessorPanel.css'
import ProfessorCourseItem from "../components/UserPanel/ProfessorPanel/ProfessorCourseItem";

interface ProfessorCoursesProps {
    authUser: IUser,
    courses: ICourse[],
    getCoursesOfAuthor: (authorId: string) => void
}

const CoursesPageOfProfessor: FC<ProfessorCoursesProps> = ({courses, getCoursesOfAuthor, authUser}) => {

    useEffect(() => {
        getCoursesOfAuthor(authUser._id);
    }, [])

    return (
        <div className="page__content">
            <h3 className="page__title">You are the Author of this courses:</h3>

            { courses.length !==0 &&
                <table className="table">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <th className="table__heading">Course name</th>
                        <th className="table__heading">Rate</th>
                        <th className="table__heading">Type</th>
                        <th className="table__heading">Members</th>
                        <th className="table__heading">Lectures</th>
                    </tr>
                    {courses.map((course: ICourse) => {
                        return <ProfessorCourseItem key={course._id} courseItem={course} />
                    })
                    }
                </table>}
            { courses.length ===0 &&
                <div style={{marginTop: '40px', width: '100%'}}>
                    <h3 className="no-courses__info">You don't have a course. Add new course for starting teach in our platform.</h3>
                </div>}
                    </tbody>
                    <tfoot></tfoot>
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

export default connect(mapStateToProps, {getCoursesOfAuthor})(CoursesPageOfProfessor);
