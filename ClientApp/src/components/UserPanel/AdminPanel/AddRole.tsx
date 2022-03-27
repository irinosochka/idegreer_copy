import React, {useEffect, useState} from 'react';

import "./adminPanel.css";
// @ts-ignore
import editIcon from "../../../assets/img/edit-svgrepo-com.svg"
// @ts-ignore
import addIcon from "../../../assets/img/add-svgrepo-com.svg"
import {IUser} from "../../../models/IUser";
import {connect} from "react-redux";
import {AppStateType} from "../../../reduxStore/store";
import {actions, setRoleToUser} from "../../../reduxStore/role-reducer";
import {getAllUsers, getUser} from "../../../reduxStore/user-reducer";
import Button from "../../../common/button/Button";


interface AddRoleProps {
    getAllUsers: () => void,
    usersList: IUser[],
    setRoleToUser: (user: IUser, newRole: string) => void,
    roleAdded: boolean,
    setRoleAdded: (bool: boolean) => void
}

const AddRole: React.FC<AddRoleProps> = ({getAllUsers, usersList, setRoleToUser, roleAdded, setRoleAdded}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser>();
    const [buttonVisible, setButtonVisible] = useState(true)

    useEffect(() => {
        getAllUsers()
    }, [usersList]);

    const handleSelectingUser = (user: IUser) => {
        setSelectedUser(user);
        setButtonVisible(true);
    };

    function handleAdding() {
        if(selectedUser && !selectedUser.roles.includes('PROFESSOR')){
            setRoleToUser(selectedUser, 'PROFESSOR')
        }
    }

    return (
        <div className="user__container"
        style={{display: 'flex'}}>
            <div style= {{display: 'inline-block'}}>
                <>
                    <h1>Add professor role</h1>
                </>
                <div className="input__wrapper">
                    <input type="text"
                           placeholder="Search user"
                           value={searchTerm}
                           onChange={e => {
                               setSearchTerm(e.target.value);
                               setShowUsers(!showUsers)
                           }}/>
                </div>

                <div className="body">
                    {showUsers && usersList.length === 0 && (
                        <div className="notFound">No User Found</div>
                    )}

                    {usersList?.filter((user: IUser) => {
                        if (searchTerm == "") {
                            return user;
                        } else if (user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return user;
                        }
                    }).map((user: IUser) => {
                        return (
                            <div className="body__item" key={user._id}
                                 onClick={() => {
                                     handleSelectingUser(user)
                                 }}>
                                        {user?.username}
                            </div>
                        )})}
                </div>
            </div>


            {selectedUser && <div>
                <div style={{display: 'flex', marginTop: '70px'}}>

                <div style={{alignContent: 'space-between', margin: '0 10px'}}>
                    <p className="user__title">Name:</p>
                    <p className="user__title">Email:</p>
                    <p className="user__title">Username:</p>
                    <p className="user__title">Role:</p>
                </div>

                <div style={{alignContent: 'space-between'}}>
                    <p className="user__info">{selectedUser?.name}</p>
                    <p className="user__info">{selectedUser?.email}</p>
                    <p className="user__info">{selectedUser?.username}</p>
                    <p className="user__info">{selectedUser?.roles.join(", ")}</p>
                </div>

                </div>

                {buttonVisible && !selectedUser.roles.includes('PROFESSOR') &&
                <div>
                    <Button onClick={() =>{
                        handleAdding();
                        setButtonVisible(false);
                        setTimeout(() => setRoleAdded(false), 4000)
                    }}>Make a professor</Button>
                </div>}
                <div style={{marginTop: '10px'}}>{roleAdded && <span style={{fontSize: '14px'}}>Role was added</span>}</div>
            </div>}
        </div>
    )}

const mapStateToProps = (state: AppStateType) => {
    return {
        usersList: state.user.usersList,
        roleAdded: state.role.roleAdded
    }
}

export default connect(mapStateToProps, {setRoleToUser, getAllUsers, getUser, setRoleAdded: actions.setRoleAdded})(AddRole);
