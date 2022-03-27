import React, {FC, useEffect, useState} from 'react'
import "../auth.scss"
import Button from "../../../common/button/Button";
import Message, {MessageType} from "../../../common/Messages/Message";
import {connect} from "react-redux";
import {AppStateType} from "../../../reduxStore/store";
import {actions, login} from "../../../reduxStore/auth-reducer";


interface LoginProps {
    loginError: boolean,
    setLoginError: (bool: boolean) => void,
    login: (username: string, password: string) => void
}

const Login: FC<LoginProps> = ({login, setLoginError, loginError}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setError] = useState(false);

    useEffect(() => {
        setLoginError(false)
    }, []);

    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        if (password.length !== 0 && username.length !== 0) {
            login(username, password)
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
                        setLoginError(false);
                    }}
                    value={username}
                    type="text"
                    placeholder="Username"
                />
                <input
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setError(false);
                        setLoginError(false);
                    }}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <Button>SIGN IN</Button>
                {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {loginError && <Message type={MessageType.ERROR}>Username or password are wrong</Message>}
            </form>
        </>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        loginError: state.auth.loginError,
    }
}

export default connect(mapStateToProps, {setLoginError: actions.setLoginError, login})(Login)
