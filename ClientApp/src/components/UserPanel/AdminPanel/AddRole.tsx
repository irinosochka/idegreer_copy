import React, {useEffect, useState} from 'react';

import './adminPanel.css'
import {IUser} from "../../../models/IUser";
import {connect} from "react-redux";
import {AppStateType} from "../../../reduxStore/store";
import {actions, setRoleToUser} from "../../../reduxStore/role-reducer";
import {getAllUsers, getUser} from "../../../reduxStore/user-reducer";
import Button from "../../../common/button/Button";
import Message, {MessageType} from "../../../common/Messages/Message";
import SearchComponent from "../../../common/SearchComponent/SearchComponent";

interface AddRoleProps {
    getAllUsers: () => void,
    usersList: IUser[],
    setRoleToUser: (user: IUser, newRole: string) => void,
    roleAdded: boolean,
    setRoleAdded: (bool: boolean) => void
}

const AddRole: React.FC<AddRoleProps> = ({getAllUsers, usersList, setRoleToUser, roleAdded, setRoleAdded}) => {
    const [selectedUser, setSelectedUser] = useState<IUser>();
    const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        getAllUsers()
    }, [usersList]);

    function handleAdding() {
        if(selectedUser && !selectedUser.roles.includes('PROFESSOR')){
            setRoleToUser(selectedUser, 'PROFESSOR')
        }
    }



    return (
        <div className="body">
            <div className="user__container" style={{display: 'flex', flexDirection: 'column'}}>
                <h1>Add role</h1>
                <SearchComponent setSelected={setSelectedUser} list={usersList} getList={getAllUsers} />

                {selectedUser && <div className="infoUser_box" style={{width: '400px', marginTop: '50px',display: 'inline-block'}}>
                    <div className="infoUser__line">
                        <p className="user__title">Name:</p>
                        <p className="user__info">{selectedUser?.name}</p>
                    </div>
                    <div className="infoUser__line">
                        <p className="user__title">Email:</p>
                        <p className="user__info">{selectedUser?.email}</p>
                    </div>
                    <div className="infoUser__line">
                        <p className="user__title">Username:</p>
                        <p className="user__info">{selectedUser?.username}</p>
                    </div>
                    <div className="infoUser__line">
                        <p className="user__title">Role:</p>
                        <p className="user__info">{selectedUser?.roles.join(", ")}</p>
                    </div>
                    {buttonVisible && !selectedUser.roles.includes('PROFESSOR') && !selectedUser.roles.includes('ADMIN') &&
                    <div>
                        <Button onClick={() =>{
                            handleAdding();
                            setButtonVisible(false);
                            setTimeout(() => setRoleAdded(false), 4000)
                        }}>Make a professor</Button>
                    </div>}
                    <div style={{marginTop: '10px'}}>{roleAdded && <span style={{fontSize: '14px'}}><Message type={MessageType.SUCCESS}>Role was added</Message></span>}</div>
                </div>}
            </div>
        </div>
    )}

const mapStateToProps = (state: AppStateType) => {
    return {
        usersList: state.user.usersList,
        roleAdded: state.role.roleAdded
    }
}

export default connect(mapStateToProps, {setRoleToUser, getAllUsers, getUser, setRoleAdded: actions.setRoleAdded})(AddRole);
