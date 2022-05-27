import React, {useEffect} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";

import {getAllMembersFromCourse} from "../../../reduxStore/course-reducer";

interface CourseMembersListProps {
    selectedCourseId: string | undefined,
    members: Array<string>,
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
            <div>{members.length !== 0 ? members.map((member : string) => {
                return <div key={member}
                    style={{backgroundColor: '#8691ca', margin: '10px', padding: '12px'}}> {member} </div>
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
