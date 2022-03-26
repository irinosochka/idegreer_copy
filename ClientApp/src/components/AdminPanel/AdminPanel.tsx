import React, {FC, useEffect, useState} from 'react';
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {getAllUsers} from "../../reduxStore/user-reducer";
import {IUser} from "../../models/IUser";

interface AdminPanelProps {
    usersList: IUser[],
    getAllUsers: () => void
}

const AdminPanel: FC<AdminPanelProps> = ({getAllUsers, usersList}) => {

    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        getAllUsers()
    }, []);


    return (
        <>
            <button onClick={() => setShowUsers(!showUsers)}>Show users</button>
            {showUsers && usersList.length > 0 && <ul>
                {usersList.map((user: any, index: number) => {
                    return <li key={index}>{user.username}</li>
                })}
            </ul>}
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        usersList: state.user.usersList
    }
}

export default connect(mapStateToProps, {getAllUsers})(AdminPanel);
