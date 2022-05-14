import React, {FC} from 'react';
import {ILection} from "../../../models/ILection";

interface LectureItemProps {
    lesson: ILection,
    index: number,
    setActiveLection: (lection: ILection | null) => void
}

const LectureItem: FC<LectureItemProps> = ({lesson, index, setActiveLection}) => {

    return (
        <div className="lecture" onClick={() => setActiveLection(lesson)}>

            <div style={{fontWeight: '500', marginRight: '10px'}}>{index + 1}</div>
            <div style={{width: '200px', textAlign: 'left'}}>
                <div style={{fontWeight: '500', marginBottom: '6px'}}>{lesson.title}</div>
                <div style={{color: '#a1a1a1', fontSize: '14px'}}>{lesson.duration}</div>
            </div>
            <div>
                <div style={{
                    borderRadius: '50%',
                    backgroundColor: '#80b900',
                    cursor: 'pointer',
                    display: 'flex',
                    marginRight: '10px',
                    border: '1px solid #fff',
                    width: '40px',
                    height: '40px',
                    fontSize: '11px'
                }}>
                <h2 style={{margin: 'auto', color: 'white', fontWeight: 400}}>
                   8.5
                </h2>
                </div>
            </div>
        </div>
    );
};

export default LectureItem;
