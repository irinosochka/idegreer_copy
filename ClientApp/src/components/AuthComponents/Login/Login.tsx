import React, {useContext, useEffect, useState} from 'react'
import "../index.scss"
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import ErrorMessage from "../../../common/Messages/ErrorMessage";
import Button from "../../../common/button/Button";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setError] = useState(false);

    const {store} = useContext(Context);


    useEffect(() => {
        store.setLoginError(false)
    }, []);


    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        if (password.length !== 0 && username.length !== 0) {
            store.login(username, password)
        } else {
            setError(true);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={'auth__form'}>
                <input
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setError(false);
                        store.setLoginError(false);
                    }}
                    value={username}
                    type="text"
                    placeholder="Username"
                />
                <input
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setError(false);
                        store.setLoginError(false);
                    }}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <Button>SIGN IN</Button>
                {isError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
                {store.loginError && <ErrorMessage>Username or password are wrong</ErrorMessage>}
            </form>
        </>
    )
}

export default observer(Login)