import React, {useContext, useEffect, useState} from 'react';

import {observer} from "mobx-react-lite";
import "./index.css";
// @ts-ignore
import editIcon from "../../assets/img/edit-svgrepo-com.svg"
// @ts-ignore
import addIcon from "../../assets/img/add-svgrepo-com.svg"
import {Context} from "../../index";
import {IUser} from "../../models/IUser";



const AddRole: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        store.getAllUsers()
    }, []);

    const {store} = useContext(Context);

    const addRole = (user: IUser) => {
        store.setRoleToUser(user._id, 'PROFESSOR')
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
                {showUsers && store.usersList.length?.length === 0 && (
                    <div className="notFound">No User Found</div>
                )}

                {store.usersList?.filter((user: IUser ) => {
                    if (searchTerm == "") {
                        return user;
                    } else if(user.username.toLowerCase().includes(searchTerm.toLowerCase())){
                        return user;
                    }
                }).map((user: IUser) => {
                    return(
                        <div className="body__item" key={user._id}>
                            <div>
                                <h3>Username: {user?.username}</h3>
                                <p>Name: {user?.name}</p>
                                <p>Email: {user?.email}</p>
                            </div>
                            <div>
                                <div style={{cursor: 'pointer'}}
                                     onClick={() => {addRole(user)}}>
                                    <img src={addIcon} style={{color: '#fff', width: '15px', height: '15px'}}  alt=""/>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    )
}

export default observer(AddRole);
