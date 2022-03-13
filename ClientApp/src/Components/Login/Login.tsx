import React, {useState} from 'react'
import "./index.css"

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onsubmit = (event:any) => {
        event.preventDefault();
        console.log(email, password);
    }

    return(
        <div className="container">
            <span>Sign in</span>
            <form>
                <input
                    onChange={(event) => setEmail(event.target.value)}
                    type="text"
                    placeholder="Email"
                />
            </form>
            <form>
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Password"
                />
            </form>
            <form>
                <button onClick={onsubmit}  type="submit"> Login </button>
            </form>
        </div>
    )
}
