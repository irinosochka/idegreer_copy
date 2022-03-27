import React, {useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {changeCourseData, getAllCourses} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import "./adminPanel.css";
import Message, {MessageType} from "../../../common/Messages/Message";
import Button from "../../../common/button/Button";
import {actions} from "../../../reduxStore/course-reducer";


interface EditCourseProps {
    course: ICourse,
    changeCourseData: (courseId: string, title: string, theme: string, description: string, price: string) => void,
    courseDataChangedSuccess: boolean
}

const EditCourseForm: React.FC<EditCourseProps> = ({course, changeCourseData, courseDataChangedSuccess}) => {

    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [isError, setError] = useState(false);

    useEffect(() => {
        setTitle(course.title);
        setTheme(course.theme);
        setPrice(course.price);
        setDescription(course.description);
    },[]);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (title.length !== 0 && theme.length !== 0 && price.length !== 0 && description.length !== 0) {
            console.log(title);
            changeCourseData(course._id, title, theme, description, price);
        } else {
            setError(true);
        }
    };

    return (
            <div style={{width: '400px', marginTop: '130px'}}>
                {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {courseDataChangedSuccess && <Message type={MessageType.SUCCESS}>Success data changing</Message>}

                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(event)=> {
                            setTitle(event.target.value);
                            setError(false);


                        }}
                        type="text"
                        id="course_name"
                        value={title}
                        placeholder={course.title}
                    />
                    <input
                        onChange={(event)=> {
                            setTheme(event.target.value);
                            setError(false);
                        }}
                        type="text"
                        id="course_topic"
                        value={theme}
                        placeholder={course.theme}
                    />
                    <input
                        onChange={(event)=> {
                            setPrice(event.target.value);
                            setError(false);
                        }}
                        type="number"
                        id="course_price"
                        value={price}
                        placeholder={course.price}
                    />
                    <textarea
                        onChange={(event)=> {
                            setDescription(event.target.value);
                            setError(false);
                        }}
                        value={description}
                        name="textarea"
                        id="course_description"
                        placeholder={course.description}
                        style={{resize: "none", marginBottom: '10px', padding: '5px 15px', width: 'calc(100% - 32px)'}}
                    />
                    <p style={{color: 'slategrey'}}>Author: {course.author.name}</p>
                    <div>

                        <Button width={240}>Submit changes</Button>
                    </div>
                </form>
            </div>

    )}

const mapStateToProps = (state: AppStateType) => {
    return {
        courseDataChangedSuccess: state.course.courseDataChangedSuccess
    }
}
export default connect(mapStateToProps, {
    changeCourseData,
    getAllCourses,
    setCourseDataChangedSuccess: actions.setCourseDataChangedSuccess
})(EditCourseForm);
