import React, {FC, useEffect} from 'react';
import './App.css'
import {Route, Routes, useNavigate} from 'react-router-dom';
import AuthPage from "./pages/AuthPage/AuthPage";
import UserPage from "./pages/UserPage";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./common/Loader/Loader";
import {connect} from "react-redux";
import {AppStateType} from "./reduxStore/store";
import {checkAuth} from "./reduxStore/auth-reducer";
import CoursePage from "./pages/CoursePage";
import CartPage from "./pages/CartPage";
import {ICourse} from "./models/ICourse";

interface AppProps {
    isAuth: boolean,
    isLoading: boolean,
    checkAuth: () => void,
    courses: Array<ICourse>
}

const App: FC<AppProps> = ({isAuth, courses, isLoading, checkAuth}) => {

        const navigate = useNavigate()

        useEffect(() => {
            if (localStorage.getItem('token')) {
                checkAuth();
            }
            console.log(courses)
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
                    <Route path={'/'} element={<UserPage/>}/>
                    <Route path={'/auth'} element={<AuthPage/>}/>
                    {/*<Route path={'/profile'} element={<UserPage/>}/>*/}
                    <Route path={'/cart'} element={<CartPage/>}/>
                    <Route path={'/course/:id'} element={<CoursePage/>}/>
                </Routes>

            </div>
        );
    }


const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        isLoading: state.auth.isLoading,
        courses: state.course.userCourses
    }
}

export default connect(mapStateToProps, {checkAuth})(App);
