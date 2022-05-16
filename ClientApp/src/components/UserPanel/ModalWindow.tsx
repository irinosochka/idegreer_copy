import React, {FC} from 'react';
import '../UserPanel/modalWindow.css';
import Button from "../../common/button/Button";
import {connect} from "react-redux";
import {addUserToCourse} from "../../reduxStore/course-reducer";
import {AppStateType} from "../../reduxStore/store";

import userImg from "../../assets/img/card/person-svgrepo-com.svg"
import cardImg from "../../assets/img/card/credit-card-svgrepo-com.svg"
import dateImg from "../../assets/img/card/date-svgrepo-com.svg"
import cvvImg from "../../assets/img/card/secure-access-svgrepo-com.svg"

interface ModalWindowProps {
    active: boolean,
    setActive: (bool: boolean) => void,
    cartTotal: number,
    buyCourse: () => void
}

const ModalWindow: FC<ModalWindowProps>= ({active, setActive, cartTotal, buyCourse}) => {
    return (
        <div className={active ? "modal__window__wrapper active" : "modal__window__wrapper"} onClick={() => setActive(false)}>
            <div className={active ? "modal__window__payment active" : "modal__window__payment"} onClick={e => e.stopPropagation()}>
                <h2>Payment</h2>
                <form action="" className="modal_form" onSubmit={(e) => e.preventDefault()}>
                    <div className="card space icon_relative">
                        <label className="label">Card holder:</label>
                        <input type="text" className="input" name="card_holder" placeholder="Card Holder"/>
                        <img className="icon" src={userImg} alt=""/>
                    </div>

                    <div className="card space icon_relative">
                        <label className="label">Card number:</label>
                        <input type="text" className="input" name="card_number" placeholder="Card Number"/>
                        <img className="icon" src={cardImg} alt=""/>
                    </div>

                    <div className="card_grp space">
                        <div className="card_item icon_relative">
                            <label className="label">Expiry date:</label>
                            <input type="text" className="input" name="expiry_date" placeholder="00 / 00"/>
                            <img className="icon" src={dateImg} alt=""/>
                        </div>

                        <div className="card_item icon_relative">
                            <label className="label">CVV:</label>
                            <input type="text" className="input" name="cvv" placeholder="000"/>
                            <img className="icon" src={cvvImg} alt=""/>
                        </div>
                    </div>
                    <Button onClick={() => buyCourse()}>Pay ${cartTotal}</Button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        addUserToCourseSuccess: state.course.addUserToCourseSuccess,
    }
}

export default connect(mapStateToProps,{addUserToCourse})(ModalWindow);