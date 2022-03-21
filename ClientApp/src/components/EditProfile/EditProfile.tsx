import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import ErrorMessage from "../../common/Messages/ErrorMessage";

import "./index.css"
import {observer} from "mobx-react-lite";
import Button from "../../common/button/Button";

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
            {isError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
            {store.userDataChangingError && <ErrorMessage>User with this username or email actually exists</ErrorMessage>}
            {store.userDataChangedSuccess && <ErrorMessage>Success data changing</ErrorMessage>}
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
