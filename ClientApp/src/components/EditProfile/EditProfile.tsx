import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";

import "./index.css"
import {observer} from "mobx-react-lite";
import Button from "../../common/button/Button";
import Message, {MessageType} from "../../common/Messages/Message";

const EditProfile = () => {
    const {store} = useContext(Context);

    const [name, setName] = useState(store.authUser.name);
    const [username, setUsername] = useState(store.authUser.username);
    const [email, setEmail] = useState(store.authUser.email);
    const [isError, setError] = useState(false);
    const [image, setImage] = useState<File>()

    useEffect(() => {
        return () => store.setUserDataChangingSuccess(false)
    }, [])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', image!)
        if (username.length !== 0 && name.length !== 0 && email.length !== 0) {
            store.userDataChanging(username, name, email);
            store.changePhoto(formData)
        } else {
            setError(true);
        }
    };


    return (
        <div className="editProfileContainer">
            {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
            {store.userDataChangingError &&
                <Message type={MessageType.ERROR}>User with this username or email actually exists</Message>}
            {store.userDataChangedSuccess && <Message type={MessageType.SUCCESS}>Success data changing</Message>}
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => {
                        setName(event.target.value);
                        setError(false);
                        store.setUserDataChangingError(false);
                        store.setUserDataChangingSuccess(false);
                    }}
                    value={name}
                    type="text"
                    placeholder={store.authUser.name}
                />
                <input
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setError(false);
                        store.setUserDataChangingError(false);
                        store.setUserDataChangingSuccess(false);
                    }}
                    value={username}
                    type="text"
                    placeholder={store.authUser.username}
                />
                <input
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setError(false);
                        store.setUserDataChangingError(false);
                        store.setUserDataChangingSuccess(false);
                    }}
                    value={email}
                    type="email"
                    placeholder={store.authUser.email}
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
                           store.setUserDataChangingError(false);
                           store.setUserDataChangingSuccess(false);
                       }}/>
                <div>
                    <Button width={240}>Submit changes</Button>
                </div>
            </form>
        </div>
    );
};

export default observer(EditProfile);
