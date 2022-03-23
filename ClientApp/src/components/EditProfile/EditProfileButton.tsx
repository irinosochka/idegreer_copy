import React, {FC} from 'react';
// @ts-ignore
import profileIcon from "../../assets/img/user-profile-svgrepo-com.svg";
import {UserPageSlidesItems} from "../../pages/UserPage";

interface EditProfileButtonProps {
    icon: string,
    slideItem: UserPageSlidesItems,
    onClick: () => any,
    isActive: boolean
}

const EditProfileButton: FC<EditProfileButtonProps> = ({icon, isActive, slideItem, onClick, children}) => {
    return (
        <div className={`edit__btn ${isActive && 'active'}`}
             style={{display: 'flex', alignItems: 'center', marginTop: '30px'}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50px',
                padding: '15px',
                background: '#fff',
            }}>
                <img src={icon} style={{width: '20px', height: '20px'}} alt=""/>
            </div>
            <button onClick={onClick}>{children}</button>
        </div>
    );
};

export default EditProfileButton;
