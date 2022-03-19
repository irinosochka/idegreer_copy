import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import ErrorMessage from "../../common/Messages/ErrorMessage";

import "./index.css"

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [emptyError, setEmptyError] = useState(false);
    const {store} = useContext(Context);

    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        if(currentPassword.length !== 0 && firstPassword.length !== 0 && secondPassword.length !== 0) {
            if(firstPassword === secondPassword){
                console.log(currentPassword, firstPassword, secondPassword);
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
                <input
                    onChange={(event) => {
                        setCurrentPassword(event.target.value);
                        setEmptyError(false);
                        setRepeatPasswordError(false);
                        store.setRegistrationError(false);
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
                    }}
                    value={secondPassword}
                    type="password"
                    placeholder="Repeat password"
                />
                <button type="submit">Change password</button>
                {emptyError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
                {!emptyError && repeatPasswordError && <ErrorMessage>Password should be the same</ErrorMessage>}

            </form>
        </div>
    );
};

export default ChangePassword;
