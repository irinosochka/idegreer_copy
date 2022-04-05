import React, {FC} from 'react';
import {ILection} from "../../../models/ILection";

interface LessonItemProps {
    lesson: ILection,
    index: number,
    setActiveLection: (lection: ILection | null) => void
}

const LessonItem: FC<LessonItemProps> = ({lesson, index, setActiveLection}) => {

    return (
        <div className="lesson" onClick={() => setActiveLection(lesson)}>
            <div style={{display: 'flex'}}>
                <strong>{index + 1}</strong>
                <div style={{marginLeft: '15px'}}>{lesson.title}</div>
            </div>
            <div style={{width: '70px', textAlign: 'right'}}>{lesson.duration}</div>
        </div>
    );
};

export default LessonItem;
