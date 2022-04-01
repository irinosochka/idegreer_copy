import React, {useState} from 'react';
import './adminPanel.css'
import RoleRequestList from "./RoleRequestList";
import ManageRolesButton from "./ManageRolesButton";
import AddRole from "./AddRole";

const ManageRoles = () => {
    const [isAddCourse, setAddCourse] = useState(true);

    return (
        <div>
            <div style={{display: 'inline-flex', width: '400px'}}>
                <ManageRolesButton isAddCourse={isAddCourse} setAddCourse={() => setAddCourse(true)}>Add role</ManageRolesButton>
                <ManageRolesButton isAddCourse={!isAddCourse} setAddCourse={() => setAddCourse(false)}>Role request</ManageRolesButton>
            </div>
            <div style={{paddingTop: '10px'}}>
                {isAddCourse ? <AddRole/> : <RoleRequestList/>}
            </div>
        </div>
    );
};

export default ManageRoles;
