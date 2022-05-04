import React, {FC, useEffect, useState} from 'react';

import "../userPanel.css"
import PhotoMockup, {sizeTypes} from "../../../common/photoMockup/PhotoMockup";
import {connect} from "react-redux";
import {AppStateType} from "../../../reduxStore/store";
import {getPhoto} from "../../../reduxStore/file-reducer";
import {IUser} from "../../../models/IUser";
import {actions, roleRequest} from "../../../reduxStore/role-reducer";
import {actions as authActions} from "../../../reduxStore/auth-reducer";
import Message, {MessageType} from "../../../common/Messages/Message";
import EditProfile from "../EditProfile";
import ChangePassword from "../ChangePassword";
import {ICourse} from "../../../models/ICourse";
import editPhoto from "../../../assets/img/edit-svgrepo-com.svg";
import changePassword from "../../../assets/img/password-svgrepo-com.svg";

import closeIcon from "../../../assets/img/close-svgrepo-com.svg";

interface ProfileProps {
    authUser: IUser,
    getPhoto: (photo: string) => void,
    roleRequest: (userId: string) => void,
    rolePleaserSuccess: boolean,
    setRolePleasedSuccess: (bool: boolean) => void,
    setRequestToRole: (bool: boolean) => void,
    courses: Array<ICourse>
}

const ProfileSection: FC<ProfileProps> = ({authUser, courses, roleRequest, rolePleaserSuccess, setRolePleasedSuccess, setRequestToRole}) => {
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isProfileInfo, setProfileInfo] = useState(true);
    const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        return () => setRolePleasedSuccess(false);
    }, [])

    const handleEdit = () => {
        if (isEditProfile) {
            setIsEditProfile(false);
            setProfileInfo(true);
        }
        else {
            setIsEditProfile(true);
            setIsChangePassword(false);
            setProfileInfo(false);
        }
    }

    const handleChangePassword = () => {
        if (isChangePassword) {
            setIsChangePassword(false);
            setProfileInfo(true);
        }
        else {
            setIsChangePassword(true);
            setIsEditProfile(false);
            setProfileInfo(false);
        }
    }

    const handleClose = () => {
        setProfileInfo(true);
        setIsEditProfile(false);
        setIsChangePassword(false);
    }

    return (
        <div style={{background: '#6675bc', borderRadius: '10px', margin: '10px', padding: '10px', color: '#fff'}}>
            <div style={{textAlign: 'end', marginTop: '5px'}}>
                <img style={{width: '20px', margin: '0 10px', transform: 'scale(-1,1)' }} src={editPhoto} alt="" onClick={handleEdit}/>
                <img style={{width: '20px', margin: '0 10px'}} src={changePassword} alt="" onClick={handleChangePassword}/>
                { (isEditProfile || isChangePassword) && <img style={{width: '18px', margin: '0 10px'}} src={closeIcon} alt="" onClick={handleClose}/>}
            </div>
            <div style={{margin: '20px 0'}}>
                {isProfileInfo && <>
                    <div className="photo__wrapper">
                        <PhotoMockup size={sizeTypes.large}/>
                    </div>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px'}}>
                            <p className="profile__title">{authUser.name}</p>
                            {/*<p className="profile__subtitle">Proin vulputate arcu tellus venenatis.</p>*/}
                            <div style={{display: 'flex'}}>
                                <p className="profile__info">{authUser.username}</p>
                                <p className="profile__info">{authUser.email}</p>
                            </div>
                            {buttonVisible && !authUser.isRoleRequest && authUser.roles && authUser.roles.length === 1
                            && authUser.roles.includes('STUDENT') &&
                            <div style={{marginTop: '15px', fontSize: '15px'}}>
                                Do you want to be as professor?
                                <span onClick={() => {
                                    roleRequest(authUser._id);
                                    setRequestToRole(true);
                                    setButtonVisible(false)
                                }} style={{fontSize: '16px', cursor: 'pointer', textDecoration: 'underline'}}>Try it!</span>
                            </div>}
                            <div style={{marginTop: '15px'}}>{rolePleaserSuccess && <span style={{fontSize: '14px'}}><Message
                                type={MessageType.SUCCESS}>Request was sended</Message></span>}</div>
                        </div>
                    </div>
                </>}

                {isEditProfile && <EditProfile/>}
                {isChangePassword && <ChangePassword/>}
            </div>


        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        rolePleaserSuccess: state.role.rolePleaserSuccess,
        courses: state.course.userCourses,
    }
}

export default connect(mapStateToProps, {
    getPhoto,
    roleRequest,
    setRolePleasedSuccess: actions.setRolePleasedSuccess,
    setRequestToRole: authActions.setRequestToRole
})(ProfileSection);
