import React, {useContext, useState} from 'react'
import "./index.css"
import {Context} from "../../index";

export default function Registration(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(Context);

    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        store.registration(username, password);
    }

    return(
        <div className="container">
            <span>Registration</span>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                    type="text"
                    placeholder="Login"
                />
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <button  type="submit"> Registration </button>
            </form>
        </div>
    )
}

