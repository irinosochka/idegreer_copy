import React, {useState} from 'react';
import "../../AdminPanel/adminPanel.css";
import TwoButtons from "../../../UniversalComponents/TwoButtons";
import AddLection from "../AddLection";
import EditProfessorCourse from "./EditProfessorCourse";
import {ICourse} from "../../../../models/ICourse";
import closeIcon from "../../../../assets/img/close-svgrepo-com.svg";

interface ManageCourseProps {
    selectedCourse: ICourse,
}

const ManageCourse: React.FC<ManageCourseProps> = ({ selectedCourse }) => {
    const [isAddLecture, setAddLecture] = useState(true);

    return (
        <div className="user__container">
            <div style={{display: 'inline-flex', width: '400px'}}>
                <TwoButtons isFirst={isAddLecture} setFirst={() => setAddLecture(true)}>Add lecture</TwoButtons>
                <TwoButtons isFirst={!isAddLecture} setFirst={() => setAddLecture(false)}>Edit course</TwoButtons>
                <div className="icon__close">
                    <img src={closeIcon} alt=""/>
                </div>
            </div>
            {isAddLecture ? <AddLection selectedCourse={selectedCourse}/> : <EditProfessorCourse selectedCourse={selectedCourse}/>}
        </div>
    );
};

export default ManageCourse;
