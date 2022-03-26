import React, {FC, useEffect} from 'react';
import {changeUserRoleRequest, getAllUsers} from "../../reduxStore/user-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../reduxStore/store";
import {IUser} from "../../models/IUser";
import Button from "../../common/button/Button";
import {actions, setRoleToUser} from "../../reduxStore/role-reducer";

interface RoleRequestListProps {
    getAllUsers: () => void,
    setRoleToUser: (user: IUser, newRole: string) => void,
    users: IUser[],
    changeUserRoleRequest: (userId: string) => void,
    roleAdded: boolean | null
}

const RoleRequestList: FC<RoleRequestListProps> = ({getAllUsers, setRoleToUser, users, changeUserRoleRequest, roleAdded}) => {

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div>
            {users.map(user => user.isRoleRequest ? <div key={user._id} style={{ borderRadius: '10px', border: '1px solid #000', width: '220px', textAlign: 'left'}}>
               <div style={{padding: '20px 20px 0 20px'}}>
                   <div>
                       {user.name}
                   </div>
                   <div>
                       {user.username}
                   </div>
               </div>
                {<Button width={200} onClick={() => {
                    setRoleToUser(user, 'PROFESSOR');
                    changeUserRoleRequest(user._id);
                }}>Add role</Button>}
                {roleAdded && <div style={{fontSize: '14px', textAlign: 'center', margin: '0 auto', padding: '10px 20px 20px 20px'}}>Role was added</div>}
            </div> : null)}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.user.usersList,
        roleAdded: state.role.roleAdded
    }
}

export default connect(mapStateToProps, {getAllUsers, setRoleToUser, changeUserRoleRequest, setRoleAdded: actions.setRoleAdded})(RoleRequestList);
