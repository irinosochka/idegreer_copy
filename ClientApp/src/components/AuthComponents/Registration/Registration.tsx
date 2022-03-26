import React, {FC, useState} from 'react';
import '../index.scss';
import Button from "../../../common/button/Button";
import Message, {MessageType} from "../../../common/Messages/Message";
import {connect} from "react-redux";
import {AppStateType} from "../../../reduxStore/store";
import {actions, registration} from "../../../reduxStore/auth-reducer";

interface RegistrationProps {
    registration: (username: string, firstPassword: string, name: string, email: string) => void,
    setRegistrationError: (bool:boolean) => void,
    registrationError: boolean
}

const Registration: FC<RegistrationProps> = ({registration, setRegistrationError, registrationError}) => {
    const [username, setUsername] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    /* ERRORS */
    const [emptyError, setEmptyError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [badPasswordLengthError, setBadPasswordLengthError] = useState(false);


    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        if(username.length !== 0 && secondPassword.length !== 0 && firstPassword.length !== 0 && name.length !== 0) {
            if (secondPassword === firstPassword) {
                if (firstPassword.length < 9) {
                    setBadPasswordLengthError(true)
                } else {
                    registration(username, firstPassword, name, email)
                }
            } else {
                setRepeatPasswordError(true)
            }
        } else {
            setEmptyError(true)
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => {
                        setName(event.target.value);
                        setEmptyError(false);
                        setRegistrationError(false);
                    }}
                    value={name}
                    type="text"
                    placeholder="Name"
                />
                <input
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setEmptyError(false);
                        setRegistrationError(false);
                    }}
                    value={email}
                    type="email"
                    placeholder="Email"
                />
                <input
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setEmptyError(false);
                        setRegistrationError(false);
                    }}
                    value={username}
                    type="text"
                    placeholder="Username"
                />
                <input
                    onChange={(event) => {
                        setFirstPassword(event.target.value);
                        setEmptyError(false);
                        setRepeatPasswordError(false);
                        setRegistrationError(false);
                        setBadPasswordLengthError(false);
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
                        setRegistrationError(false);
                        setBadPasswordLengthError(false);
                    }}
                    value={secondPassword}
                    type="password"
                    placeholder="Repeat password"
                />
                <Button>Sign Up</Button>
                {emptyError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {!emptyError && repeatPasswordError && <Message type={MessageType.ERROR}>Password should be the same</Message>}
                {badPasswordLengthError && <Message type={MessageType.ERROR}>Password length should be more than 8 signs</Message>}
                {registrationError && <Message type={MessageType.ERROR}>User exists</Message>}
            </form>
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        registrationError: state.auth.registrationError
    }
}

export default connect(mapStateToProps, {setRegistrationError: actions.setRegistrationError, registration})(Registration);
