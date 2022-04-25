import React, {ChangeEvent, useState} from 'react';
import {AppStateType} from "../../reduxStore/store";
import {connect} from "react-redux";
import {actions, changeCourseData} from "../../reduxStore/course-reducer";
import {changeLectionData, deleteLection, getAllLectionsFromCourse} from "../../reduxStore/lection-reducer";
import {ILection} from "../../models/ILection";
import {ICourse} from "../../models/ICourse";
import Button from "../../common/button/Button";
import closeIcon from "../../assets/img/close-svgrepo-com.svg";
import Message, {MessageType} from "../../common/Messages/Message";

interface SelectedLectionProps {
    selectedLection: ILection,
    changeLectionData: (lectionId: string, title: string, description: string, duration: string, link: string) => void,
    setVisibleEditLection: (bool: boolean) => void,
    setVisibleLections: (bool: boolean) => void,
    deleteLection: (lectionId: string) => void,
}

const EditLecture: React.FC<SelectedLectionProps> = ({
                                                         selectedLection,
                                                         changeLectionData,
                                                         setVisibleEditLection,
                                                         setVisibleLections,
                                                         deleteLection}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState(false);
    const [isError, setError] = useState(false);

    const handleClose = (event: any) => {
        event.preventDefault();
        setVisibleEditLection(false);
        setVisibleLections(true);
    };

    const handleDelete = () => {
        if(selectedLection) {
            deleteLection(selectedLection._id);
            setVisibleLections(true);
            setVisibleEditLection(false);
            console.log(selectedLection);
        }
    }

    const handleSubmit = (e:React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if(title.length === 0 && description.length === 0 && duration.length === 0 && link.length === 0){
            setError(true);
        }
        else if (link.length !== 11 ) {
            setLinkError(true);
        } else {
            setVisibleLections(true);
            setVisibleEditLection(false);
            changeLectionData(selectedLection._id, title, description, duration, link);
            setTitle('');
            setDescription('');
            setDuration('')
            setLink('');
        }
    }

    return (
        <>
            {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
            {linkError && <Message type={MessageType.ERROR}>Bad length of the link to lecture</Message>}
            <form onSubmit={(e) => e.preventDefault} className="edit__box" >
                <div style={{cursor: 'pointer', width: '10px', position: 'absolute', left: '450px', top:'-40px'}} onClick={handleClose}>
                    <img src={closeIcon} alt=""/>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={title} className="form-control"
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder={`Title: ${selectedLection.title}`}
                    /><label htmlFor="input" className="control-label">Title:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={description} className="form-control"
                           onChange={(e) => setDescription(e.target.value)}
                           placeholder={`Description: ${selectedLection.description}`}
                    /><label htmlFor="input" className="control-label">Description:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={duration} className="form-control"
                           onChange={(e) => setDuration(e.target.value)}
                           placeholder={`Duration: ${selectedLection.duration}`}
                    /><label htmlFor="input" className="control-label">Duration:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={link} className="form-control"
                           onChange={(e) => {
                               setLink(e.target.value);
                               setLinkError(false);
                           }}
                           placeholder={`Link: ${selectedLection.link}`}
                    /><label htmlFor="input" className="control-label">Link:</label>
                </div>
                <Button onClick={(e) => handleSubmit(e!)} width={240}>Edit</Button>
                <Button onClick={() => handleDelete()} width={240}>Delete</Button>
            </form>
        </>
    );
};

export default connect(null, {
    changeLectionData,
    deleteLection,
})(EditLecture);