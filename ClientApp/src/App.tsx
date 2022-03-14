import React, {FC, useContext, useEffect, useState} from 'react';
import Login from "./Components/Login/Login";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import './App.css'
import Registration from "./Components/Registration/Registration";


const App: FC = observer(() => {
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
                    <button className="reg__btn" onClick={()=> setLogin(false)}>Zarejestruj się</button>
                    <button className="login__btn" onClick={()=> setLogin(true)}>Zaloguj się</button>
                </div>
                {isLogin ? <Login/>: <Registration/>}
            </div>
        );
    }
)

export default App;
