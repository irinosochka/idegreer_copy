import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import './App.css'
import {Route, Routes} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import Navbar from "./components/Navbar/Navbar";

const App: FC = observer(() => {
        const {store} = useContext(Context)
        const [courses, setCourses] = useState([])
        console.log(courses);

        useEffect(() => {
            if (localStorage.getItem('token')) {
                store.checkAuth()
            }
        }, []);

        return (
            <div>
                {store.isAuth && <Navbar/>}
                <Routes>
                    <Route path={'/'} element={<MainPage courses={courses} />}/>
                    <Route path={'/auth'} element={<AuthPage />}/>
                    <Route path={'/profile'} element={<UserPage setCourses={setCourses} courses={courses} />}/>
                </Routes>

            </div>
        );
    }
)

export default App;