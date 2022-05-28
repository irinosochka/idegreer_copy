import React, {useEffect, useState} from 'react';
import {AppStateType} from "../../../reduxStore/store";
import {connect} from "react-redux";
import {actions, getAllLectionsFromCourse} from "../../../reduxStore/lection-reducer";
import {ILection} from "../../../models/ILection";
import EditLecture from "./EditLecture";
import {getOneCourse} from "../../../reduxStore/course-reducer";

interface ListOfLecturesProps {
    selectedCourseId: string | undefined,
    lections: ILection[],
    getAllLectionsFromCourse: (courseId: string) => void,
    getOneCourse: (courseId: string) => void,
    setLections: () => void
}

const LecturesList: React.FC<ListOfLecturesProps> = ({
                                                         selectedCourseId,
                                                         getAllLectionsFromCourse,
                                                         lections,
                                                         getOneCourse,
                                                         setLections
                                                     }) => {
    const [selectedLection, setSelectedLection] = useState<ILection>();
    const [visibleEditLection, setVisibleEditLection] = useState(false);
    const [visibleLections, setVisibleLections] = useState(true);

    const handleSelectingLection = (lection: ILection) => {
        setSelectedLection(lection);
        setVisibleEditLection(true);
        setVisibleLections(false);
    }

    useEffect(() => {
        if (selectedCourseId) {
            getOneCourse(selectedCourseId)
            getAllLectionsFromCourse(selectedCourseId);
        }
    }, [])

    useEffect(() => {
        setLections()
    }, [selectedCourseId])

    return (
        <div className={"edit__container"}>
            {visibleLections && <div>{lections.length !== 0 ? lections.map((lection: ILection) => {
                return <div
                    onClick={() =>
                        handleSelectingLection(lection)}
                    key={lection._id}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: '#8691ca',
                        margin: '10px',
                        padding: '12px'
                    }}> {lection.title} </div>
            }) : 'No lectures'}</div>}
            {visibleEditLection &&
                <div style={{position: 'relative'}}>{selectedLection &&
                    <EditLecture selectedLection={selectedLection} setVisibleEditLection={setVisibleEditLection}
                                 setVisibleLections={setVisibleLections}/>}</div>
            }
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        lections: state.lection.lections,
        course: state.course.course
    }
}
export default connect(mapStateToProps, {
    getAllLectionsFromCourse,
    getOneCourse,
    setLections: actions.setLections
})(LecturesList);
