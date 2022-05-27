import React, {FC, useEffect, useState} from 'react';

import "../../UserPanel/userPanel.css"
import PhotoMockup, {sizeTypes} from "../../../common/photoMockup/PhotoMockup";
import {connect} from "react-redux";
import {AppStateType} from "../../../reduxStore/store";
import {getPhoto} from "../../../reduxStore/file-reducer";
import {IUser} from "../../../models/IUser";
import {actions, roleRequest} from "../../../reduxStore/role-reducer";
import {actions as authActions} from "../../../reduxStore/auth-reducer";
import Message, {MessageType} from "../../../common/Messages/Message";
import {ICourse} from "../../../models/ICourse";

interface ProfileProps {
    authUser: IUser,
    getPhoto: (photo: string) => void,
    roleRequest: (userId: string) => void,
    rolePleaserSuccess: boolean,
    setRolePleasedSuccess: (bool: boolean) => void,
    setRequestToRole: (bool: boolean) => void,
    courses: Array<ICourse>
}

const Profile: FC<ProfileProps> = ({authUser, roleRequest, rolePleaserSuccess, setRolePleasedSuccess, setRequestToRole}) => {

    const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        return () => setRolePleasedSuccess(false);
    }, [])


    return (
        <>
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
        </>
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
})(Profile);
