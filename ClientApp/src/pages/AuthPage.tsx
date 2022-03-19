import React, {useContext, useEffect, useState} from 'react';
import Login from "../components/AuthComponents/Login/Login";
import Registration from "../components/AuthComponents/Registration/Registration";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";

const AuthPage = () => {
    const [isLogin, setLogin] = useState(true);

    const {store} = useContext(Context);
    const navigator = useNavigate()

    useEffect(() => {
        if(store.isAuth) {
            navigator('/')
        }
    }, [store.isAuth]);


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