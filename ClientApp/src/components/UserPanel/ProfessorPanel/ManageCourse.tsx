import React, {useState} from 'react';
import "../AdminPanel/adminPanel.css";
import AddLection from "./AddLection";
import {ICourse} from "../../../models/ICourse";
import closeIcon from "../../../assets/img/close-svgrepo-com.svg";
import EditCourse from "./EditCourse";
import LecturesList from "./LecturesList";
import CourseMembersList from "./CourseMembersList";

export enum ButtonItems {
    EDIT_COURSE = 'editCourse',
    ADD_LECTURE = 'addLecture',
    EDIT_LECTURE = 'editLecture',
    SHOW_MEMBERS = 'showMembers',
}

interface ManageCourseProps {
    selectedCourse: ICourse,
    setVisibleEditPanel: (bool: boolean) => void,
    setVisibleList: (bool: boolean) => void
}

const ManageCourse: React.FC<ManageCourseProps> = ({ selectedCourse,  setVisibleEditPanel, setVisibleList }) => {
    const [slideItem, setSlideItem] = useState('editCourse');

    const handleClose = (event: any) => {
        event.preventDefault();
        setVisibleEditPanel(false);
        setVisibleList(true);
    };

    return (
        <div className="user__container">
            <div style={{display: 'inline-flex', width: '540px'}}>
                <button className={`role__btn ${slideItem === ButtonItems.EDIT_COURSE && 'active'}`} onClick={()=> setSlideItem(ButtonItems.EDIT_COURSE)}>Edit course</button>
                <button className={`role__btn ${slideItem === ButtonItems.ADD_LECTURE && 'active'}`} onClick={()=> setSlideItem(ButtonItems.ADD_LECTURE)}>Add lecture</button>
                <button className={`role__btn ${slideItem === ButtonItems.EDIT_LECTURE && 'active'}`} onClick={()=> setSlideItem(ButtonItems.EDIT_LECTURE)}>Edit lecture</button>
                <button className={`role__btn ${slideItem === ButtonItems.SHOW_MEMBERS && 'active'}`} onClick={()=> setSlideItem(ButtonItems.SHOW_MEMBERS)}>Members</button>
                <div style={{marginTop: '18px', width: '30px', marginLeft: '60px', cursor: 'pointer'}} onClick={handleClose}>
                    <img src={closeIcon} alt=""/>
                </div>
            </div>
            {slideItem === ButtonItems.EDIT_COURSE && <EditCourse selectedCourse={selectedCourse}/>}
            {slideItem === ButtonItems.ADD_LECTURE && <AddLection selectedCourse={selectedCourse}/>}
            {slideItem === ButtonItems.EDIT_LECTURE && <LecturesList selectedCourse={selectedCourse}/>}
            {slideItem === ButtonItems.SHOW_MEMBERS && <CourseMembersList selectedCourse={selectedCourse}/>}
        </div>
    );
};

export default ManageCourse;
