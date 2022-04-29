import React, {FC} from 'react';

import "../userPanel.css"

import {AppStateType} from "../../../reduxStore/store";
import {ICourse} from "../../../models/ICourse";
import {connect} from "react-redux";

interface NotificationsProps {
    courses: Array<ICourse>
}

const Notifications: FC<NotificationsProps> = ({courses}) => {

    return (
        <div style={{background: '#8691ca', borderRadius: '10px', margin: '10px', padding: '20px', color: '#fff'}}>

                <h3 style={{fontSize: '22px',marginBottom: '10px', fontWeight: '500', letterSpacing: '0.8px'}}>Notifications:</h3>
                {courses.map(c => {
                    if(c.wasChanged) {
                        return <p style={{fontSize: '18px', marginLeft: '10px'}}>Course {c.title} was changed</p>
                    }
                })}

        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.userCourses,
    }
}

export default connect(mapStateToProps, {}) (Notifications);
