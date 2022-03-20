import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import '../index.scss';
import ErrorMessage from "../../../common/Messages/ErrorMessage";
import {observer} from "mobx-react-lite";
import Button from "../../../common/button/Button";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    /* ERRORS */
    const [emptyError, setEmptyError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const {store} = useContext(Context);

    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        if(username.length !== 0 && secondPassword.length !== 0 && firstPassword.length !== 0 && name.length !== 0) {
            if (secondPassword === firstPassword) {
                store.registration(username, firstPassword, name, email)
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
                        store.setRegistrationError(false);
                    }}
                    value={name}
                    type="text"
                    placeholder="Name"
                />
                <input
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setEmptyError(false);
                        store.setRegistrationError(false);
                    }}
                    value={email}
                    type="email"
                    placeholder="Email"
                />
                <input
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setEmptyError(false);
                        store.setRegistrationError(false);
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
                <Button>Sign Up</Button>
                {emptyError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
                {!emptyError && repeatPasswordError && <ErrorMessage>Password should be the same</ErrorMessage>}
                {store.registrationError && <ErrorMessage>User exists</ErrorMessage>}
            </form>
        </>
    );
};

export default observer(Registration);