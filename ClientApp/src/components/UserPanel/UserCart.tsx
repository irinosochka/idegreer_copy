import React, {FC, useEffect} from 'react';
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {getCoursesOfUser} from "../../reduxStore/course-reducer";
import {ICourse} from "../../models/ICourse";
import {IUser} from "../../models/IUser";
import {useNavigate} from "react-router-dom";
import CartItem from "../CourseItem/CartItem";

interface UserCourseListProps {
    authUser: IUser,
    courses: ICourse[],
    getCoursesOfUser: (userId: string) => void
}

const UserCourseList: FC<UserCourseListProps> = ({courses, getCoursesOfUser, authUser}) => {
    const navigator = useNavigate();

    useEffect(() => {
        getCoursesOfUser(authUser._id);
    }, [])

    return (
        <div>
            {courses.length !== 0 ? courses.map((course: ICourse) => {
                return <CartItem course={course}/>
                    // return <NavLink key={course._id} to={`/course/${course._id}`}><CartItem
                    //     course={course}/></NavLink>
                }
            ) : <div style={{marginTop: '70px', width: '100%'}}>
                <h3 style={{
                    fontWeight: 'inherit',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>Your cart is empty</h3>
            </div>}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.userCourses,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {getCoursesOfUser})(UserCourseList);
