import React, {FC, useEffect} from 'react';
import './App.css'
import {Route, Routes, useNavigate} from 'react-router-dom';
import AuthPage from "./pages/AuthPage/AuthPage";
import UserPage from "./components/Menus/LeftMenu";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./common/Loader/Loader";
import {connect} from "react-redux";
import {AppStateType} from "./reduxStore/store";
import {checkAuth} from "./reduxStore/auth-reducer";
import CartPage from "./pages/CartPage/CartPage";
import CourseCatalog from "./pages/CourseCatalogPage";
import RightMenu from "./components/Menus/RightMenuPanel/RightMenu";
import UserCourseList from "./pages/UserCourseList/UserCourseListPage";
import ProfessorCourses from "./pages/CoursesPageOfProfessor";
import AddCourse from "./components/UserPanel/ProfessorPanel/AddCourse";
import ManageRoles from "./components/UserPanel/AdminPanel/ManageRoles";
import UserCourse from "./pages/UserCourseList/UserCoursePage/UserCoursePage";
import ManageCourse from "./components/UserPanel/ProfessorPanel/ManageCourse";

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
                <div style={{display: 'flex'}}>
                    {isAuth && <UserPage/>}
                    <div style={{width: `${isAuth ? 'calc(100% - 700px)' : '100%'}`, background: 'rgb(212 206 250)', padding: '20px' }}>
                        <Routes>
                            <Route path={'/auth'} element={<AuthPage/>} />
                            <Route path={'/'} element={<CourseCatalog/>} />
                            <Route path={'/your-courses'} element={<UserCourseList/>} />
                            <Route path={'/course-list'} element={<ProfessorCourses/>} />
                            <Route path={'/add-course'} element={<AddCourse/>} />
                            <Route path={'/manage-roles'} element={<ManageRoles/>} />
                            <Route path={'/manage-course/:id'} element={<ManageCourse />} />
                            <Route path={'/course/:id'} element={<UserCourse />} />
                            <Route path={'/cart'} element={<CartPage />} />
                        </Routes>
                    </div>
                    {
                        isAuth &&
                        <div className="rightMenu__wrapper" style={{width: '400px', background: 'rgb(212 206 250)'}}>
                            <RightMenu/>
                        </div>
                    }
                </div>
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
