import React, {FC} from 'react';
import '../AuthComponents/index.css';

interface CourseItemProps {
    course: any
}

const CourseItem: FC<CourseItemProps> = ({course}) => {
    return (
        <div className="course__item">
            <h2>{course.courseName}</h2>
            <h3>{course.courseTopic}</h3>
            <p className="course__description">{course.courseDescription}</p>
            <div>
                <p className="course__author">{course.courseAuthor}</p>
                <p className="course__date">{course.courseDate.toDateString()}</p>
            </div>
        </div>
    );
};

export default CourseItem;