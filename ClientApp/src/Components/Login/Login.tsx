import React, {useContext, useState} from 'react'
import "./index.css"
import {Context} from "../../index";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(Context);

    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        store.login(username, password)
    }

    return(
        <div className="container">
            <span>Sign in</span>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                    type="text"
                    placeholder="Email"
                />
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <button  type="submit"> Login </button>
            </form>
        </div>
    )
}
