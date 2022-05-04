import React, {useEffect} from 'react';
import {ICourse} from "../../../models/ICourse";
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";

import {getAllMembersFromCourse} from "../../../reduxStore/course-reducer";

interface CourseMembersListProps {
    selectedCourse: ICourse,
    members: Array<string>,
    getAllMembersFromCourse: (courseId: string) => void,
}

const CourseMembersList: React.FC< CourseMembersListProps> = ({selectedCourse, getAllMembersFromCourse, members}) => {

    useEffect(() => {
        getAllMembersFromCourse(selectedCourse._id);
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
