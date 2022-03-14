import React, {FC, useContext} from 'react';
import Login from "./Components/Login/Login";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const App: FC = observer(() => {

        const {store} = useContext(Context)

        return (
            <div>
                {store.isAuth ? <div>User <b>{store.user.username}</b> with roles {store.user.roles} was logged</div> : <Login/>}
            </div>
        );
    }
)

export default App;
