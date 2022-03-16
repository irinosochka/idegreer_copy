import React, {useState} from 'react';
import Login from "../components/AuthComponents/Login/Login";
import Registration from "../components/AuthComponents/Registration/Registration";
import {observer} from "mobx-react-lite";

const AuthPage = () => {
    const [isLogin, setLogin] = useState(true);

    return (
        <div>
            <div className="btn__block">
                <button className={`reg__btn ${!isLogin && 'active'}`} onClick={()=> setLogin(false)}>Sign up</button>
                <button className={`login__btn ${isLogin && 'active'}`} onClick={()=> setLogin(true)}>Sing in</button>
            </div>
            {isLogin ? <Login/> : <Registration/>}
        </div>
    );
};

export default observer(AuthPage)