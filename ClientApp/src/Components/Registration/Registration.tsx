import {useContext, useState} from 'react';
import {Context} from "../../index";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(Context);

    const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        store.registration(username, password)
    }

    return(
        <div className="container">
            <span>Registration</span>
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
                <button  type="submit"> Registration </button>
            </form>
        </div>
    );
};

export default Registration;