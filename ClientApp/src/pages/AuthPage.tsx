import React, {useContext, useEffect, useState} from 'react';
import Login from "../Components/Login/Login";
import {Context} from "../index";
import Registration from "../Components/Registration/Registration";

const AuthPage = () => {
    const [isLogin, setLogin] = useState(true);
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);

    if (store.isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className="btn__block">
                <button className={`reg__btn ${!isLogin && 'active'}`} onClick={()=> setLogin(false)}>Sign up</button>
                <button className={`login__btn ${isLogin && 'active'}`} onClick={()=> setLogin(true)}>Sing in</button>
            </div>
            {isLogin ? <Login/>: <Registration/>}
        </div>
    );
};

export default AuthPage;