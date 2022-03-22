import React, {useContext} from 'react';
import {Context} from "../../index";

import "./index.css"
import {observer} from "mobx-react-lite";
import PhotoMockup, {sizeTypes} from "../../common/photoMockup/PhotoMockup";
import Button from "../../common/button/Button";

const Profile = () => {
    const {store} = useContext(Context);

    const profMode = () => {
        if(store.authUser.roles.includes('STUDENT')){
            store.setRoleToUser('PROFESSOR')
        }
    };
    return (
        <div className="profile" style={{textAlign: 'center', verticalAlign: 'middle', paddingTop: '20px'}}>
            <div style={{display: 'inline-block'}}>
                    <PhotoMockup  size={sizeTypes.large}/>
            </div>
            <p className="profile__title" style={{paddingTop: '20px'}}>{store.authUser.name}</p>

            <div style={{padding: '20px', margin: '20px 0', borderRadius: '40px 10px', border: '1px solid #ee9a46'}}>

                <p className="profile__title" style={{paddingBottom: '20px', fontWeight: 'inherit'}}>About me</p>
                <p className="profile__info">Proin vulputate arcu tellus, venenatis suscipit libero ullamcorper ac. Phasellus rhoncus aliquet gravida. Donec quis interdum nulla. Nullam porttitor eros ut lectus pulvinar vehicula. Pellentesque a eros ipsum. Sed pellentesque augue purus, ut posuere magna bibendum a. Fusce non luctus nisl.</p>
            </div>
            <p className="profile__subtitle">Email:</p>
            <p className="profile__info">{store.authUser.email}</p>
            <p className="profile__subtitle">Username:</p>
            <p className="profile__info">{store.authUser.username}</p>


            {store.authUser.roles && !store.authUser.roles.includes('PROFESSOR') &&
            <div >
                <Button width={300} onClick={profMode}>To be as professor</Button>
            </div>
            }

        </div>
    );
};

export default observer(Profile);
