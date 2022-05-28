import React, {FC, useEffect} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {getCoursesOfUser} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import {IUser} from "../../../models/IUser";
import CartItem from "./CartItem";

interface UserCourseListProps {
    authUser: IUser,
    getCoursesOfUser: (userId: string) => void,
    cartList: Array<ICourse>
}

const UserCourseList: FC<UserCourseListProps> = ({cartList, getCoursesOfUser, authUser}) => {

    useEffect(() => {
        getCoursesOfUser(authUser._id);
    }, [])

    return (
        <div>
            {cartList.length !== 0 ? cartList.map((course: ICourse) => {
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
        cartList: state.user.cartList,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {getCoursesOfUser})(UserCourseList);
