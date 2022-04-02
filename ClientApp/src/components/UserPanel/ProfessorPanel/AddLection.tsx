import React, {FC, useEffect, useState} from 'react';
import Message, {MessageType} from "../../../common/Messages/Message";
import Button from "../../../common/button/Button";
import {AppStateType} from "../../../reduxStore/store";
import {actions, addLection} from "../../../reduxStore/lection-reducer";
import {connect} from "react-redux";

interface AddLectionProps {
    onSuccessAddingLection: (bool: boolean) => void,
    addLection: (title: string, description: string, duration: string, link: string, courseId: string) => void,
    successAddingLection: boolean,
    errorAddingLection: boolean
}

const AddLection: FC<AddLectionProps> = ({
                                             successAddingLection,
                                             errorAddingLection,
                                             onSuccessAddingLection,
                                             addLection
                                         }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [link, setLink] = useState('');
    const [course, setCourse] = useState('');

    useEffect(() => {
        return () => onSuccessAddingLection(false)
    }, [])

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        addLection(title, description, duration, link, course);
    }

    return (
        <div>
            {successAddingLection && <Message type={MessageType.SUCCESS}>Lection was added</Message>}
            {errorAddingLection && <Message type={MessageType.ERROR}>Lection adding error</Message>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'title'}/>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                       placeholder={'description'}/>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
                       placeholder={'duration'}/>
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder={'link'}/>
                <input type="text" value={course} onChange={(e) => setCourse(e.target.value)}
                       placeholder={'course id'}/>
                <Button>Add</Button>
            </form>
        </div>
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
