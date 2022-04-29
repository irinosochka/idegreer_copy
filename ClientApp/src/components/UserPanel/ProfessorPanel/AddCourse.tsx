import React, {FC, useEffect, useState} from 'react';
import Button from "../../../common/button/Button";
import Message, {MessageType} from "../../../common/Messages/Message";
import {connect} from "react-redux";
import {addCourse} from "../../../reduxStore/course-reducer";
import {IUser} from "../../../models/IUser";
import {AppStateType} from "../../../reduxStore/store";
import {useNavigate} from "react-router-dom";
import {ICourse} from "../../../models/ICourse";
import '../userPanel.css'

interface AddCourseProps {
    authUser: IUser,
    addCourse: (user: string, courseName: string, courseTopic: string, courseDescription: string, coursePrice: string) => Promise<void>
    courses: Array<ICourse>
}

const AddCourse: FC<AddCourseProps> = ({authUser, courses, addCourse}) => {
    const [courseName, setCourseName] = useState('');
    const [courseTopic, setCourseTopic] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [emptyError, setEmptyError] = useState(false);
    const [successAddCourse, setSuccessAddCourse] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (successAddCourse) {
            navigate(`/course/${courses[courses.length - 1]._id}`)
        }
    }, [courses])

    const onAddCourseHandler = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if (courseName.length !==0 && courseTopic.length !== 0 && courseDescription.length !==0 && coursePrice.length !== 0) {
            addCourse(authUser._id, courseName, courseTopic, courseDescription, coursePrice);
            setSuccessAddCourse(true);
            setCourseName('');
            setCourseTopic('');
            setCourseDescription('');
            setCoursePrice('');
        } else {
            setEmptyError(true);
        }
    }

    return (
        <div className="user__container"  style={{background: '#fff', borderRadius: '10px', padding: '20px'}}>
            <form onSubmit={onAddCourseHandler}>
                {emptyError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {successAddCourse && <Message type={MessageType.SUCCESS}>The course was successfully added</Message>}
                <div className="input-wrapper">
                    <input className="form-control"
                           onChange={(event)=> {
                            setCourseName(event.target.value);
                            setEmptyError(false);
                        }}
                        type="text"
                        id="course_name"
                        value={courseName}
                        placeholder='Enter the title of the course'
                    /><label htmlFor="input" className="control-label">Title:</label>
                </div>
                <div className="input-wrapper">
                    <input className="form-control"
                           onChange={(event)=> {
                            setCourseTopic(event.target.value);
                            setEmptyError(false);
                        }}
                        type="text"
                        id="course_topic"
                        value={courseTopic}
                        placeholder='Enter the topic of the course'
                    /><label htmlFor="input" className="control-label">Topic:</label>
                </div>
                <div className="input-wrapper">
                    <input className="form-control"
                           onChange={(event)=> {
                            setCoursePrice(event.target.value);
                            setEmptyError(false);
                        }}
                        type="number"
                        id="course_price"
                        value={coursePrice}
                        placeholder='Enter the price of the course'
                    /><label htmlFor="input" className="control-label">Price:</label>
                </div>
                <div className="input-wrapper">
                    <textarea className="form-control"
                              onChange={(event)=> {
                            setCourseDescription(event.target.value);
                            setEmptyError(false);
                        }}
                        value={courseDescription}
                        name="textarea"
                        id="course_description"
                        placeholder='Enter a description of the course'
                        style={{resize: "none", padding: '10px 15px', width: 'calc(100% - 32px)'}}
                    /><label style={{ transform: 'translateY(-70px)'}} htmlFor="input" className="control-label">Description:</label>
                </div>
                {/*<label htmlFor="course_image">Add an image of the course</label>*/}
                {/*<input*/}
                {/*    type="file"*/}
                {/*    id="course_image"*/}
                {/*    accept="image/png, image/jpeg"*/}
                {/*    value={courseImg}*/}
                {/*/>*/}
                {/*<button>Add course</button>*/}
                <Button width={300}>Add course</Button>

            </form>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        courses: state.course.courses,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {addCourse})(AddCourse);
