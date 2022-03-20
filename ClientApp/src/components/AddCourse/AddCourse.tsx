import React, {FC, useContext, useState} from 'react';
import ErrorMessage from "../../common/Messages/ErrorMessage";
import Button from "../../common/button/Button";
import {Context} from "../../index";
interface AddCourseProps {
}

const AddCourse: FC<AddCourseProps> = () => {
    const [courseName, setCourseName] = useState('');
    const [courseTopic, setCourseTopic] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [emptyError, setEmptyError] = useState(false);
    const [coursePrice, setCoursePrice] = useState('');

    const {store} = useContext(Context)

    const onAddCourseHandler = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if (courseName.length !==0 && courseTopic.length !== 0 && courseDescription.length !==0) {
            if (coursePrice.length !== 0) {
                setCoursePrice('FREE');
            }
            store.addCourse(courseName, courseTopic, courseDescription, coursePrice);
            setCourseName('');
            setCourseTopic('');
            setCourseDescription('');
            setCoursePrice('');
        } else {
            setEmptyError(true);
        }
    }

    return (
        <div style={{marginTop: '30px', margin: 'auto'}}>
            <form onSubmit={onAddCourseHandler}>
                <input
                    onChange={(event)=> {
                        setCourseName(event.target.value);
                        setEmptyError(false);
                    }}
                    type="text"
                    id="course_name"
                    value={courseName}
                    placeholder='Enter the name of the course'
                />
                <input
                    onChange={(event)=> {
                        setCourseTopic(event.target.value);
                        setEmptyError(false);
                    }}
                    type="text"
                    id="course_topic"
                    value={courseTopic}
                    placeholder='Enter the topic of the course'
                />
                <input
                    onChange={(event)=> {
                        setCoursePrice(event.target.value);
                        setEmptyError(false);
                    }}
                    type="number"
                    id="course_price"
                    value={coursePrice}
                    placeholder='Enter the price of the course'
                />
                <textarea
                    onChange={(event)=> {
                        setCourseDescription(event.target.value);
                        setEmptyError(false);
                    }}
                    value={courseDescription}
                    name="textarea"
                    id="course_description"
                    placeholder='Enter a description of the course'
                    style={{resize: "none", padding: '15px', width: 'calc(100% - 32px)'}}/>
                {/*<label htmlFor="course_image">Add an image of the course</label>*/}
                {/*<input*/}
                {/*    type="file"*/}
                {/*    id="course_image"*/}
                {/*    accept="image/png, image/jpeg"*/}
                {/*    value={courseImg}*/}
                {/*/>*/}
                {/*<button>Add course</button>*/}
                <Button width={300}>Add course</Button>
                {emptyError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
            </form>
        </div>
    );
};

export default AddCourse;
