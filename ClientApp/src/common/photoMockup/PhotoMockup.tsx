import React, {FC} from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../reduxStore/store";
import {IUser} from "../../models/IUser";

export enum sizeTypes {
    small = '50px',
    large = '140px'
}

interface PhotoMockupProps {
    size: sizeTypes,
    isAuth: boolean,
    authUser: IUser,
    photo: { path: string} | null
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
                backgroundColor: '#6675bc',
                width: size,
                height: size,
                cursor: 'pointer',
                display: 'flex',
                marginRight: '10px',
                margin: size === sizeTypes.large ? '0 auto' : '0',
                fontSize: size === sizeTypes.large ? '40px' : '15px',
                border: '1px solid #fff'
            }}>
                {photo && photo.path ? <img src={`http://localhost:5000/uploads/${photo.path.slice(8)}`} alt="avatar"
                              style={{borderRadius: '50%', height: size, width: size}}/> :
                    <h2 style={{margin: 'auto', color: '#e6ebff', fontWeight: 400}}>
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
        photo: state.auth.authUser.image
    }
}

export default connect(mapStateToProps, {})(PhotoMockup);
