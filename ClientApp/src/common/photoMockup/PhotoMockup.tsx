import React, {FC, useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

export enum sizeTypes {
    small = '90px',
    large = '140px'
}

interface PhotoMockupProps {
    size: sizeTypes
}

const PhotoMockup: FC<PhotoMockupProps> = ({size}) => {

    const {store} = useContext(Context)



    const initial = () => {
        if (store.isAuth && store.authUser.name) {
            const splits = store.authUser.name.split(" ");
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
                {store.photo ? <img src={"data:image/png;base64," + store.photo} alt="avatar" style={{borderRadius: '50%', height: size, width: size}}/> :
                    <h2 style={{margin: 'auto', color: '#4d6243', fontWeight: 400}}>
                        {initial()}
                    </h2>}
            </div>
        </>
    );
};

export default observer(PhotoMockup);
