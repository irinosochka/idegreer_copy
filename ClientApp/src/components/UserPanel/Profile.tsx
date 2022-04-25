import React, {FC, useEffect, useState} from 'react';

import "./userPanel.css"
import PhotoMockup, {sizeTypes} from "../../common/photoMockup/PhotoMockup";
import {connect} from "react-redux";
import {AppStateType} from "../../reduxStore/store";
import {getPhoto} from "../../reduxStore/file-reducer";
import {IUser} from "../../models/IUser";
import {actions, roleRequest} from "../../reduxStore/role-reducer";
import {actions as authActions} from "../../reduxStore/auth-reducer";
import Message, {MessageType} from "../../common/Messages/Message";
import Button from "../../common/button/Button";
import {ICourse} from "../../models/ICourse";
import EditProfile from "./EditProfile";
import editPhoto from "../../assets/img/edit-svgrepo-com.svg"

interface ProfileProps {
    authUser: IUser,
    getPhoto: (photo: string) => void,
    roleRequest: (userId: string) => void,
    rolePleaserSuccess: boolean,
    setRolePleasedSuccess: (bool: boolean) => void,
    courses: ICourse[],
    setRequestToRole: (bool: boolean) => void
}

const Profile: FC<ProfileProps> = ({authUser, roleRequest, rolePleaserSuccess, setRolePleasedSuccess, courses, setRequestToRole}) => {
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        return () => setRolePleasedSuccess(false);
    }, [])

    const handleEdit = () => {
        if (isEditProfile)
            setIsEditProfile(false);
        else {
            setIsEditProfile(true)
        }
    }

    return (
        <>
            <div className="profile" style={{textAlign: 'start', display: 'flex'}}>
                <div className="photo__wrapper">
                    <PhotoMockup size={sizeTypes.large}/>
                    <div className="edit__pencil__btn">
                        <img style={{width: '70%', }} src={editPhoto} alt=""/>
                    </div>
                </div>
                <div style={{padding: '10px 0 0 20px', width: '550px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <p className="profile__title">{authUser.name}</p>
                            <p className="profile__subtitle">Proin vulputate arcu tellus venenatis.</p>
                        </div>
                        <div style={{marginTop: '0'}}>
                            <Button width={200} onClick={() => handleEdit()}>Edit Profile</Button>
                        </div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <p className="profile__info">{authUser.email}</p>
                        <p className="profile__info">{authUser.username}</p>
                    </div>
                    {buttonVisible && !authUser.isRoleRequest && authUser.roles && authUser.roles.length === 1
                        && authUser.roles.includes('STUDENT') &&
                        <div className="profile__subtitle" style={{marginTop: '15px', fontSize: '15px'}}>
                            Do you want to be as professor?
                            <span onClick={() => {
                                roleRequest(authUser._id);
                                setRequestToRole(true);
                                setButtonVisible(false)
                            }} style={{fontSize: '16px', color: 'orange', cursor: 'pointer'}}>Try it!</span>
                        </div>}
                    <div style={{marginTop: '15px'}}>{rolePleaserSuccess && <span style={{fontSize: '14px'}}><Message
                        type={MessageType.SUCCESS}>Request was sended</Message></span>}</div>
                </div>
                <div style={{position: "relative"}}>
                    {isEditProfile && <EditProfile/>}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        rolePleaserSuccess: state.role.rolePleaserSuccess,
        courses: state.course.courses
    }
}

export default connect(mapStateToProps, {
    getPhoto,
    roleRequest,
    setRolePleasedSuccess: actions.setRolePleasedSuccess,
    setRequestToRole: authActions.setRequestToRole
})(Profile);
