import React, {FC, useState} from 'react';
import {observer} from "mobx-react-lite";
import EditProfile from "../components/EditProfile/EditProfile";
import ChangePassword from "../components/EditProfile/ChangePassword";
import AddCourse from "../components/AddCourse/AddCourse";
interface UserPageProps{
    setCourses: (course: any) => void,
    courses: any
}

const UserPage:FC<UserPageProps> = ({setCourses, courses}) => {
    const [isEdit, setEdit] = useState(false);

    return (
        <div>
            <div className="edit__container">
                <div className="btn__menu">
                    <button className={`edit__btn ${!isEdit && 'active'}`} onClick={()=> setEdit(false)}>Edit Profile</button>
                    <button className={`password__btn ${isEdit && 'active'}`} onClick={()=> setEdit(true)}>Change password</button>
                </div>
                {isEdit ? <ChangePassword /> : <EditProfile/>}
            </div>
            <div>
                <AddCourse setCourses={setCourses} courses={courses} />
            </div>
        </div>
    );
};

export default observer(UserPage);