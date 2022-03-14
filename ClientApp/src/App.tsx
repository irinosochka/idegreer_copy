import React, {FC, useContext, useEffect} from 'react';
import Login from "./Components/Login/Login";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import './App.css'

const App: FC = observer(() => {

        const {store} = useContext(Context)

        useEffect(() => {
            if (localStorage.getItem('token')) {
                store.checkAuth()
            }
        }, []);

        const logout = () => {
            store.logout();
        }

        if(store.isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div>
                {store.isAuth ? (
                    <div style={{
                        width: '100%',
                        background: 'black',
                        color: 'white',
                        padding: '15px'
                    }}>
                        <h1>User <b>{store.user.username}</b> with roles {store.user.roles} was logged</h1>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : <Login/>}
            </div>
        );
    }
)

export default App;
