import React, {useState} from 'react';
import './adminPanel.css'
import RoleRequestList from "./RoleRequestList";
import AddRole from "./AddRole";
import TwoButtons from "../../../common/PanelTopButtons/TwoButtons";

const ManageRoles = () => {
    const [isAddCourse, setAddCourse] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'inline-flex', width: '400px'}}>
                <TwoButtons isFirst={isAddCourse} setFirst={() => setAddCourse(true)}>Add role</TwoButtons>
                <TwoButtons isFirst={!isAddCourse} setFirst={() => setAddCourse(false)}>Role request</TwoButtons>
            </div>
            <div>
                {isAddCourse ? <AddRole/> : <RoleRequestList/>}
            </div>
        </div>
    );
};

export default ManageRoles;
