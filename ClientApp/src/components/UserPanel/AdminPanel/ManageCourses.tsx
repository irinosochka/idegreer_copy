import React, {useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {actions, deleteCourseById, getAllCourses} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import "./adminPanel.css";
import SearchComponent from "../../../common/SearchComponent/SearchComponent";
import Message, {MessageType} from "../../../common/Messages/Message";
import Button from "../../../common/button/Button";
import EditCourse from "../ProfessorPanel/EditCourse";


interface ManageCourseProps {
    courses: ICourse[],
    getAllCourses: () => void,
    deleteCourseById: (courseId: string) => void,
    setDeleteCourseByIdSuccess: (bool: boolean) => void,
    deleteCourseByIdSuccess: boolean,
}

const ManageCourses: React.FC<ManageCourseProps> = ({courses, getAllCourses, deleteCourseById, setDeleteCourseByIdSuccess, deleteCourseByIdSuccess}) => {
    const [selectedCourse, setSelectedCourse] = useState<ICourse>();

    const [isError, setError] = useState(false);

    useEffect(() => {
        getAllCourses();
        setDeleteCourseByIdSuccess(false);
    }, []);

    const handleDelete = (event: any) => {
        event.preventDefault();
        if(selectedCourse){
            deleteCourseById(selectedCourse._id);
            setDeleteCourseByIdSuccess(true);
            setSelectedCourse(undefined);
        } else {
            setError(true);
        }
    }

    return (
            <div className="user__container">
                <h1>Edit courses</h1>
                <SearchComponent setSelected={setSelectedCourse} list={courses} getList={getAllCourses} />
                {deleteCourseByIdSuccess && <Message type={MessageType.SUCCESS}>Course has been deleted</Message>}
                {selectedCourse &&
                <div style={{width: '550px', marginTop: '10px',display: 'inline-block'}}>
                    <EditCourse selectedCourse={selectedCourse} />
                    <form onSubmit={handleDelete} style={{margin: '10px'}}>
                        <div>
                            <Button width={240}>Delete course</Button>
                        </div>
                    </form>
                </div>}
            </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.courses,
        deleteCourseByIdSuccess: state.course.deleteCourseByIdSuccess,
    }
}
export default connect(mapStateToProps, {
    deleteCourseById,
    getAllCourses,
    setDeleteCourseByIdSuccess: actions.setDeleteCourseByIdSuccess,
})(ManageCourses);
