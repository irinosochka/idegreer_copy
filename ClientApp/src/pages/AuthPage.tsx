import React, {useContext, useEffect, useState} from 'react';
import Login from "../components/AuthComponents/Login/Login";
import Registration from "../components/AuthComponents/Registration/Registration";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import './authPage.css'

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
        <div className={'auth__wrapper'}>
            <div>

            </div>
            <div className="btn__block">
                <div className={"btns__wrapper"}>
                    <button className={`login__btn ${isLogin && 'active'}`} onClick={()=> setLogin(true)}>Login</button>
                    <button className={`reg__btn ${!isLogin && 'active'}`} onClick={()=> setLogin(false)}>Registration</button>
                </div>
                <div className="container">
                    <div className={'auth__title_wrapper'}>
                        <span className={'auth__title'}>Welcome!</span>
                        <span className={'auth__undertitle'}>to iDegreer</span>
                    </div>
                    {isLogin ? <Login/> : <Registration/>}
                </div>
                <div style={{height: '100px'}}>
                </div>
            </div>
        </div>
    );
};

export default observer(AuthPage)