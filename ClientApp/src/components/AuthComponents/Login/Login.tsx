import React, {useContext, useEffect, useState} from 'react'
import "../index.scss"
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import Button from "../../../common/Button/Button";
import Message, {MessageType} from "../../../common/Messages/Message";

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
                {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {store.loginError && <Message type={MessageType.ERROR}>Username or password are wrong</Message>}
            </form>
        </>
    )
}

export default observer(Login)
