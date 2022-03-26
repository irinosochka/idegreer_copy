import React, {useEffect, useState} from 'react';

import "../AdminPanel/index.css";
// @ts-ignore
import editIcon from "../../assets/img/edit-svgrepo-com.svg"
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {getAllCourses} from "../../reduxStore/course-reducer";
import {ICourse} from "../../models/ICourse";


interface EditCourseProps {
    courses: ICourse[],
    getAllCourses: () => void
}

const EditCourse: React.FC<EditCourseProps> = ({courses, getAllCourses}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCourse, setShowCourse] = useState(false);

    useEffect(() => {
        getAllCourses()
    }, []);

    return (
        <div>
            <div>
                <h1>Edit courses</h1>
            </div>
            <div className="input__wrapper">
                <input type="text"
                       placeholder="Search course"
                       value={searchTerm}
                       onChange={e => {
                           setSearchTerm(e.target.value);
                           setShowCourse(!showCourse)
                       }}/>
            </div>

            <div className="body">
                {showCourse && courses.length === 0 && (
                    <div className="notFound">No Courses Found</div>
                )}

                {courses?.filter((course: any ) => {
                    if (searchTerm == "") {
                        return course;
                    } else if(course.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return course;
                    }
                }).map((course: any) => {
                    return(
                        <div className="body__item">
                            <div>
                                <h3>{course?.title}</h3>
                                <p>{course?.theme}</p>
                                <p>Price: {course?.price}</p>
                            </div>
                            <div>
                                <div style={{cursor: 'pointer'}} /*onClick={() => {addRole}}*/>
                                    <img src={editIcon} style={{color: '#fff', width: '15px', height: '15px'}}  alt=""/>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    )
}
const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.courses
    }
}
export default connect(mapStateToProps, {getAllCourses})(EditCourse);
