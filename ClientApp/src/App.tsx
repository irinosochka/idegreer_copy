import React, {FC, useEffect} from 'react';
import './App.css'
import {Route, Routes, useNavigate} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import UserPage from "./pages/UserPage";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./common/Loader/Loader";
import {connect} from "react-redux";
import {AppStateType} from "./reduxStore/store";
import {checkAuth} from "./reduxStore/auth-reducer";
import CoursePage from "./pages/CoursePage";

interface AppProps {
    isAuth: boolean,
    isLoading: boolean,
    checkAuth: () => void
}

const App: FC<AppProps> = ({isAuth, isLoading, checkAuth}) => {

        const navigate = useNavigate()

        useEffect(() => {
            if (localStorage.getItem('token')) {
                checkAuth();
            }
        }, []);

        useEffect(() => {
            if (!isAuth && !isLoading) {
                navigate('/auth');
            }
        }, [isAuth]);

        if (isLoading) {
            return <div><Loader/></div>
        }

        return (
            <div>
                {isAuth && <Navbar/>}
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/auth'} element={<AuthPage/>}/>
                    <Route path={'/profile'} element={<UserPage/>}/>
                    <Route path={'/course/:id'} element={<CoursePage/>}/>
                </Routes>

            </div>
        );
    }


const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {checkAuth})(App);
