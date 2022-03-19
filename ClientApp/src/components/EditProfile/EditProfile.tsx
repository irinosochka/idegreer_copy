import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import ErrorMessage from "../../common/Messages/ErrorMessage";

import "./index.css"

const EditProfile = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isError, setError] = useState(false);
    const [image, setImage] = useState('')

    const {store} = useContext(Context);

    const handleSubmit = (event :any) => {
        event.preventDefault();

        if (username.length !== 0 && name.length !== 0 && email.length !== 0) {
            console.log(username, name, email, image);
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
                    placeholder =/*{store.user.name}*/"Name"
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
                    placeholder=/*{store.user.email}*/"Email"
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
                    <button className="reset__btn" type="reset"> Reset changes </button>
                    <button className="save__btn" type="submit"> Submit changes </button>
                </div>

                {isError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
            </form>
        </div>
    );
};

export default EditProfile;

