import React, {useContext} from 'react';
import {Context} from "../index";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import {observer} from "mobx-react-lite";
import Profile from "../components/Profile/Profile";
import EditProfile from "../components/EditProfile/EditProfile";
import UserPage from "./UserPage";

const MainPage = () => {

    const {store} = useContext(Context);

    if (store.isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {store.isAuth && <UserPage/>}
            {store.user.roles?.includes('ADMIN') && <AdminPanel />}
        </div>
    );
};

export default observer(MainPage);
