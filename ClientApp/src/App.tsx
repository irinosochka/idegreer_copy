import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import './App.css'
import {Route, Routes, useNavigate} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./common/Loader";

const App: FC = observer(() => {

        const {store} = useContext(Context)
        const [courses, setCourses] = useState([])

        const navigate = useNavigate()

        useEffect(() => {
            if (localStorage.getItem('token')) {
                store.checkAuth()
            }
        }, []);

        useEffect(() => {
            if(!store.isAuth && !store.isLoading) {
                navigate('/auth');
            }
        }, [store.isAuth]);

    if (store.isLoading) {
        return <div><Loader /></div>
    }
        return (
            <div>
                {store.isAuth && <Navbar/>}
                <Routes>
                    <Route path={'/'} element={<MainPage setCourses={setCourses} course={courses}/>}/>
                    <Route path={'/auth'} element={<AuthPage/>}/>
                    <Route path={'/profile'} element={<UserPage/>}/>
                </Routes>
            </div>
        );
    }
)

export default App;