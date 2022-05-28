import React, {useEffect} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";

import {getAllMembersFromCourse} from "../../../reduxStore/course-reducer";
import {IUser} from "../../../models/IUser";

interface CourseMembersListProps {
    selectedCourseId: string | undefined,
    members: Array<IUser>,
    getAllMembersFromCourse: (courseId: string) => void,
}

const CourseMembersList: React.FC< CourseMembersListProps> = ({selectedCourseId, getAllMembersFromCourse, members}) => {

    useEffect(() => {
        if(selectedCourseId) {
            getAllMembersFromCourse(selectedCourseId);
        }
    }, [])

    return (
        <div className={"edit__container"}>
            <div>{members.length !== 0 ? members.map((member :  IUser, index) => {
                return <div key={member._id}
                    style={{backgroundColor: '#8691ca', margin: '10px', padding: '12px', color: "#fff"}}><span style={{fontSize: '16px'}}>{index + 1}.</span> {member.name} - {member.email} </div>
            }): 'No members'}</div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        members: state.course.members
    }
}
export default connect(mapStateToProps, {
    getAllMembersFromCourse
})(CourseMembersList);
