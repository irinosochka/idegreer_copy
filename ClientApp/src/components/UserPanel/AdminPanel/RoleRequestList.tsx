import React, {FC, useEffect} from 'react';
import {changeUserRoleRequest, getAllUsers} from "../../../reduxStore/user-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../reduxStore/store";
import {IUser} from "../../../models/IUser";
import Button from "../../../common/button/Button";
import {actions, setRoleToUser} from "../../../reduxStore/role-reducer";

interface RoleRequestListProps {
    getAllUsers: () => void,
    setRoleToUser: (user: IUser, newRole: string) => void,
    users: IUser[],
    changeUserRoleRequest: (userId: string) => void
}

const RoleRequestList: FC<RoleRequestListProps> = ({getAllUsers, setRoleToUser, users, changeUserRoleRequest}) => {

    useEffect(() => {
        getAllUsers()
    }, [users])

    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {users.map(user => user.isRoleRequest && !user.roles.includes('PROFESSOR') ? <div key={user._id} style={{ borderRadius: '10px', marginRight: '40px', border: '1px solid #000', width: '220px', textAlign: 'left'}}>
               <div style={{padding: '20px 20px 0 20px'}}>
                   <div>
                       User {user.name} with username {user.username} want to be as professor
                   </div>
               </div>
                {<Button width={200} onClick={() => {
                    setRoleToUser(user, 'PROFESSOR');
                    changeUserRoleRequest(user._id);
                }}>Add role</Button>}
            </div> : null)}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.user.usersList
    }
}

export default connect(mapStateToProps, {getAllUsers, setRoleToUser, changeUserRoleRequest, setRoleAdded: actions.setRoleAdded})(RoleRequestList);
