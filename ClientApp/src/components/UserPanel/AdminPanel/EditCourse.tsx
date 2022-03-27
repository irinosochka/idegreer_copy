import {useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {getAllCourses} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import "./adminPanel.css";
import EditCourseForm from "./EditCourseForm";


interface ListOfCourseProps {
    courses: ICourse[],
    getAllCourses: () => void
}

const EditCourse: React.FC<ListOfCourseProps> = ({courses, getAllCourses}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCourse, setShowCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourse>();

    useEffect(() => {
        getAllCourses()
    }, []);

    const handleSelecting = (course: ICourse) => {
        setSelectedCourse(course);
    };

    return (
        <div className="user__container" style={{display: 'flex'}}>
            <div style= {{display: 'inline-block'}}>
                <>
                    <h1>Edit courses</h1>
                </>

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
                        <div className="notFound">No Course Found</div>
                    )}

                    {courses?.filter((course: ICourse ) => {
                        if (searchTerm == "") {
                            return course;
                        } else if(course.title.toLowerCase().includes(searchTerm.toLowerCase())){
                            return course;
                        }
                    }).map((course: ICourse) => {
                        return(
                            <div className="body__item" key={course._id}
                                 onClick={() => {
                                     handleSelecting(course)
                                 }}>
                                {course?.title}
                            </div>
                        )})}
                </div>
            </div>

            {selectedCourse && <EditCourseForm course={selectedCourse}/>}
        </div>
    )}

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.courses
    }
}
export default connect(mapStateToProps, {getAllCourses})(EditCourse);
