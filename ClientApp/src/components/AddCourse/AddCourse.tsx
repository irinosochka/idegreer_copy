import React, {FC, useState} from 'react';
import ErrorMessage from "../../common/Messages/ErrorMessage";
import Button from "../../common/button/Button";
interface AddCourseProps {
    setCourses: (course: any) => void,
    courses: any
}

const AddCourse: FC<AddCourseProps> = ({setCourses, courses}) => {
    const [courseName, setCourseName] = useState('');
    const [courseTopic, setCourseTopic] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [emptyError, setEmptyError] = useState(false);

    const onAddCourseHandler = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        const newCourse = {
            courseName: courseName,
            courseTopic: courseTopic,
            courseAuthor: 'Palianytsia',
            courseDescription: courseDescription,
            courseDate: new Date()
        };
        if (courseName.length !==0 && courseTopic.length !== 0 && courseDescription.length !==0) {
            setCourses([...courses, newCourse]);
            setCourseName('');
            setCourseTopic('');
            setCourseDescription('');
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