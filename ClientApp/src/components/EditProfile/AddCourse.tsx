import React, {FC, useContext, useState} from 'react';
import Button from "../../common/Button/Button";
import {Context} from "../../index";
import Message, {MessageType} from "../../common/Messages/Message";

interface AddCourseProps {
}

const AddCourse: FC<AddCourseProps> = () => {
    const [courseName, setCourseName] = useState('');
    const [courseTopic, setCourseTopic] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [emptyError, setEmptyError] = useState(false);
    const [successAddCourse, setSuccessAddCourse] = useState(false);

    const {store} = useContext(Context)

    const onAddCourseHandler = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if (courseName.length !==0 && courseTopic.length !== 0 && courseDescription.length !==0) {
            if (coursePrice.length !== 0) {
                setCoursePrice('Free');
            }
            store.addCourse(courseName, courseTopic, courseDescription, coursePrice);
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
        <div style={{marginTop: '30px', margin: 'auto'}}>
            <form onSubmit={onAddCourseHandler}>
                {emptyError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
                {successAddCourse && <Message type={MessageType.SUCCESS}>The course was successfully added</Message>}
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
                {/*<Button>Add course</Button>*/}
                <Button width={300}>Add course</Button>

            </form>
        </div>
    );
};

export default AddCourse;
