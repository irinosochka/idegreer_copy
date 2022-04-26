import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import "./AdminPanel/adminPanel.css"
import {ICourse} from "../../models/ICourse";
import {actions, changeCourseData, setCourseChanges} from "../../reduxStore/course-reducer";
import {AppStateType} from "../../reduxStore/store";
import Button from "../../common/button/Button";
import Message from "../../common/Messages/Message";
import {MessageType} from "../../common/Messages/Message";

interface ListOfCourseProps {
    selectedCourse: ICourse,
    setCourseDataChangedSuccess: (bool: boolean) => void,
    changeCourseData: (courseId: string, title: string, theme: string, description: string, price: string) => void,
    setCourseChanges: (courseId: string) => void,
    courseDataChangedSuccess: boolean,
}

const EditCourse: React.FC<ListOfCourseProps> = ({selectedCourse, setCourseDataChangedSuccess, changeCourseData, courseDataChangedSuccess, setCourseChanges }) => {

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
        setCourseDataChangedSuccess(false);
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (selectedCourse && title.length !== 0 && theme.length !== 0 && price.length !== 0 && description.length !== 0) {
            changeCourseData(selectedCourse._id, title, theme, description, price);
            setTimeout(() => setCourseDataChangedSuccess(false), 3000);
            setCourseChanges(selectedCourse._id)
        } else {
            setError(true);
        }
    };

    // @ts-ignore
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
                           placeholder={"Title: "+ selectedCourse.title}
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
                           placeholder={"Theme: " +  selectedCourse.theme}
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
                           placeholder={"Price: " + selectedCourse.price}
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
                              placeholder={"Description: " + selectedCourse.description}
                              style={{resize: "none", marginBottom: '10px', padding: '5px 15px', width: 'calc(100% - 32px)', height: '80px', borderRadius: '5px'}}
                    /><label style={{ transform: 'translateY(-70px)'}} htmlFor="input" className="control-label">Description:</label>
                </div>
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
    setCourseChanges
})(EditCourse);
