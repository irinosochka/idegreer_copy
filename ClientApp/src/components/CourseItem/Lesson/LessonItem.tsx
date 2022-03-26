import React, {FC} from 'react';
interface LessonItemProps {
    lesson: any
}

const LessonItem: FC<LessonItemProps> = ({lesson}) => {
    return (
        <div className="lesson">
            <strong>{lesson.id}</strong>
            <div>{lesson.title}</div>
            <div>{lesson.time}</div>
        </div>
    );
};

export default LessonItem;