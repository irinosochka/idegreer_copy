import React, {FC, useEffect, useState} from 'react';
import Login from "../components/AuthComponents/Login/Login";
import Registration from "../components/AuthComponents/Registration/Registration";
import {useNavigate} from "react-router-dom";
import './authPage.css'
import {AppStateType} from "../reduxStore/store";
import {connect} from "react-redux";

interface AuthPageProps {
    isAuth: boolean
}

const AuthPage: FC<AuthPageProps> = ({isAuth}) => {
    const [isLogin, setLogin] = useState(true);

    const navigator = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigator('/')
        }
    }, [isAuth]);

    return (
        <div className={'auth__wrapper'}>
            <div>

            </div>
            <div className="btn__block">
                <div className={"btns__wrapper"}>
                    <button className={`reg__btn ${isLogin && 'active'}`} onClick={() => setLogin(true)}>
                        Login
                    </button>
                    <button className={`reg__btn ${!isLogin && 'active'}`}
                            onClick={() => setLogin(false)}>
                        Registration
                    </button>
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

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {})(AuthPage)
