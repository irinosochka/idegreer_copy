import React, {FC, useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {getCoursesOfAuthor} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import CourseItem from "../../CourseItem/CourseItem";
import {IUser} from "../../../models/IUser";
import ManageCourse from "./ManageCourse/ManageCourse";

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
        <>
            {visibleList && <div className="courses__container">
                {courses.map((course: ICourse) => {
                        return <div onClick={() => {
                                handleSelecting(course)
                            }} style={{cursor: 'pointer'}}>
                                <CourseItem key={course._id} course={course}/>
                            </div>
                    }
                )}
            </div>}
            {visibleEditPanel && selectedCourse && <ManageCourse selectedCourse={selectedCourse}/>}
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.authorCourses,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {getCoursesOfAuthor})(ProfessorCourses);