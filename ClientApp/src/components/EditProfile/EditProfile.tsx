import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";

import "./index.css"
import {observer} from "mobx-react-lite";
import Button from "../../common/Button/Button";
import Message, {MessageType} from "../../common/Messages/Message";

const EditProfile = () => {
    const {store} = useContext(Context);

    const [name, setName] = useState(store.authUser.name);
    const [username, setUsername] = useState(store.authUser.username);
    const [email, setEmail] = useState(store.authUser.email);
    const [isError, setError] = useState(false);
    const [image, setImage] = useState('')

    useEffect(() => {
        return () => store.setUserDataChangingSuccess(false)
    }, [])

    const handleSubmit = (event :any) => {
        event.preventDefault();

        if (username.length !== 0 && name.length !== 0 && email.length !== 0) {
            store.userDataChanging(username, name, email);
        } else {
            setError(true);
        }
    };

    return (
        <div className="editProfileContainer">
            {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
            {store.userDataChangingError && <Message type={MessageType.ERROR}>User with this username or email actually exists</Message>}
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
                    placeholder ={store.authUser.name}
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
                <input
                    onChange={(event) => {
                        setImage(event.target.value);
                        setError(false);
                        store.setUserDataChangingError(false);
                        store.setUserDataChangingSuccess(false);
                    }}
                    value={image}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                />
                <div>
                    <Button width={240}>Submit changes</Button>
                </div>
            </form>
        </div>
    );
};

export default observer(EditProfile);
