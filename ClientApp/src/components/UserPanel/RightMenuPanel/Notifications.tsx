import React, {FC} from 'react';

import "../userPanel.css"

import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";

interface NotificationsProps {
    notifications: Array<any>
}

const Notifications: FC<NotificationsProps> = ({ notifications}) => {

    return (
        <div style={{background: '#8691ca', borderRadius: '10px', margin: '10px', padding: '20px', color: '#fff', height: '100%', maxHeight: '300px',
            overflowY: 'scroll'}}>

                <h3 style={{fontSize: '22px',marginBottom: '10px', fontWeight: '500', letterSpacing: '0.8px'}}>Notifications:</h3>
            {notifications.map(n => {
                return <p key={n._id} style={{fontSize: '18px', marginLeft: '10px'}}>{n.date} | Course {n.courseId} was changed: {n.type}</p>
            })}
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        notifications: state.user.userNotifications
    }
}

export default connect(mapStateToProps, {}) (Notifications);
