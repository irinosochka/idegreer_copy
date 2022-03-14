import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";

const AdminPanel = () => {

    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        store.getAllUsers()
    }, []);

    const {store} = useContext(Context);

    return (
        <>
            <button onClick={() => setShowUsers(!showUsers)}>Show users</button>
            {showUsers && store.usersList.length > 0 && <ul>
                {store.usersList.map((user: any, index: number) => {
                    return <li key={index}>{user.username}</li>
                })}
            </ul>}
        </>
    );
};

export default AdminPanel;