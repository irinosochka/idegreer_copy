import React from 'react';

import "../userPanel.css"
import ProfileSection from "./ProfileSection";
import Notifications from "./Notifications";


const RightMenu = () => {

    return (
        <>
            <ProfileSection />
            <Notifications />
        </>
    );
};


export default RightMenu;
