import React, {FC, useEffect} from 'react';
import UserCart from "../components/UserPanel/UserCart";
import '../pages/cartPage.css';
import Button from "../common/button/Button";
import {connect} from "react-redux";
import {getCoursesOfUser} from "../reduxStore/course-reducer";
import {AppStateType} from "../reduxStore/store";
import {IUser} from "../models/IUser";
import {ICourse} from "../models/ICourse";

interface CartPageProps {
    authUser: IUser
}

const CartPage: FC<CartPageProps> = ({authUser}) => {

    useEffect(() => {
        getCoursesOfUser(authUser._id);
    }, [])


    return (
        <div className="shopping__cart">
            <div className="shopping__cart__header">
                <h3 className="cart_heading">Your shopping cart</h3>
                <h5 className="cart_action">Remove all</h5>
            </div>

            <UserCart/>

            <div className="shopping__cart__checkout">
                <div className="cart_total">
                    <div>
                        <div className="total">Total</div>
                        <div className="amount_items">99 items</div>
                    </div>

                    <div className="total_amount">$99.99</div>
                </div>
                <Button>Go to payment</Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        courses: state.course.userCourses,
    }
}

export default connect(mapStateToProps, {getCoursesOfUser})(CartPage);