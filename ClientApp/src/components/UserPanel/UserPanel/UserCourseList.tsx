import React, {FC} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {ICourse} from "../../../models/ICourse";
import CourseItem from "../../CourseItem/CourseItem";
import {NavLink} from "react-router-dom";

interface UserCourseListProps {
    courses: ICourse[],
}

const UserCourseList: FC<UserCourseListProps> = ({courses}) => {


    return (
        <div style={{background: '#fff', borderRadius: '10px', padding: '20px'}}>
            <h3 style={{fontWeight: '400', letterSpacing: '2px', fontSize: '24px', textAlign: 'center'}}>Your Courses:</h3>
            <div className="courses__container" style={{marginTop: '-30px', paddingLeft: '65px'}}>
                {courses.length !== 0 ? courses.map((course: ICourse) => {
                        return <NavLink key={course._id} to={`/course/${course._id}`}><CourseItem course={course} /></NavLink>
                    }
                ) : <div style={{marginTop: '70px', width: '100%'}}>
                    <h3 style={{fontWeight: 'inherit', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>You don't have a course.
                            Buy it
                        for starting learning new programing language now.</h3>
                    </div>}
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.userCourses
    }
}

export default connect(mapStateToProps, {})(UserCourseList);
