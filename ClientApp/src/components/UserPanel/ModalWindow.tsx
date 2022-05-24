import React, {FC, useEffect, useState} from 'react';
import '../UserPanel/modalWindow.css';
import Button from "../../common/button/Button";
import {connect} from "react-redux";
import {addUserToCourse} from "../../reduxStore/course-reducer";
import {AppStateType} from "../../reduxStore/store";
import swal from 'sweetalert';

import userImg from "../../assets/img/card/person-svgrepo-com.svg"
import cardImg from "../../assets/img/card/credit-card-svgrepo-com.svg"
import dateImg from "../../assets/img/card/date-svgrepo-com.svg"
import cvvImg from "../../assets/img/card/secure-access-svgrepo-com.svg"

interface ModalWindowProps {
    active: boolean,
    setActive: (bool: boolean) => void,
    cartTotal: () => number,
    buyCourse: () => void
}

const ModalWindow: FC<ModalWindowProps> = ({active, setActive, cartTotal, buyCourse}) => {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const [nameDirty, setNameDirty] = useState(false);
    const [numberDirty, setNumberDirty] = useState(false);
    const [expiryDirty, setExpiryDirty] = useState(false);
    const [cvvDirty, setCvvDirty] = useState(false);

    const [nameError, setNameError] = useState("Cardholder name is required");
    const [numberError, setNumberError] = useState("Card number is required");
    const [expiryError, setExpiryError] = useState("Expiry is required");
    const [cvvError, setCvvError] = useState("CVV is required");

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (nameError || numberError || expiryError || cvvError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, numberError, expiryError, cvvError])

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true);
                break;
            case 'number':
                setNumberDirty(true);
                break;
            case 'expiry':
                setExpiryDirty(true);
                break;
            case 'cvv':
                setCvvDirty(true);
                break;
        }
    }

    const nameHandler = (e: any) => {
        setName(e.target.value);
        console.log(e.target.value);
        const re = /^[a-zA-Z\s]+$/;
      if (!re.test( e.target.value.toString())) {
          setNameError("Incorrect value: letters only");
          if(!e.target.value) {
              setNameError("Cardholder name is required");
          }
      } else {
          setNameError("");
      }
    }

    const numberHandler = (e: any) => {
        setNumber(e.target.value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substring(0, 19) || "");
        const re = /^(?=.*\d)[\d ]+$/;
        if (!re.test(e.target.value)) {
            setNumberError("Incorrect format");
            if(!e.target.value) {
                setNumberError("Card number is required");
            }
        } else if (e.target.value.length < 19){
            setNumberError("Incorrect format. Please enter 16 digits");

        } else {
            setNumberError("");
        }
    }

    const expiryHandler = (e: any) => {
        setExpiry(e.target.value.replace(/\//g, "").match(/.{1,2}/g)?.join("/").substring(0, 5) || "");
        const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!re.test(e.target.value) || e.target.value.length < 5) {
            setExpiryError("Incorrect value");
            if(!e.target.value) {
                setExpiryError("Expiry is required");
            }
        } else {
            setExpiryError("");
        }
    }

    const cvvHandler = (e: any) => {
        setCvv(e.target.value.match(/.{1}/g)?.join("").substring(0,3) || "");
        const re = /^\d{3}$/;
        if (!re.test(e.target.value) || e.target.value.length < 3) {
            setCvvError("Incorrect value");
            if(!e.target.value) {
                setCvvError("CVV is required");
            }
        } else {
            setCvvError("");
        }
    }

    const onClick = () => {
        buyCourse();
        setActive(false);
        swal({
            title: "Successful payment!",
            text: "You have paid for courses!",
            icon: "success",
        });
        setName("");
        setNumber("");
        setExpiry("");
        setCvv("");
        setFormValid(false);
        setNumberDirty(false);
        setNameDirty(false);
        setExpiryDirty(false);
        setCvvDirty(false);
    }

    return (
        <div className={active ? "modal__window__wrapper active" : "modal__window__wrapper"}
             onClick={() => setActive(false)}>
            <div className={active ? "modal__window__payment active" : "modal__window__payment"}
                 onClick={e => e.stopPropagation()}>
                <h2>Payment</h2>
                <form action="" className="modal_form" onSubmit={(e) => e.preventDefault()}>
                    <div className="card space icon_relative">
                        <label className="label">Card holder:</label>
                        <img className="icon" src={userImg} alt=""/>
                        <input
                               type="text"
                               className="input"
                               name="name"
                               placeholder="Card Holder"
                               value={name}
                               onChange={(e) => nameHandler(e)}
                               onBlur={(e) => blurHandler(e)} />
                        {(nameDirty && nameError) && <div className="input_error">{nameError}</div>}
                    </div>

                    <div className="card space icon_relative">
                        <label className="label">Card number:</label>
                        <input
                            type="text"
                            className="input"
                            name="number"
                            placeholder="Card Number"
                            value={number}
                            onChange={(e) => numberHandler(e)}
                            onBlur={(e) => blurHandler(e)} />
                        <img className="icon" src={cardImg} alt=""/>
                        {(numberDirty && numberError) && <div className="input_error">{numberError}</div>}
                    </div>

                    <div className="card_grp space">
                        <div className="card_item icon_relative">
                            <label className="label">Expiry date:</label>
                            <img className="icon" src={dateImg} alt=""/>
                            <input
                                type="text"
                                className="input"
                                name="expiry"
                                placeholder="00/00"
                                value={expiry}
                                onChange={(e) => expiryHandler(e)}
                                onBlur={(e) => blurHandler(e)} />
                            {(expiryDirty && expiryError) && <div className="input_error">{expiryError}</div>}
                        </div>

                        <div className="card_item icon_relative">
                            <label className="label">CVV:</label>
                            <img className="icon" src={cvvImg} alt=""/>
                            <input
                                type="text"
                                className="input"
                                name="cvv"
                                placeholder="000"
                                value={cvv}
                                onChange={(e) => cvvHandler(e)}
                                onBlur={(e) => blurHandler(e)} />
                            {(cvvDirty && cvvError) && <div className="input_error">{cvvError}</div>}
                        </div>
                    </div>
                    {formValid && <Button onClick={() => onClick()}>Pay ${cartTotal()}</Button>}
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

export default connect(mapStateToProps, {addUserToCourse})(ModalWindow);