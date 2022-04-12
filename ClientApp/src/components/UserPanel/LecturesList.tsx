import React, {useEffect, useState} from 'react';
import {ICourse} from "../../models/ICourse";
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {changeLectionData, getAllLectionsFromCourse} from "../../reduxStore/lection-reducer";
import {ILection} from "../../models/ILection";
import EditLecture from "./EditLecture";

interface ListOfLecturesProps {
    selectedCourse: ICourse,
    lections: ILection[],
    getAllLectionsFromCourse: (courseId: string) => void,
}

const LecturesList: React.FC<ListOfLecturesProps> = ({selectedCourse, getAllLectionsFromCourse, lections}) => {
    const [selectedLection, setSelectedLection] = useState<ILection>();
    const [visibleEditLection, setVisibleEditLection] = useState(false);
    const [visibleLections, setVisibleLections] = useState(true);

    const handleSelectingLection = (lection: ILection) => {
        setSelectedLection(lection);
        setVisibleEditLection(true);
        setVisibleLections(false);
    }

    useEffect(() => {
        getAllLectionsFromCourse(selectedCourse._id);
    }, [lections])

    return (
        <div className={"edit__container"}>
            {visibleLections && <div style={{position: 'absolute'}}>{lections.length !== 0 ? lections.map((lection:ILection) => {
                return <div
                    onClick={() =>
                        handleSelectingLection(lection)}
                    key={lection._id}
                    style={{cursor: 'pointer', backgroundColor: 'orange', margin: '10px', padding: '12px'}}> {lection.title} </div>
            }): 'No lectures'}</div> }
            {visibleEditLection &&
                <div style={{position: 'relative'}}>{selectedLection && <EditLecture selectedLection={selectedLection} setVisibleEditLection={setVisibleEditLection} setVisibleLections={setVisibleLections}/> }</div>
            }
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        lections: state.lection.lections
    }
}
export default connect(mapStateToProps, {
    getAllLectionsFromCourse
})(LecturesList);