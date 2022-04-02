import React, {useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {actions, changeCourseData, deleteCourseById, getAllCourses} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import "./adminPanel.css";
import SearchComponent from "../../UniversalComponents/SearchComponent";
import Message, {MessageType} from "../../../common/Messages/Message";
import Button from "../../../common/button/Button";


interface ListOfCourseProps {
    courses: ICourse[],
    getAllCourses: () => void,
    deleteCourseById: (courseId: string) => void,
    setCourseDataChangedSuccess: (bool: boolean) => void,
    changeCourseData: (courseId: string, title: string, theme: string, description: string, price: string) => void,
    courseDataChangedSuccess: boolean,
    setDeleteCourseByIdSuccess: (bool: boolean) => void,
    deleteCourseByIdSuccess: boolean,
}

const EditCourse: React.FC<ListOfCourseProps> = ({courses, getAllCourses, deleteCourseById, setCourseDataChangedSuccess, setDeleteCourseByIdSuccess, changeCourseData, courseDataChangedSuccess, deleteCourseByIdSuccess}) => {
    const [selectedCourse, setSelectedCourse] = useState<ICourse>();

    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [isError, setError] = useState(false);

    useEffect(() => {
        getAllCourses();
        setCourseDataChangedSuccess(false);
        setDeleteCourseByIdSuccess(false);
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (selectedCourse && title.length !== 0 && theme.length !== 0 && price.length !== 0 && description.length !== 0) {
            changeCourseData(selectedCourse._id, title, theme, description, price);
            setTimeout(() => setCourseDataChangedSuccess(false), 3000)
        } else {
            setError(true);
        }
    };

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
                <div style={{width: '550px', marginTop: '50px',display: 'inline-block'}}>
                <form className="edit__box">
                    {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                    {courseDataChangedSuccess && <Message type={MessageType.SUCCESS}>Success data changing</Message>}
                    <input
                        onChange={(event) => {
                            setTitle(event.target.value);
                            setError(false);
                            setCourseDataChangedSuccess(false);
                        }}
                        type="text"
                        id="course_name"
                        value={title}
                        placeholder={"Title: " + selectedCourse.title}
                    />
                    <input
                        onChange={(event) => {
                            setTheme(event.target.value);
                            setError(false);
                            setCourseDataChangedSuccess(false);
                        }}
                        type="text"
                        id="course_topic"
                        value={theme}
                        placeholder={"Theme: " + selectedCourse.theme}
                    />
                    <input
                        onChange={(event) => {
                            setPrice(event.target.value);
                            setError(false);
                            setCourseDataChangedSuccess(false);
                        }}
                        type="number"
                        id="course_price"
                        value={price}
                        placeholder={"Price: " + selectedCourse.price}
                    />
                    <textarea
                        onChange={(event) => {
                            setDescription(event.target.value);
                            setError(false);
                            setCourseDataChangedSuccess(false);
                        }}
                        value={description}
                        name="textarea"
                        id="course_description"
                        placeholder={"Description: " + selectedCourse.description}
                        style={{resize: "none", marginBottom: '10px', padding: '5px 15px', width: 'calc(100% - 32px)', height: '80px', borderRadius: '5px'}}
                    />
                    <p style={{color: 'slategrey'}}>Author: {selectedCourse.author.name}</p>
                </form>
                    <div style={{display:  'inline-flex'}}>
                        <form onSubmit={handleSubmit} style={{margin: '10px'}}>
                            <div>
                                <Button width={240}>Submit changes</Button>
                            </div>
                        </form>
                        <form onSubmit={handleDelete} style={{margin: '10px'}}>
                            <div>
                                <Button width={240}>Delete course</Button>
                            </div>
                        </form>
                    </div>
            </div>}
            </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.courses,
        courseDataChangedSuccess: state.course.courseDataChangedSuccess,
        deleteCourseByIdSuccess: state.course.deleteCourseByIdSuccess,
    }
}
export default connect(mapStateToProps, {
    deleteCourseById,
    getAllCourses,
    changeCourseData,
    setCourseDataChangedSuccess: actions.setCourseDataChangedSuccess,
    setDeleteCourseByIdSuccess: actions.setDeleteCourseByIdSuccess,
})(EditCourse);
