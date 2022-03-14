import React, {FC, useContext, useEffect} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import './App.css'
import {Route, Routes, useNavigate} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";

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
                navigate('/')
            } else if (!store.isAuth) {
                navigate('/auth')
            }
        }, [store.isAuth]);

        return (
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/auth'} element={<AuthPage/>}/>
            </Routes>
        );
    }
)

export default App;
