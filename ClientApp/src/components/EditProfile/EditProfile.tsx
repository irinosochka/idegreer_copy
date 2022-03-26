import React, {FC, useEffect, useState} from 'react';

import "./index.css"
import Button from "../../common/button/Button";
import Message, {MessageType} from "../../common/Messages/Message";
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {actions} from "../../reduxStore/user-reducer";
import {userDataChanging} from "../../reduxStore/auth-reducer";
import {changePhoto} from "../../reduxStore/file-reducer";
import {IUser} from "../../models/IUser";

interface EditProfileProps {
    authUser: IUser,
    setUserDataChangingSuccess: (bool: boolean) => void,
    userDataChanging: (authUser: IUser, username: string, name: string, email: string) => void
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
        formData.append('file', image!)
        if (username.length !== 0 && name.length !== 0 && email.length !== 0) {
            userDataChanging(authUser, username, name, email);
            changePhoto(formData)
        } else {
            setError(true);
        }
    };


    return (
        <div className="editProfileContainer">
            {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
            {userDataChangingError &&
                <Message type={MessageType.ERROR}>User with this username or email actually exists</Message>}
            {userDataChangedSuccess && <Message type={MessageType.SUCCESS}>Success data changing</Message>}
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => {
                        setName(event.target.value);
                        setError(false);
                        setUserDataChangingError(false);
                        setUserDataChangingSuccess(false);
                    }}
                    value={name}
                    type="text"
                    placeholder={authUser.name}
                />
                <input
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setError(false);
                        setUserDataChangingError(false);
                        setUserDataChangingSuccess(false);
                    }}
                    value={username}
                    type="text"
                    placeholder={authUser.username}
                />
                <input
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setError(false);
                        setUserDataChangingError(false);
                        setUserDataChangingSuccess(false);
                    }}
                    value={email}
                    type="email"
                    placeholder={authUser.email}
                />
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <label htmlFor="uploadButton" className="uploadButton">
                        Choose the photo
                    </label>
                    <span style={{fontSize: '14px', paddingLeft: '10px'}}>{image ? image!.name : ''}</span>
                </div>
                <input className="uploadButton" id="uploadButton" style={{visibility: "hidden"}} type={"file"}
                       onChange={(event) => {
                           setImage(event.target!.files![0]);
                           setError(false);
                           setUserDataChangingError(false);
                           setUserDataChangingSuccess(false);
                       }}/>
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
        userDataChangingError: state.user.userDataChangingError,
        userDataChangedSuccess: state.user.userDataChangedSuccess
    }
}

export default connect(mapStateToProps, {
    userDataChanging, changePhoto,
    setUserDataChangingError: actions.setUserDataChangingError,
    setUserDataChangingSuccess: actions.setUserDataChangingSuccess
})(EditProfile);
