import React, {FC, useEffect, useState} from 'react';
import Message, {MessageType} from "../../../common/Messages/Message";
import Button from "../../../common/button/Button";
import {AppStateType} from "../../../reduxStore/store";
import {actions, addLection} from "../../../reduxStore/lection-reducer";
import {connect} from "react-redux";
import {ICourse} from "../../../models/ICourse";
import '../userPanel.css'
import {addNotification} from "../../../reduxStore/user-reducer";
import {mailMessageType, sendEditMail} from "../../../reduxStore/mail-reducer";
import {getOneCourse} from "../../../reduxStore/course-reducer";
import {IUser} from "../../../models/IUser";

interface AddLectureProps {
    selectedCourseId: string | undefined,
    course: { course: ICourse, author: IUser },
    onSuccessAddingLection: (bool: boolean) => void,
    addLection: (title: string, description: string, link: string, homework: string, courseId: string) => void,
    successAddingLection: boolean,
    errorAddingLection: boolean,
    addNotification: (date: string, courseId: string, type: string, change: Array<string>) => void,
    sendEditLectionMail: (email: string, lectionTitle: string, messageType: mailMessageType) => void,
    getOneCourse: (courseId: string) => void
}

const AddLecture: FC<AddLectureProps> = ({
                                             selectedCourseId,
                                             course,
                                             successAddingLection,
                                             errorAddingLection,
                                             onSuccessAddingLection,
                                             addLection,
                                             addNotification,
                                             sendEditLectionMail,
                                             getOneCourse
                                         }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [homework, setHomework] = useState('');
    const [linkError, setLinkError] = useState(false);
    const [isError, setError] = useState(false);
    //const [course, setCourse] = useState('');
    const [editChange, setEditChange] = useState([`lection ${title} was added`])

    useEffect(() => {
        if (selectedCourseId) {
            getOneCourse(selectedCourseId)
        }
    }, [])

    useEffect(() => {
        return () => {
            onSuccessAddingLection(false)
            setLinkError(false);
            setEditChange([])
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        if(title.length === 0 && description.length ===0 && link.length === 0){
            setError(true);
        }
        else if (link.length !== 11 ) {
            setLinkError(true);
        } else {
            if(selectedCourseId) {
                addLection(title, description, link, homework, selectedCourseId);
            }
            const now = new Date().toLocaleDateString();
            addNotification(now, course.course._id, 'adding lection', editChange)
            sendEditLectionMail(course.course._id, course.course.title, mailMessageType.ADD_LECTION)
            // setCourseChanges(selectedCourse._id)
            setTitle('');
            setDescription('');
            setLink('');
            onSuccessAddingLection(false);
            setLinkError(false);
            setHomework('');
        }
    }

    return (
        <>
            {isError && <Message type={MessageType.ERROR}>Fields can't be empty</Message>}
            {successAddingLection && <Message type={MessageType.SUCCESS}>Lecture was added</Message>}
            {errorAddingLection && <Message type={MessageType.ERROR}>Lecture adding error</Message>}
            {linkError && <Message type={MessageType.ERROR}>Bad length of the link to lecture</Message>}
            <form className="edit__box" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input type="text" value={title} className="form-control"
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder={'Title'}
                    /><label htmlFor="input" className="control-label">Title:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={description} className="form-control"
                           onChange={(e) => setDescription(e.target.value)}
                        placeholder={'Description'}
                    /><label htmlFor="input" className="control-label">Description:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={link} className="form-control"
                           onChange={(e) => {
                               setLink(e.target.value);
                               setLinkError(false);
                           }}
                           placeholder={'Link'}
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
                <Button width={240}>Add</Button>
            </form>
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        successAddingLection: state.lection.successAddingLection,
        errorAddingLection: state.lection.errorAddingLection,
        course: state.course.course
    }
}

export default connect(mapStateToProps, {
    onErrorAddingError: actions.onErrorAddingLection,
    onSuccessAddingLection: actions.onSuccessAddingLection,
    addLection,
    addNotification,
    sendEditLectionMail: sendEditMail,
    getOneCourse
})(AddLecture);
