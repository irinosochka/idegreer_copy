import React, {FC, useEffect, useState} from 'react';
import Message, {MessageType} from "../../../common/Messages/Message";
import Button from "../../../common/button/Button";
import {AppStateType} from "../../../reduxStore/store";
import {actions, addLection} from "../../../reduxStore/lection-reducer";
import {connect} from "react-redux";
import {ICourse} from "../../../models/ICourse";
import '../userPanel.css'

interface AddLectionProps {
    selectedCourse: ICourse,
    onSuccessAddingLection: (bool: boolean) => void,
    addLection: (title: string, description: string, duration: string, link: string, courseId: string) => void,
    successAddingLection: boolean,
    errorAddingLection: boolean
}

const AddLection: FC<AddLectionProps> = ({
                                             selectedCourse,
                                             successAddingLection,
                                             errorAddingLection,
                                             onSuccessAddingLection,
                                             addLection
                                         }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState(false);
    const [isError, setError] = useState(false);
    //const [course, setCourse] = useState('');

    useEffect(() => {
        return () => onSuccessAddingLection(false)
    }, [])

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        if(title.length === 0 && description.length ===0 && duration.length ===0 && link.length === 0){
            setError(true);
        }
        else if (link.length !== 11 ) {
            setLinkError(true);
        } else {
            addLection(title, description, duration, link, selectedCourse._id);
            setTitle('');
            setDescription('');
            setDuration('');
            setLink('');
            onSuccessAddingLection(false);
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
                    <input type="text" value={duration} className="form-control"
                           onChange={(e) => setDuration(e.target.value)}
                           placeholder={'Duration'}
                    /><label htmlFor="input" className="control-label">Duration:</label>
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
                <Button width={240}>Add</Button>
            </form>
        </>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        successAddingLection: state.lection.successAddingLection,
        errorAddingLection: state.lection.errorAddingLection
    }
}

export default connect(mapStateToProps, {
    onErrorAddingError: actions.onErrorAddingLection,
    onSuccessAddingLection: actions.onSuccessAddingLection,
    addLection
})(AddLection);
