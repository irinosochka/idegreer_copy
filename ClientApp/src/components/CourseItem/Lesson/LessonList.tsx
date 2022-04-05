import React, {FC} from 'react';
import LessonItem from "./LessonItem";
import './lesson.css'
import {ILection} from "../../../models/ILection";


interface LessonListProps {
    lessons: Array<ILection>,
    setActiveLection: (lection: ILection | null) => void
}

const LessonList: FC<LessonListProps> = ({lessons, setActiveLection}) => {
    return (
        <div className="lessons-container">
            <header className="content-header">
                List of lessons
            </header>
            <div className={`video-lessons-list-content ${lessons.length > 8 && 'video-lessons-scroll'}`}>
                {lessons.length === 0 ? <span style={{color: '#000', fontSize: '15px', paddingLeft: '10px'}}>No lections</span> : lessons.map((lesson: ILection, index: number) =>
                    <LessonItem lesson={lesson} index={index} key={lesson._id} setActiveLection={setActiveLection}/>
                )}
            </div>
        </div>
    );
};

export default LessonList;
