import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import "../AdminPanel/adminPanel.css"
import {ICourse} from "../../../models/ICourse";
import {actions, changeCourseData, getOneCourse, setCourseChanges} from "../../../reduxStore/course-reducer";
import {AppStateType} from "../../../reduxStore/store";
import Button from "../../../common/button/Button";
import Message, {MessageType} from "../../../common/Messages/Message";
import {addNotification} from "../../../reduxStore/user-reducer";
import {mailMessageType, sendEditMail} from "../../../reduxStore/mail-reducer";
import {IUser} from "../../../models/IUser";

interface ListOfCourseProps {
    selectedCourseId: string | undefined,
    course: { course: ICourse, author: IUser },
    setCourseDataChangedSuccess: (bool: boolean) => void,
    changeCourseData: (courseId: string, title: string, theme: string, description: string, price: string) => void,
    setCourseChanges: (courseId: string) => void,
    courseDataChangedSuccess: boolean,
    addNotification: (date: string, courseId: string, type: string) => void,
    sendEditLectionMail: (email: string, lectionTitle: string, messageType: mailMessageType) => void,
    getOneCourse: (courseId: string) => void
}

const EditCourse: React.FC<ListOfCourseProps> = ({selectedCourseId, course, setCourseDataChangedSuccess, changeCourseData, addNotification, courseDataChangedSuccess, setCourseChanges, sendEditLectionMail, getOneCourse }) => {

    // const [title, setTitle] = useState(selectedCourse.title);
    // const [theme, setTheme] = useState(selectedCourse.theme);
    // const [description, setDescription] = useState(selectedCourse.description);
    // const [price, setPrice] = useState(selectedCourse.price);

    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [isError, setError] = useState(false);

    useEffect(() => {
        if (selectedCourseId) {
            getOneCourse(selectedCourseId)
        }
        setCourseDataChangedSuccess(false);
    }, []);


    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (course && title.length !== 0 && theme.length !== 0 && price.length !== 0 && description.length !== 0) {
            changeCourseData(course.course._id, title, theme, description, price);
            setTimeout(() => setCourseDataChangedSuccess(false), 3000);
            addNotification(new Date().toLocaleDateString(), course.course._id, `Changing the data of the course ${course.course.title}`)
            setCourseChanges(course.course._id)
            sendEditLectionMail(course.course._id, course.course.title, mailMessageType.EDIT_COURSE)
        } else {
            setError(true);
        }
    };

    return (
        <>
            <form className="edit__box" onSubmit={handleSubmit}>
                {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {courseDataChangedSuccess && <Message type={MessageType.SUCCESS}>Success data changing</Message>}
                <div className="input-wrapper">
                    <input className="form-control"
                           onChange={(event) => {
                               setTitle(event.target.value);
                               setError(false);
                               setCourseDataChangedSuccess(false);
                           }}
                           type="text"
                           id="course_name"
                           value={title}
                           placeholder={"Title: "+ course.course.title}
                    /><label htmlFor="input" className="control-label">Title:</label>
                </div>
                <div className="input-wrapper">
                    <input className="form-control"
                           onChange={(event) => {
                               setTheme(event.target.value);
                               setError(false);
                               setCourseDataChangedSuccess(false);
                           }}
                           type="text"
                           id="course_topic"
                           value={theme}
                           placeholder={"Theme: " +  course.course.theme}
                    /><label htmlFor="input" className="control-label">Topic:</label>
                </div>
                <div className="input-wrapper">
                    <input className="form-control"
                           onChange={(event) => {
                               setPrice(event.target.value);
                               setError(false);
                               setCourseDataChangedSuccess(false);
                           }}
                           type="number"
                           id="course_price"
                           value={price}
                           placeholder={"Price: " + course.course.price}
                    /><label htmlFor="input" className="control-label">Price:</label>
                </div>
                <div className="input-wrapper" style={{marginBottom: '10px'}}>
                    <textarea className="form-control"
                              onChange={(event) => {
                                  setDescription(event.target.value);
                                  setError(false);
                                  setCourseDataChangedSuccess(false);
                              }}
                              value={description}
                              name="textarea"
                              id="course_description"
                              placeholder={"Description: " + course.course.description}
                              style={{resize: "none", marginBottom: '10px', padding: '5px 15px', width: 'calc(100% - 32px)', height: '80px', borderRadius: '5px'}}
                    /><label style={{ transform: 'translateY(-70px)'}} htmlFor="input" className="control-label">Description:</label>
                </div>
                {course.author && <p style={{color: 'slategrey'}}>Author: {course.author.name}</p>}
                <Button width={240}>Submit changes</Button>
            </form>
        </>
    )}

const mapStateToProps = (state: AppStateType) => {
    return {
        courseDataChangedSuccess: state.course.courseDataChangedSuccess,
        course: state.course.course
    }
}
export default connect(mapStateToProps, {
    changeCourseData,
    setCourseDataChangedSuccess: actions.setCourseDataChangedSuccess,
    setCourseChanges,
    addNotification,
    sendEditLectionMail: sendEditMail,
    getOneCourse
})(EditCourse);
