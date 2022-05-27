import React, {FC, useState} from 'react';
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {ICourse} from "../../models/ICourse";
import CourseItem from "../../components/CourseItem/CourseItem";
import {NavLink} from "react-router-dom";

interface UserCourseListProps {
    courses: ICourse[],
}

const UserCourseListPage: FC<UserCourseListProps> = ({courses}) => {
    const [visibleList, setVisibleList] = useState(true);

    const handleSelecting = () => {
        setVisibleList(false);
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
                                        handleSelecting()
                                    }} style={{cursor: 'pointer'}}>
                           <NavLink to={`/course/${course._id}`} ><CourseItem key={course._id} course={course}/></NavLink>
                        </div>
                        // return <NavLink key={course._id} to={`/course/${course._id}`}><CourseItem course={course} /></NavLink>
                    }
                ) : <div style={{marginTop: '70px', width: '100%'}}>
                    <h3 className="no-courses__info">You don't have a course. Buy it for starting learning new programing language now.</h3>
                </div>}
            </div>
            </>
            }
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.userCourses
    }
}

export default connect(mapStateToProps, {})(UserCourseListPage);
