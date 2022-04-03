import React, {useState} from 'react';
import "../AdminPanel/adminPanel.css";
import TwoButtons from "../../../common/PanelTopButtons/TwoButtons";
import AddLection from "./AddLection";
import {ICourse} from "../../../models/ICourse";
import closeIcon from "../../../assets/img/close-svgrepo-com.svg";
import EditCourse from "../EditCourse";

interface ManageCourseProps {
    selectedCourse: ICourse,
}

const ManageCourse: React.FC<ManageCourseProps> = ({ selectedCourse }) => {
    const [isAddLecture, setAddLecture] = useState(true);

    return (
        <div className="user__container">
            <div style={{display: 'inline-flex', width: '400px'}}>
                <TwoButtons isFirst={isAddLecture} setFirst={() => setAddLecture(true)}>Edit course</TwoButtons>
                <TwoButtons isFirst={!isAddLecture} setFirst={() => setAddLecture(false)}>Add lecture</TwoButtons>
                <div className="icon__close">
                    <img src={closeIcon} alt=""/>
                </div>
            </div>
            {isAddLecture ? <EditCourse selectedCourse={selectedCourse}/> : <AddLection selectedCourse={selectedCourse}/>}
        </div>
    );
};

export default ManageCourse;
