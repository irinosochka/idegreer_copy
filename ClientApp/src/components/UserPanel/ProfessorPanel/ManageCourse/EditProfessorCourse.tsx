import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import "../../AdminPanel/adminPanel.css";
import {ICourse} from "../../../../models/ICourse";
import Message, {MessageType} from "../../../../common/Messages/Message";
import Button from "../../../../common/button/Button";
import {AppStateType} from "../../../../reduxStore/store";
import {actions, changeCourseData, getAllCourses} from "../../../../reduxStore/course-reducer";


interface ListOfCourseProps {
    selectedCourse: ICourse,
    setCourseDataChangedSuccess: (bool: boolean) => void,
    changeCourseData: (courseId: string, title: string, theme: string, description: string, price: string) => void,
    courseDataChangedSuccess: boolean,
}

const EditProfessorCourse: React.FC<ListOfCourseProps> = ({selectedCourse, setCourseDataChangedSuccess, changeCourseData, courseDataChangedSuccess }) => {

    const [title, setTitle] = useState(selectedCourse.title);
    const [theme, setTheme] = useState(selectedCourse.theme);
    const [description, setDescription] = useState(selectedCourse.description);
    const [price, setPrice] = useState(selectedCourse.price);
    const [isError, setError] = useState(false);

    useEffect(() => {
        getAllCourses();
        setCourseDataChangedSuccess(false);
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

    return (
        <>
            <form className="edit__box" onSubmit={handleSubmit}>
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
                <Button width={240}>Submit changes</Button>
            </form>
        </>
    )}

const mapStateToProps = (state: AppStateType) => {
    return {
        courseDataChangedSuccess: state.course.courseDataChangedSuccess,
    }
}
export default connect(mapStateToProps, {
    changeCourseData,
    setCourseDataChangedSuccess: actions.setCourseDataChangedSuccess,
})(EditProfessorCourse);
