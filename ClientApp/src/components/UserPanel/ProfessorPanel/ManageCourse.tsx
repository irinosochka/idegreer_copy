import React, {useState} from 'react';
import "../AdminPanel/adminPanel.css";
import TwoButtons from "../../../common/PanelTopButtons/TwoButtons";
import AddLection from "./AddLection";
import {ICourse} from "../../../models/ICourse";
import closeIcon from "../../../assets/img/close-svgrepo-com.svg";
import EditCourse from "../EditCourse";

interface ManageCourseProps {
    selectedCourse: ICourse,
    setVisibleEditPanel: (bool: boolean) => void,
    setVisibleList: (bool: boolean) => void
}

const ManageCourse: React.FC<ManageCourseProps> = ({ selectedCourse,  setVisibleEditPanel, setVisibleList }) => {
    const [isAddLecture, setAddLecture] = useState(true);

    const handleClose = (event: any) => {
        event.preventDefault();
        setVisibleEditPanel(false);
        setVisibleList(true);
    };

    return (
        <div className="user__container">
            <div style={{display: 'inline-flex', width: '540px'}}>
                <TwoButtons isFirst={isAddLecture} setFirst={() => setAddLecture(true)}>Edit course</TwoButtons>
                <TwoButtons isFirst={!isAddLecture} setFirst={() => setAddLecture(false)}>Add lecture</TwoButtons>
                <div style={{marginTop: '18px', width: '30px', marginLeft: '60px', cursor: 'pointer'}} onClick={handleClose}>
                    <img src={closeIcon} alt=""/>
                </div>
            </div>
            {isAddLecture ? <EditCourse selectedCourse={selectedCourse}/> : <AddLection selectedCourse={selectedCourse}/>}
        </div>
    );
};

export default ManageCourse;
