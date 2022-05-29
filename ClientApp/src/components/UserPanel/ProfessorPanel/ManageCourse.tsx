import React, {useState} from 'react';
import "../AdminPanel/adminPanel.css";
import AddLection from "./AddLecture";
import EditCourse from "./EditCourse";
import LecturesList from "./LecturesList";
import CourseMembersList from "./CourseMembersList";
import {useNavigate, useParams} from "react-router-dom";
import backIcon from "../../../assets/img/back-svgrepo-com.svg";

export enum ButtonItems {
    EDIT_COURSE = 'editCourse',
    ADD_LECTURE = 'addLecture',
    EDIT_LECTURE = 'editLecture',
    SHOW_MEMBERS = 'showMembers',
}

interface ManageCourseProps {
}

const ManageCourse: React.FC<ManageCourseProps> = ({ }) => {
    const [slideItem, setSlideItem] = useState('editCourse');
    const navigate = useNavigate();

    const {id} = useParams();
    return (
        <div style={{display: 'flex'}}>
            <div style={{paddingTop: '30px', paddingLeft: '20px', width: '25px', cursor: 'pointer'}}>
                <img src={backIcon} onClick={() => navigate(-1)} alt=""/>
            </div>
            <div className="user__container">
                <div style={{display: 'inline-flex', width: '600px'}}>
                    <button className={`role__btn ${slideItem === ButtonItems.EDIT_COURSE && 'active'}`} onClick={()=> setSlideItem(ButtonItems.EDIT_COURSE)}>Edit course</button>
                    <button className={`role__btn ${slideItem === ButtonItems.ADD_LECTURE && 'active'}`} onClick={()=> setSlideItem(ButtonItems.ADD_LECTURE)}>Add lecture</button>
                    <button className={`role__btn ${slideItem === ButtonItems.EDIT_LECTURE && 'active'}`} onClick={()=> setSlideItem(ButtonItems.EDIT_LECTURE)}>Edit lecture</button>
                    <button className={`role__btn ${slideItem === ButtonItems.SHOW_MEMBERS && 'active'}`} onClick={()=> setSlideItem(ButtonItems.SHOW_MEMBERS)}>Members</button>
                </div>
                {slideItem === ButtonItems.EDIT_COURSE && <EditCourse selectedCourseId={id}/>}
                {slideItem === ButtonItems.ADD_LECTURE && <AddLection selectedCourseId={id}/>}
                {slideItem === ButtonItems.EDIT_LECTURE && <LecturesList selectedCourseId={id}/>}
                {slideItem === ButtonItems.SHOW_MEMBERS && <CourseMembersList selectedCourseId={id}/>}
            </div>
        </div>
    );
};

export default ManageCourse;
