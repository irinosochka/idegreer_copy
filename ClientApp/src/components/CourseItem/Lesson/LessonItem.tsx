import React, {FC} from 'react';
import {ILection} from "../../../models/ILection";
interface LessonItemProps {
    lesson: ILection,
    index: number
}

const LessonItem: FC<LessonItemProps> = ({lesson, index}) => {
    return (
        <div className="lesson">
            <strong>{index + 1}</strong>
            <div>{lesson.title}</div>
            <div>{lesson.duration}</div>
        </div>
    );
};

export default LessonItem;
