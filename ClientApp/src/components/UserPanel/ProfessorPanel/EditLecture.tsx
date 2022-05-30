import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {changeLectionData, deleteLection} from "../../../reduxStore/lection-reducer";
import {ILection} from "../../../models/ILection";
import Button from "../../../common/button/Button";
import closeIcon from "../../../assets/img/close-svgrepo-com.svg";
import Message, {MessageType} from "../../../common/Messages/Message";
import {getAllMembersFromCourse, setCourseChanges} from "../../../reduxStore/course-reducer";
import {addNotification, getUser} from "../../../reduxStore/user-reducer";
import {mailMessageType, sendEditMail} from "../../../reduxStore/mail-reducer";
import {AppStateType} from "../../../reduxStore/store";
import {IUser} from "../../../models/IUser";

interface SelectedLectionProps {
    user: IUser,
    selectedLection: ILection,
    courseMembers: Array<string>,
    changeLectionData: (lectionId: string, title: string, description: string, link: string, homework: string) => void,
    setVisibleEditLection: (bool: boolean) => void,
    setVisibleLections: (bool: boolean) => void,
    deleteLection: (lectionId: string) => void,
    setCourseChanges: (courseId: string) => void,
    addNotification: (date: string, courseId: string, type: string, editChange: Array<string>) => void,
    sendEditLectionMail: (courseId: string, lectionTitle: string, messageType: mailMessageType) => void,
}

const EditLecture: React.FC<SelectedLectionProps> = ({
                                                         selectedLection,
                                                         changeLectionData,
                                                         setVisibleEditLection,
                                                         setVisibleLections,
                                                         deleteLection,
                                                         setCourseChanges,
                                                         addNotification,
                                                         sendEditLectionMail
                                                     }) => {
    const [title, setTitle] = useState(selectedLection.title);
    const [description, setDescription] = useState(selectedLection.description);
    const [link, setLink] = useState(selectedLection.link);
    const [homework, setHomework] = useState(selectedLection.homework);
    const [linkError, setLinkError] = useState(false);
    const [isError, setError] = useState(false);
    const [lectureDataChangedSuccess, setLectureDataChangedSuccess] = useState(false);
    const [editChange, setEditChange] = useState<Array<string>>([])

    const handleClose = (event: any) => {
        event.preventDefault();
        setVisibleEditLection(false);
        setVisibleLections(true);
    };

    const handleDelete = () => {
        if (selectedLection) {
            deleteLection(selectedLection._id);
            setVisibleLections(true);
            setVisibleEditLection(false);
        }
    }

    useEffect(() => {
        return () => setEditChange([])
    }, [])

    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (title.length === 0 && description.length === 0 && link.length === 0) {
            setError(true);
        } else if (link.length !== 11) {
            setLinkError(true);
        } else {
            // setVisibleEditLection(false);
            // setVisibleLections(true);
            setLectureDataChangedSuccess(true);
            changeLectionData(selectedLection._id, title, description, link, homework);
            addNotification(new Date().toLocaleDateString(), selectedLection.course._id, `changing lection ${selectedLection.title} on course ${selectedLection.course.title}`, editChange)
            setCourseChanges(selectedLection.course._id)
            sendEditLectionMail(selectedLection.course._id, selectedLection.title, mailMessageType.EDIT_LECTION)
            setTitle('');
            setDescription('');
            setLink('');
            setHomework('');
        }
    }

    return (
        <>
            {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
            {linkError && <Message type={MessageType.ERROR}>Bad length of the link to lecture</Message>}
            {lectureDataChangedSuccess && <Message type={MessageType.SUCCESS}>Success data changing</Message>}
            <form onSubmit={(e) => e.preventDefault} className="edit__box">
                <div style={{cursor: 'pointer', width: '10px', position: 'absolute', left: '450px', top: '-40px'}}
                     onClick={handleClose}>
                    <img src={closeIcon} alt=""/>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={title} className="form-control"
                           onChange={(e) => setTitle(e.target.value)}
                           onBlur={() => {
                               if (!editChange.includes('Lection name was changed')) {
                                   if (selectedLection.title !== title) {
                                       setEditChange([...editChange, `Lection name was changed from ${selectedLection.title} to ${title}`])
                                   } else {
                                       setEditChange(editChange.filter(e => e !== 'Lection name was changed'))
                                   }
                               }
                           }}
                           placeholder={`Title: ${selectedLection.title}`}
                    /><label htmlFor="input" className="control-label">Title:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={description} className="form-control"
                           onChange={(e) => setDescription(e.target.value)}
                           onBlur={() => {
                               if (!editChange.includes('Lection description was changed')) {
                                   if (selectedLection.description !== description) {
                                       setEditChange([...editChange, `Lection description was changed from ${selectedLection.description} to ${description}`])
                                   } else {
                                       setEditChange(editChange.filter(e => e !== 'Lection description was changed'))
                                   }
                               }
                           }}
                           placeholder={`Description: ${selectedLection.description}`}
                    /><label htmlFor="input" className="control-label">Description:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={link} className="form-control"
                           onChange={(e) => {
                               setLink(e.target.value);
                               setLinkError(false);
                           }}
                           onBlur={() => {
                               if (!editChange.includes('Lection video was changed')) {
                                   if (selectedLection.link !== link) {
                                       setEditChange([...editChange, 'Lection video was changed'])
                                   } else {
                                       setEditChange(editChange.filter(e => e !== 'Lection video was changed'))
                                   }
                               }
                           }}
                           placeholder={`Link: ${selectedLection.link}`}
                    /><label htmlFor="input" className="control-label">Link:</label>
                </div>
                <div className="input-wrapper">
                    <textarea className="form-control"
                              onChange={(event) => {
                                  setHomework(event.target.value);
                              }}
                              onBlur={() => {
                                  if (!editChange.includes('Lection homework was changed')) {
                                      if (selectedLection.homework !== homework) {
                                          setEditChange([...editChange, 'Lection homework was changed'])
                                      } else {
                                          setEditChange(editChange.filter(e => e !== 'Lection homework was changed'))
                                      }
                                  }
                              }}
                              value={homework}
                              placeholder={`Homework: ${selectedLection.homework}`}
                              style={{
                                  resize: "none",
                                  marginBottom: '10px',
                                  padding: '5px 15px',
                                  width: 'calc(100% - 32px)',
                                  height: '80px',
                                  borderRadius: '5px'
                              }}
                    /><label style={{transform: 'translateY(-70px)'}} htmlFor="input"
                             className="control-label">Homework:</label>
                </div>
                <Button onClick={(e) => handleSubmit(e!)} width={240}>Edit</Button>
                <Button onClick={() => handleDelete()} width={240}>Delete</Button>
            </form>
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        authUser: state.auth.authUser,
        courseMembers: state.course.members,
        user: state.user.user
    }
}

export default connect(mapStateToProps, {
    changeLectionData,
    deleteLection,
    setCourseChanges,
    addNotification,
    sendEditLectionMail: sendEditMail,
    getAllMembersFromCourse,
    getUser
})(EditLecture);
