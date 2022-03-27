import React, {FC} from 'react';

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
                padding: '16px',
                background: '#fff',
            }}>
                <img src={icon} style={{width: '20px', height: '20px'}} alt=""/>
            </div>
            <button style={{textAlign: 'left', fontSize: '15px', paddingLeft: '30px', textTransform: 'initial'}}>{children}</button>
        </div>
    );
};

export default EditProfileButton;
