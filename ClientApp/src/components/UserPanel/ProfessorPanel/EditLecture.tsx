import React, {useState} from 'react';
import {connect} from "react-redux";
import {changeLectionData, deleteLection} from "../../../reduxStore/lection-reducer";
import {ILection} from "../../../models/ILection";
import Button from "../../../common/button/Button";
import closeIcon from "../../../assets/img/close-svgrepo-com.svg";
import Message, {MessageType} from "../../../common/Messages/Message";
import {setCourseChanges} from "../../../reduxStore/course-reducer";
import {addNotification} from "../../../reduxStore/user-reducer";

interface SelectedLectionProps {
    selectedLection: ILection,
    changeLectionData: (lectionId: string, title: string, description: string, duration: string, link: string) => void,
    setVisibleEditLection: (bool: boolean) => void,
    setVisibleLections: (bool: boolean) => void,
    deleteLection: (lectionId: string) => void,
    setCourseChanges: (courseId: string) => void,
    addNotification: (date: string, courseId: string, type: string) => void
}

const EditLecture: React.FC<SelectedLectionProps> = ({
                                                         selectedLection,
                                                         changeLectionData,
                                                         setVisibleEditLection,
                                                         setVisibleLections,
                                                         deleteLection,
                                                         setCourseChanges,
                                                         addNotification}) => {
    const [title, setTitle] = useState(selectedLection.title);
    const [description, setDescription] = useState(selectedLection.description);
    const [duration, setDuration] = useState(selectedLection.duration);
    const [link, setLink] = useState(selectedLection.link);
    const [homework, setHomework] = useState('');
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
            addNotification(new Date().toLocaleDateString(), selectedLection.course._id, `changing lection ${selectedLection.title} on course ${selectedLection.course.title}`)
            setCourseChanges(selectedLection.course._id)
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
                <div className="input-wrapper">
                    <textarea className="form-control"
                              onChange={(event) => {
                                  setHomework(event.target.value);
                              }}
                              value={homework}
                              placeholder={'Homework'}
                              style={{resize: "none", marginBottom: '10px', padding: '5px 15px', width: 'calc(100% - 32px)', height: '80px', borderRadius: '5px'}}
                    /><label style={{ transform: 'translateY(-70px)'}} htmlFor="input" className="control-label">Homework:</label>
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
    setCourseChanges,
    addNotification
})(EditLecture);
