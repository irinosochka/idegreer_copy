import React, {FC, useState} from 'react';
import ErrorMessage from "../../common/Messages/ErrorMessage";
interface AddCourseProps {
    setCourses: (course: any) => void,
    course: any
}

const AddCourse: FC<AddCourseProps> = ({setCourses, course}) => {
    const [courseName, setCourseName] = useState('');
    const [courseTopic, setCourseTopic] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [emptyError, setEmptyError] = useState(false);

    const onAddCourseHandler = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        const newCourse = {
            courseName: courseName,
            courseTopic: courseTopic,
            courseDescription: courseDescription
        };
        if (courseName.length !==0 && courseTopic.length !== 0 && courseDescription.length !==0) {
            setCourses([...course, newCourse]);
            setCourseName('');
            setCourseTopic('');
            setCourseDescription('');
        } else {
            setEmptyError(true);
        }
    }

    return (
        <div className="container" style={{marginTop: '30px', margin: 'auto',
            width: '50%'}}>
            <h2 style={{marginBottom:'20px'}}>Create a new course</h2>
            <form onSubmit={onAddCourseHandler}>
                <label htmlFor="course_name">Enter the name of the course</label>
                <input
                    onChange={(event)=> {
                        setCourseName(event.target.value);
                        setEmptyError(false);
                    }}
                    type="text"
                    id="course_name"
                    value={courseName}
                />
                <label htmlFor="course_topic">Enter the topic of the course</label>
                <input
                    onChange={(event)=> {
                        setCourseTopic(event.target.value);
                        setEmptyError(false);
                    }}
                    type="text"
                    id="course_topic"
                    value={courseTopic}
                />
                <label htmlFor="course_description">Enter a description of the course</label>
                {/*<input type="text" id="course_description" style={{height: '200px', textAlign: "justify"}}/>*/}
                <textarea
                    onChange={(event)=> {
                        setCourseDescription(event.target.value);
                        setEmptyError(false);
                    }}
                    value={courseDescription}
                    name="textarea"
                    id="course_description"
                    rows={5}
                    cols={90}
                    style={{resize: "none", padding: '15px'}}/>
                {/*<label htmlFor="course_image">Add an image of the course</label>*/}
                {/*<input*/}
                {/*    type="file"*/}
                {/*    id="course_image"*/}
                {/*    accept="image/png, image/jpeg"*/}
                {/*    value={courseImg}*/}
                {/*/>*/}
                {/*<button>Add course</button>*/}
                <button type="submit">Add course</button>
                {emptyError && <ErrorMessage>Fields can't be empty</ErrorMessage>}
            </form>
            <button>List of courses</button>
        </div>
    );
};

export default AddCourse;