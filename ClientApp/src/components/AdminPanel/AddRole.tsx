import React, {useEffect, useState} from 'react';

import "./index.css";
// @ts-ignore
import editIcon from "../../assets/img/edit-svgrepo-com.svg"
// @ts-ignore
import addIcon from "../../assets/img/add-svgrepo-com.svg"
import {IUser} from "../../models/IUser";
import {connect} from "react-redux";
import {AppStateType} from "../../reduxStore/store";
import {setRoleToUser} from "../../reduxStore/role-reducer";
import {getAllUsers} from "../../reduxStore/user-reducer";


interface AddRoleProps {
    getAllUsers: () => void,
    usersList: IUser[]
}

const AddRole: React.FC<AddRoleProps> = ({getAllUsers, usersList}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        getAllUsers()
    }, []);

    const addRole = (user: IUser) => {
        setRoleToUser(user, 'PROFESSOR')
    };

    return (
        <div>
            <div>
                <h1>Add professor role</h1>
            </div>
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
                        <div className="body__item" key={user._id}>
                            <div>
                                <h3>Username: {user?.username}</h3>
                                <p>Name: {user?.name}</p>
                                <p>Email: {user?.email}</p>
                            </div>
                            <div>
                                <div style={{cursor: 'pointer'}}
                                     onClick={() => {
                                         addRole(user)
                                     }}>
                                    <img src={addIcon} style={{color: '#fff', width: '15px', height: '15px'}} alt=""/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        usersList: state.user.usersList,
    }
}

export default connect(mapStateToProps, {setRoleToUser, getAllUsers})(AddRole);
