import React, {FC, useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {getCoursesOfAuthor} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import CourseItem from "../../CourseItem/CourseItem";
import {IUser} from "../../../models/IUser";
import ManageCourse from "./ManageCourse";

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
        <div style={{background: '#fff', borderRadius: '10px', padding: '20px'}}>
            <h3 style={{fontWeight: '400', letterSpacing: '2px', fontSize: '24px', textAlign: 'center'}}>You are the Author of this courses:</h3>
            {visibleList && <div className="courses__container" style={{marginTop: '-30px', paddingLeft: '65px'}}>
                {courses.length !== 0 ? courses.map((course: ICourse) => {
                        return <div key={course._id}
                            onClick={() => {
                                handleSelecting(course)
                            }} style={{cursor: 'pointer'}}>
                                <CourseItem key={course._id} course={course}/>
                            </div>
                    }
                ) : 'No courses'}
            </div>}
            {visibleEditPanel && selectedCourse && <ManageCourse selectedCourse={selectedCourse} setVisibleEditPanel={setVisibleEditPanel} setVisibleList={setVisibleList}/>}
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
