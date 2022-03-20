import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import ErrorMessage from "../../common/Messages/ErrorMessage";

import "./index.css"
import {observer} from "mobx-react-lite";
import Button from "../../common/button/Button";

const EditProfile = () => {
    const {store} = useContext(Context);

    const [name, setName] = useState(store.user.name);
    const [username, setUsername] = useState(store.user.username);
    const [email, setEmail] = useState(store.user.email);
    const [isError, setError] = useState(false);
    const [image, setImage] = useState('')

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
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => {
                        setName(event.target.value);
                        setError(false);
                    }}
                    value={name}
                    type="text"
                    placeholder ={store.user.name}
                />
                <input
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setError(false);
                    }}
                    value={username}
                    type="text"
                    placeholder={store.user.username}
                />
                <input
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setError(false);
                    }}
                    value={email}
                    type="email"
                    placeholder={store.user.email}
                />
                <input
                    onChange={(event) => {
                        setImage(event.target.value);
                        setError(false);
                    }}
                    value={image}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                />
                <div className="save-reset__btn">
                    <Button width={240}>Submit changes</Button>
                </div>

                {isError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
            </form>
        </div>
    );
};

export default observer(EditProfile);