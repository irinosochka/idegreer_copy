import React, {FC} from 'react';
// @ts-ignore
import profileIcon from "../../assets/img/user-profile-svgrepo-com.svg";

interface EditProfileButtonProps {
    icon: string,
    onClick: () => any,
    isActive: boolean
}

const EditProfileButton: FC<EditProfileButtonProps> = ({icon, isActive, onClick, children}) => {
    return (
        <div className={`edit__btn ${isActive && 'active'}`}
             style={{display: 'flex', alignItems: 'center', marginTop: '30px', cursor: 'pointer'}}  onClick={onClick}>
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
            <button>{children}</button>
        </div>
    );
};

export default EditProfileButton;
