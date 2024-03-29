import React, {FC, useEffect, useState} from 'react';

import "../../UserPanel/userPanel.css"
import Button from "../../../common/button/Button";
import Message, {MessageType} from "../../../common/Messages/Message";
import {connect} from "react-redux";
import {AppStateType} from "../../../reduxStore/store";
import {actions} from "../../../reduxStore/auth-reducer";
import {actions as userActions, passwordChanging} from "../../../reduxStore/user-reducer";
import {IUser} from "../../../models/IUser";

interface ChangePasswordProps {
    authUser: IUser,
    passwordChanging: (user: IUser, currentPassword: string, firstPassword: string) => Promise<void>,
    passwordChangingSuccess: boolean,
    passwordChangingError: boolean,
    setPasswordChangingSuccess: (bool: boolean) => void,
    setPasswordChangingError: (bool: boolean) => void,
    setRegistrationError:  (bool: boolean) => void,
    handleClose: () => void,
}

const ChangePassword: FC<ChangePasswordProps> = ({authUser, passwordChanging, setPasswordChangingSuccess, passwordChangingSuccess, setPasswordChangingError, passwordChangingError, setRegistrationError, handleClose}) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [emptyError, setEmptyError] = useState(false);
    const [badPasswordLengthError, setBadPasswordLengthError] = useState(false);

    useEffect(() => {
        console.log(authUser);
        return () => setPasswordChangingSuccess(false);
    }, []);

    const clearFields = () => {
        setFirstPassword('');
        setSecondPassword('');
        setCurrentPassword('');
    }

    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        if(currentPassword.length !== 0 && firstPassword.length !== 0 && secondPassword.length !== 0) {
            if(firstPassword === secondPassword){
                if(firstPassword.length < 9) {
                    setBadPasswordLengthError(true)
                } else {
                    passwordChanging(authUser, currentPassword, firstPassword);
                    clearFields();
                    setTimeout(handleClose, 1000)
                }
            }else{
                setRepeatPasswordError(true)
            }
        } else {
            setEmptyError(true)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {emptyError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {!emptyError && repeatPasswordError && <Message type={MessageType.ERROR}>Password should be the same</Message>}
                {badPasswordLengthError && <Message type={MessageType.ERROR}>Password length should be more than 8 signs</Message>}
                {passwordChangingSuccess && <Message type={MessageType.SUCCESS}>Success</Message>}
                {passwordChangingError && <Message type={MessageType.ERROR}>Bad old or new password</Message>}
                <div className="input-wrapper">
                    <input className="form-control"
                        onChange={(event) => {
                            setCurrentPassword(event.target.value);
                            setEmptyError(false);
                            setRepeatPasswordError(false);
                            setRegistrationError(false);
                            setPasswordChangingSuccess(false);
                            setPasswordChangingError(false);
                        }}
                        value={currentPassword}
                        type="password"
                        placeholder="Current password"
                    /><label htmlFor="input" className="control-label">Current password:</label>
                </div>
                <div className="input-wrapper">
                    <input className="form-control"
                        onChange={(event) => {
                            setFirstPassword(event.target.value);
                            setEmptyError(false);
                            setRepeatPasswordError(false);
                            setRegistrationError(false);
                            setBadPasswordLengthError(false);
                            setPasswordChangingSuccess(false);
                            setPasswordChangingError(false);
                        }}
                        value={firstPassword}
                        type="password"
                        placeholder="New password"
                    /><label htmlFor="input" className="control-label">New password:</label>
                </div>
                <div className="input-wrapper" style={{marginBottom: '10px'}}>
                    <input className="form-control"
                        onChange={(event) => {
                            setSecondPassword(event.target.value);
                            setEmptyError(false);
                            setRepeatPasswordError(false);
                            setRegistrationError(false);
                            setBadPasswordLengthError(false);
                            setPasswordChangingSuccess(false);
                            setPasswordChangingError(false);
                        }}
                        value={secondPassword}
                        type="password"
                        placeholder="Repeat password"
                    /><label htmlFor="input" className="control-label">Repeat password:</label>
                </div>
                <Button width={240}>Change password</Button>
            </form>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        passwordChangingSuccess: state.user.passwordChangingSuccess,
        passwordChangingError: state.user.passwordChangingError
    }
}
export default connect(mapStateToProps, {passwordChanging, setPasswordChangingSuccess: userActions.setPasswordChangingSuccess, setPasswordChangingError: userActions.setPasswordChangingError ,setRegistrationError: actions.setRegistrationError})(ChangePassword);
