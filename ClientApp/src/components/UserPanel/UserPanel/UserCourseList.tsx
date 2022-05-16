import React, {FC, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {ICourse} from "../../../models/ICourse";
import CourseItem from "../../CourseItem/CourseItem";
import UserCourse from "./UserCourse/UserCourse";

interface UserCourseListProps {
    courses: ICourse[],
}

const UserCourseList: FC<UserCourseListProps> = ({courses}) => {
    const [selectedCourse, setSelectedCourse] = useState<ICourse>();
    const [visibleList, setVisibleList] = useState(true);
    const [visibleEditPanel, setVisibleEditPanel] = useState(false);

    const handleSelecting = (course: ICourse) => {
        setVisibleList(false);
        setVisibleEditPanel(true);
        setSelectedCourse(course);
    }

    return (
        <div className="page__content">
            {visibleList &&
            <>
            <h3 className="page__title">Your Courses:</h3>
            <div className="courses__container" style={{marginTop: '-30px', paddingLeft: '65px'}}>
                {courses.length !== 0 ? courses.map((course: ICourse) => {
                        return <div key={course._id}
                                    onClick={() => {
                                        handleSelecting(course)
                                    }} style={{cursor: 'pointer'}}>
                            <CourseItem key={course._id} course={course}/>
                        </div>
                        // return <NavLink key={course._id} to={`/course/${course._id}`}><CourseItem course={course} /></NavLink>
                    }
                ) : <div style={{marginTop: '70px', width: '100%'}}>
                    <h3 className="no-courses__info">You don't have a course. Buy it for starting learning new programing language now.</h3>
                </div>}
            </div>
            </>
            }
            {visibleEditPanel && selectedCourse && <UserCourse selectedCourse={selectedCourse} setVisibleEditPanel={setVisibleEditPanel} setVisibleList={setVisibleList}/>}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.userCourses
    }
}

export default connect(mapStateToProps, {})(UserCourseList);
