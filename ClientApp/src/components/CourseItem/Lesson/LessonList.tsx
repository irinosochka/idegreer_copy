import React, {FC} from 'react';
import LessonItem from "./LessonItem";
import './lesson.css'
import {ILection} from "../../../models/ILection";


interface LessonListProps {
    lessons: Array<ILection>
}

const LessonList: FC<LessonListProps> = ({lessons}) => {
    return (
        <div className="lessons-container">
            <header className="content-header">
                List of lessons
            </header>
            <div className="video-lessons-list-content">
                {lessons.length === 0 ? <span style={{color: '#000', fontSize: '15px', paddingLeft: '10px'}}>No lections</span> : lessons.map((lesson: ILection, index: number) =>
                    <LessonItem lesson={lesson} index={index} key={lesson._id}/>
                )}
            </div>
        </div>
    );
};

export default LessonList;
