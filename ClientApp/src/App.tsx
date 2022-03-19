import React, {FC, useContext, useEffect} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import './App.css'
import {Route, Routes, useNavigate} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";

const App: FC = observer(() => {

        const {store} = useContext(Context)
        const navigate = useNavigate()

        useEffect(() => {
            if (localStorage.getItem('token')) {
                store.checkAuth()
            }
        }, []);

        useEffect(() => {
            if (store.isAuth) {
                navigate('/profile')
            }
            if (!store.isAuth && !store.isLoading) {
                navigate('/auth')
            }
        }, [store.isAuth]);

        return (
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/auth'} element={<AuthPage/>}/>
                <Route path={'/profile'} element={<UserPage/>}/>
            </Routes>
        );
    }
)

export default App;
