import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import '../index.css'
import ErrorMessage from "../../../common/Messages/ErrorMessage";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emptyError, setEmptyError] = useState(false);

    const {store} = useContext(Context);

    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        if(username.length !== 0 && password.length !== 0) {
            store.registration(username, password)
        } else {
            setEmptyError(true)
        }
    }

    return(
        <div className="container">
            <h1 className={'auth__title'}>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setEmptyError(false);
                    }}
                    value={username}
                    type="text"
                    placeholder="Username"
                />
                <input
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setEmptyError(false);
                    }}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <button  type="submit">Sign up</button>
                {emptyError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
            </form>
        </div>
    );
};

export default Registration;