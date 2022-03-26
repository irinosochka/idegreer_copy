import React, {FC} from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../reduxStore/store";
import {IUser} from "../../models/IUser";

export enum sizeTypes {
    small = '90px',
    large = '140px'
}

interface PhotoMockupProps {
    size: sizeTypes,
    isAuth: boolean,
    authUser: IUser,
    photo: string
}

const PhotoMockup: FC<PhotoMockupProps> = ({size, photo, authUser, isAuth}) => {


    const initial = () => {
        if (isAuth && authUser.name) {
            const splits = authUser.name.split(" ");
            let stringResult = "";

            for (let i = 0; i < splits.length; i++) {
                let name = splits[i];
                let first = name.substr(0, 1).toUpperCase();
                stringResult += first;
            }
            return stringResult;
        }
    };


    return (
        <>
            <div style={{
                borderRadius: '50%',
                backgroundColor: '#ee9a46',
                width: size,
                height: size,
                cursor: 'pointer',
                display: 'flex',
                marginRight: '10px',
                margin: '0 auto',
                fontSize: size === sizeTypes.large ? '40px' : 'normal'
            }}>
                {photo ? <img src={"data:image/png;base64," + photo} alt="avatar" style={{borderRadius: '50%', height: size, width: size}}/> :
                    <h2 style={{margin: 'auto', color: '#4d6243', fontWeight: 400}}>
                        {initial()}
                    </h2>}
            </div>
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        authUser: state.auth.authUser,
        photo: state.file.photo
    }
}

export default connect(mapStateToProps, {})(PhotoMockup);
