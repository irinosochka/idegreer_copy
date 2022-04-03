import React, {FC} from 'react';
import {ILection} from "../../../models/ILection";
interface LessonItemProps {
    lesson: ILection,
    index: number,
    setActiveLection: (lection: ILection) => void
}

const LessonItem: FC<LessonItemProps> = ({lesson, index, setActiveLection}) => {
    return (
        <div className="lesson" onClick={() => setActiveLection(lesson)}>
            <strong>{index + 1}</strong>
            <div>{lesson.title}</div>
            <div>{lesson.duration}</div>
        </div>
    );
};

export default LessonItem;
