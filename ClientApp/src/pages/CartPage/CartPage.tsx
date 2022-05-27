import React, {FC, useEffect, useState} from 'react';
import UserCart from "../../components/Navbar/Cart/UserCart";
import './cartPage.css';
import Button from "../../common/button/Button";
import {connect} from "react-redux";
import {actions} from "../../reduxStore/user-reducer";
import {AppStateType} from "../../reduxStore/store";
import {ICourse} from "../../models/ICourse";
import {actions as courseActions, addUserToCourse} from "../../reduxStore/course-reducer";
import {IUser} from "../../models/IUser";
import Message, {MessageType} from "../../common/Messages/Message";
import ModalWindow from "../../components/Navbar/Cart/ModalWindow";

interface Props {
    removeAllCoursesFromCart: () => void,
    cartList: Array<ICourse>,
    addUserToCourse: (courseId: string, userId: string) => void,
    authUser: IUser,
    addUserToCourseSuccess: boolean,
    setAddUserToCourseSuccess: (bool: boolean) => void,
}

const CartPage: FC<Props> = ({cartList, removeAllCoursesFromCart, addUserToCourse, authUser, addUserToCourseSuccess, setAddUserToCourseSuccess}) => {

    const coursePaymentSum = () => {
        let sum = 0;
        cartList.forEach(c => {
            sum += +c.price
        });
        return sum;
    }
    console.log(cartList);
    useEffect(() => {
        return () => setAddUserToCourseSuccess(false);
    }, [])

    const addUserToCourses = () => {
        cartList.forEach(item => {
            addUserToCourse(item._id, authUser._id);
        })
        setAddUserToCourseSuccess(true);
        removeAllCoursesFromCart()
    }

    const [modalActive, setModalActive] = useState(false);

    return (
        <div className="shopping__cart">
            <div className="shopping__cart__header">
                <h3 className="cart_heading">Your shopping cart</h3>
                <h5 className="cart_action" onClick={() => removeAllCoursesFromCart()}>Remove all</h5>
            </div>

            {addUserToCourseSuccess && <Message type={MessageType.SUCCESS}>The course has been added</Message>}
            <UserCart/>

            <div className="shopping__cart__checkout">
                <div className="cart_total">
                    <div>
                        <div className="total">Total</div>
                        <div className="amount_items">{cartList.length} items</div>
                    </div>

                    <div className="total_amount">${coursePaymentSum()}</div>
                </div>
                {/*<Button onClick={() => addUserToCourses()}>Go to payment</Button>*/}
                {cartList.length !== 0 && <Button onClick={() => setModalActive(true)}>Go to payment</Button>}
            </div>

            <ModalWindow active={modalActive} setActive={setModalActive} buyCourse={addUserToCourses} cartTotal={coursePaymentSum}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        cartList: state.user.cartList,
        authUser: state.auth.authUser,
        addUserToCourseSuccess: state.course.addUserToCourseSuccess,
    }
}

export default connect(mapStateToProps, {
    removeAllCoursesFromCart: actions.removeAllCourseFromCart,
    addUserToCourse,
    setAddUserToCourseSuccess: courseActions.setAddUserToCourseSuccess})(CartPage);
