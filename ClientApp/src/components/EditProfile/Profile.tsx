import React, {useContext} from 'react';
import {Context} from "../../index";

import "./index.css"
import {observer} from "mobx-react-lite";

const Profile = () => {
    const {store} = useContext(Context);

    function initial() {
        if (store.isAuth && store.user.name) {
            var splits = store.user.name.split(" ");
            var stringResult = "";

            for (let i = 0; i < splits.length; i++) {
                let Name = splits[i];
                let First = Name.substr(0, 1).toUpperCase();
                stringResult += First;
            }
            return stringResult;
        }
    }

    return (
        <div className="profile" style={{textAlign: 'center', verticalAlign: 'middle', paddingTop: '20px'}}>

            <div style={{display: 'inline-block'}}>
                <div className="profile__icon">
                    <p style={{margin: 'auto'}}>
                        {initial()}
                    </p>
                </div>
            </div>

            <p className="profile__title" style={{paddingTop: '20px'}}>{store.user.name}</p>

            <div style={{background: '#4d6243', color: 'white', display: 'inline-block', padding: '20px', margin: '20px 0'}}>

                <p className="profile__title" style={{paddingBottom: '20px', fontWeight: 'inherit'}}>About me</p>
                <p className="profile__info">Proin vulputate arcu tellus, venenatis suscipit libero ullamcorper ac. Phasellus rhoncus aliquet gravida. Donec quis interdum nulla. Nullam porttitor eros ut lectus pulvinar vehicula. Pellentesque a eros ipsum. Sed pellentesque augue purus, ut posuere magna bibendum a. Fusce non luctus nisl.</p>

            </div>

            <p className="profile__subtitle">Email:</p>
            <p className="profile__info">{store.user.email}</p>
            <p className="profile__subtitle">Username:</p>
            <p className="profile__info">{store.user.username}</p>


        </div>
    );
};

export default observer(Profile);
