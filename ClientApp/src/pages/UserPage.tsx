import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import Profile from "../components/Profile/Profile";
import EditProfile from "../components/EditProfile/EditProfile";
import ChangePassword from "../components/EditProfile/ChangePassword";

const UserPage = () => {
    const [isEdit, setEdit] = useState(false);

    return (
        <div>
            <Profile />
            <div className="edit__container">
                <div className="btn__menu">
                    <button className={`edit__btn ${!isEdit && 'active'}`} onClick={()=> setEdit(false)}>Edit Profile</button>
                    <button className={`password__btn ${isEdit && 'active'}`} onClick={()=> setEdit(true)}>Change password</button>
                </div>
                {isEdit ? <ChangePassword /> : <EditProfile/>}
            </div>

        </div>
    );
};

export default observer(UserPage);
