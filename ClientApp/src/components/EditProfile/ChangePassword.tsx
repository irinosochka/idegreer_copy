import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";

import "./index.css"
import {observer} from "mobx-react-lite";
import Button from "../../common/button/Button";
import Message, {MessageType} from "../../common/Messages/Message";

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [emptyError, setEmptyError] = useState(false);
    const [badPasswordLengthError, setBadPasswordLengthError] = useState(false);
    const {store} = useContext(Context);

    useEffect(() => {
        return () => store.setPasswordChangingSuccess(false);
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
                    store.passwordChanging(currentPassword, firstPassword);
                    clearFields();
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
            {emptyError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
            {!emptyError && repeatPasswordError && <Message type={MessageType.ERROR}>Password should be the same</Message>}
            {badPasswordLengthError && <Message type={MessageType.ERROR}>Password length should be more than 8 signs</Message>}
            {store.passwordChangingSuccess && <Message type={MessageType.SUCCESS}>Success</Message>}
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => {
                        setCurrentPassword(event.target.value);
                        setEmptyError(false);
                        setRepeatPasswordError(false);
                        store.setRegistrationError(false);
                        store.setPasswordChangingSuccess(false);
                    }}
                    value={currentPassword}
                    type="password"
                    placeholder="Current password"
                />
                <input
                    onChange={(event) => {
                        setFirstPassword(event.target.value);
                        setEmptyError(false);
                        setRepeatPasswordError(false);
                        store.setRegistrationError(false);
                        setBadPasswordLengthError(false);
                        store.setPasswordChangingSuccess(false);
                    }}
                    value={firstPassword}
                    type="password"
                    placeholder="Password"
                />
                <input
                    onChange={(event) => {
                        setSecondPassword(event.target.value);
                        setEmptyError(false);
                        setRepeatPasswordError(false);
                        store.setRegistrationError(false);
                        setBadPasswordLengthError(false);
                        store.setPasswordChangingSuccess(false);
                    }}
                    value={secondPassword}
                    type="password"
                    placeholder="Repeat password"
                />
                <Button width={260}>Change password</Button>
            </form>
        </div>
    );
};

export default observer(ChangePassword);
