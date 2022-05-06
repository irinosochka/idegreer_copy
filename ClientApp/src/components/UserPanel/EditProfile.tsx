import React, {FC, useEffect, useState} from 'react';

import "./userPanel.css"
import Button from "../../common/button/Button";
import Message, {MessageType} from "../../common/Messages/Message";
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {actions, userDataChanging} from "../../reduxStore/auth-reducer";
import {changePhoto} from "../../reduxStore/file-reducer";
import {IUser} from "../../models/IUser";

interface EditProfileProps {
    authUser: IUser,
    setUserDataChangingSuccess: (bool: boolean) => void,
    userDataChanging: (formData: FormData) => void
    userDataChangingError: boolean,
    userDataChangedSuccess: boolean,
    setUserDataChangingError: (bool: boolean) => void
}

const EditProfile: FC<EditProfileProps> = ({
                                               authUser,
                                               setUserDataChangingSuccess,
                                               userDataChanging,
                                               userDataChangingError,
                                               userDataChangedSuccess,
                                               setUserDataChangingError
                                           }) => {

    const [name, setName] = useState(authUser.name);
    const [username, setUsername] = useState(authUser.username);
    const [email, setEmail] = useState(authUser.email);
    const [isError, setError] = useState(false);
    const [image, setImage] = useState<File>()

    useEffect(() => {
        return () => setUserDataChangingSuccess(false)
    }, [])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('userImage', image!)
        formData.append('username', authUser.username)
        formData.append('newUsername', username)
        formData.append('newName', name)
        formData.append('newEmail', email)
        if (username.length !== 0 && name.length !== 0 && email.length !== 0) {
            userDataChanging(formData);
            changePhoto(formData);
        } else {
            setError(true);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {userDataChangingError && <Message type={MessageType.ERROR}>User with this username or email actually exists</Message>}
                {userDataChangedSuccess && <Message type={MessageType.SUCCESS}>Success data changing</Message>}
                <div className="input-wrapper">
                    <input type="text" id="input" className="form-control" placeholder="Full name:"
                           onChange={(event) => {
                               setName(event.target.value);
                               setError(false);
                               setUserDataChangingError(false);
                               setUserDataChangingSuccess(false);
                           }}
                           value={name}
                    /><label htmlFor="input" className="control-label">Full name:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" id="input" className="form-control" placeholder="Username:"
                        onChange={(event) => {
                            setUsername(event.target.value);
                            setError(false);
                            setUserDataChangingError(false);
                            setUserDataChangingSuccess(false);
                        }}
                        value={username}
                    /><label htmlFor="input" className="control-label">Username:</label>
                </div>
                <div className="input-wrapper" style={{marginBottom: '10px'}}>
                    <input type="email" id="input" className="form-control" placeholder="Email:"
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setError(false);
                            setUserDataChangingError(false);
                            setUserDataChangingSuccess(false);
                        }}
                        value={email}
                    /><label htmlFor="input" className="control-label">Email:</label>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <label htmlFor="uploadButton" className="uploadButton">
                        Choose the photo
                    </label>
                    <span style={{fontSize: '14px', paddingLeft: '10px'}}>{image ? image!.name : ''}</span>
                    <input className="uploadButton" id="uploadButton" style={{display: 'none'}} name={'userImage'}
                           type={"file"}
                           onChange={(event) => {
                               setImage(event.target!.files![0]);
                               setError(false);
                               setUserDataChangingError(false);
                               setUserDataChangingSuccess(false);
                           }}/>
                </div>
                <div>
                    <Button width={240}>Submit changes</Button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        userDataChangingError: state.auth.userDataChangingError,
        userDataChangedSuccess: state.auth.userDataChangedSuccess
    }
}

export default connect(mapStateToProps, {
    userDataChanging, changePhoto,
    setUserDataChangingError: actions.setUserDataChangingError,
    setUserDataChangingSuccess: actions.setUserDataChangingSuccess
})(EditProfile);
