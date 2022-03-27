import React, {FC, useEffect, useState} from 'react';

import "./userPanel.css"
import PhotoMockup, {sizeTypes} from "../../common/photoMockup/PhotoMockup";
import {connect} from "react-redux";
import {AppStateType} from "../../reduxStore/store";
import {getPhoto} from "../../reduxStore/file-reducer";
import {IUser} from "../../models/IUser";
import {actions, roleRequest} from "../../reduxStore/role-reducer";
import Message, {MessageType} from "../../common/Messages/Message";

interface ProfileProps {
    authUser: IUser,
    getPhoto: (photo: string) => void,
    roleRequest: (userId: string) => void,
    rolePleaserSuccess: boolean,
    setRolePleasedSuccess: (bool: boolean) => void
}

const Profile: FC<ProfileProps> = ({getPhoto, authUser, roleRequest, rolePleaserSuccess, setRolePleasedSuccess}) => {

    const [buttonVisible, setButtonVisible] = useState(true)

    useEffect(() => {
        getPhoto('1648243003706-idegreer-visuals_produktlinie_men_560x420.jpg')
    }, [])
    return (
        <div className="profile" style={{textAlign: 'center', verticalAlign: 'middle', paddingTop: '20px', width: '600px', margin: '0 auto'}}>
            <div style={{display: 'inline-block'}}>
                <PhotoMockup size={sizeTypes.large}/>
            </div>
            <p className="profile__title" style={{paddingTop: '20px'}}>{authUser.name}</p>

            <div style={{padding: '20px', margin: '20px 0', borderRadius: '40px 10px', border: '1px solid #ee9a46'}}>

                <p className="profile__title" style={{paddingBottom: '20px', fontWeight: 'inherit'}}>About me</p>
                <p className="profile__info">Proin vulputate arcu tellus, venenatis suscipit libero ullamcorper ac.
                    Phasellus rhoncus aliquet gravida. Donec quis interdum nulla. Nullam porttitor eros ut lectus
                    pulvinar vehicula. Pellentesque a eros ipsum. Sed pellentesque augue purus, ut posuere magna
                    bibendum a. Fusce non luctus nisl.</p>
            </div>
            <p className="profile__subtitle">Email:</p>
            <p className="profile__info">{authUser.email}</p>
            <p className="profile__subtitle">Username:</p>
            <p className="profile__info">{authUser.username}</p>

            {buttonVisible && !authUser.isRoleRequest && authUser.roles && authUser.roles.length === 1
                && authUser.roles.includes('STUDENT') &&
                <div style={{marginTop: '40px', fontSize: '15px'}}>
                    Do you want to be as professor? <span onClick={() => {
                    roleRequest(authUser._id);
                    setButtonVisible(false)
                    setTimeout(() => setRolePleasedSuccess(false), 2000)}} style={{fontSize: '16px', color: 'orange', cursor: 'pointer'}}>Try it!</span>
                </div>}
            <div style={{marginTop: '40px'}}>{rolePleaserSuccess && <span style={{fontSize: '14px'}}><Message type={MessageType.SUCCESS}>Request was sended</Message></span>}</div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        rolePleaserSuccess: state.role.rolePleaserSuccess
    }
}

export default connect(mapStateToProps, {getPhoto, roleRequest, setRolePleasedSuccess: actions.setRolePleasedSuccess})(Profile);
