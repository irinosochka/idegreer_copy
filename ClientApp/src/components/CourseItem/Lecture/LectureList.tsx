import React, {FC} from 'react';
import LessonItem from "./LectureItem";
import './lecture.css'
import {ILection} from "../../../models/ILection";


interface LectureListProps {
    lessons: Array<ILection>,
    setActiveLection: (lection: ILection | null) => void
}

const LectureList: FC<LectureListProps> = ({lessons, setActiveLection}) => {
    return (
        <div className="lecture-container">
            <div className={`video-lecture-list-content ${lessons.length > 8 && 'video-lectures-scroll'}`}>
                {lessons.length === 0 ? <span style={{color: '#000', fontSize: '15px', paddingLeft: '10px'}}>No lections</span> : lessons.map((lesson: ILection, index: number) =>
                    <LessonItem lesson={lesson} index={index} key={lesson._id} setActiveLection={setActiveLection}/>
                )}
            </div>
        </div>
    );
};

export default LectureList;
