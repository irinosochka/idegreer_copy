import React, {useContext} from 'react';
import {Context} from "../index";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import {observer} from "mobx-react-lite";

const MainPage = () => {

    const {store} = useContext(Context);

    if (store.isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {store.user.roles?.includes('ADMIN') && <AdminPanel />}
        </div>
    );
};

export default observer(MainPage);