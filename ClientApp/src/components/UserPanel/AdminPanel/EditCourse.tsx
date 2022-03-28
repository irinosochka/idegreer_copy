import {useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {getAllCourses} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import "./adminPanel.css";
import EditCourseForm from "./EditCourseForm";
import searchIcon from "../../../assets/img/search-svgrepo-com.svg"


interface ListOfCourseProps {
    courses: ICourse[],
    getAllCourses: () => void
}

const EditCourse: React.FC<ListOfCourseProps> = ({courses, getAllCourses}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCourse, setShowCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourse>();
    const searchWrapper = document.querySelector('.search__input');

    useEffect(() => {
        getAllCourses()
    }, []);

    const handleSelecting = (course: ICourse) => {
        searchWrapper?.classList.remove("active")
        setSelectedCourse(course);
    };

    return (
        <div className="body">
            <div className="user__container">
                <h1>Edit courses</h1>
                <div className="search__input">
                    <input
                        type="text"
                        placeholder="Search course..."
                        value={searchTerm}
                        onChange={e => {
                            setSearchTerm(e.target.value);
                            setShowCourse(!showCourse)
                        }}
                    />
                    <div className="item__box">
                        {courses?.filter((course: ICourse ) => {
                            if (searchTerm == "") {
                                searchWrapper?.classList.remove("active")
                                return course;
                            } else if(course.title.toLowerCase().includes(searchTerm.toLowerCase())){
                                return course;
                            }
                            searchWrapper?.classList.add("active")
                        }).map((course: ICourse) => {
                            return(
                                <li key={course._id}
                                     onClick={() => {
                                         handleSelecting(course)
                                     }}>
                                    {course?.title}
                                </li>
                            )})}
                    </div>
                    <div className="icon">
                       <img src={searchIcon} alt=""/>
                    </div>
                </div>
            {selectedCourse && <EditCourseForm course={selectedCourse}/>}
            </div>
        </div>
    )}

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.courses
    }
}
export default connect(mapStateToProps, {getAllCourses})(EditCourse);
