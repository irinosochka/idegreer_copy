import {useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {actions, changeCourseData, getAllCourses} from "../../../reduxStore/course-reducer";
import {ICourse} from "../../../models/ICourse";
import "./adminPanel.css";
import Message, {MessageType} from "../../../common/Messages/Message";
import Button from "../../../common/button/Button";


interface EditCourseProps {
    course: ICourse,
    setCourseDataChangedSuccess: (bool: boolean) => void,
    changeCourseData: (courseId: string, title: string, theme: string, description: string, price: string) => void,
    courseDataChangedSuccess: boolean
}

const EditCourseForm: React.FC<EditCourseProps> = ({course, setCourseDataChangedSuccess, changeCourseData, courseDataChangedSuccess}) => {

    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [isError, setError] = useState(false);

    useEffect(() => {
        return () => setCourseDataChangedSuccess(false)
    }, [])


    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (title.length !== 0 && theme.length !== 0 && price.length !== 0 && description.length !== 0) {
            changeCourseData(course._id, title, theme, description, price);

        } else {
            setError(true);
        }
    };

    return (
        <div style={{width: '400px', marginTop: '50px',display: 'inline-block'}}>
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
                    placeholder={course.title}
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
                    placeholder={course.theme}
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
                    placeholder={course.price}
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
                    placeholder={course.description}
                    style={{resize: "none", marginBottom: '10px', padding: '5px 15px', width: 'calc(100% - 32px)', height: '80px'}}
                />
                <p style={{color: 'slategrey'}}>Author: {course.author.name}</p>
                <div>

                    <Button width={240}>Submit changes</Button>
                </div>
            </form>
        </div>

    )
}

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
