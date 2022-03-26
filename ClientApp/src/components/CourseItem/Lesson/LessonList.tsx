import React, {FC} from 'react';
import LessonItem from "./LessonItem";
interface LessonListProps {
    lessons: any
}

const LessonList: FC<LessonListProps> = ({lessons}) => {
    return (
        <div className="lessons-container">
            <div className="content-header">
                List of lessons
            </div>
            <div className="video-lessons-list-content">
                {lessons.map((lesson:any) =>
                    <LessonItem lesson={lesson} key={lesson.id}/>
                )}
            </div>
        </div>
    );
};

export default LessonList;