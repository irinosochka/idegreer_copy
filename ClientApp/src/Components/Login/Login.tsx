import React, {useContext, useState} from 'react'
import "../Registration/index.css"
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setError] = useState(false);

    const {store} = useContext(Context);

    const navigate = useNavigate()


    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();

        if(username.length !== 0 && password.length !== 0) {
            store.login(username, password).then(_ => navigate('/'))
        } else {
            setError(true)
        }
    }

    return(
        <div className="container">
            <span>Sign in</span>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setError(false);
                    }}
                    value={username}
                    type="text"
                    placeholder="Username"
                />
                <input
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setError(false)
                    }}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <button  type="submit" >Sign in</button>
                {isError ? <span style={{color: 'red'}}>Username or password can't be empty</span> : null}
            </form>
        </div>
    )
}
