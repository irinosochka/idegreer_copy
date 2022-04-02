import React, {FC, useEffect, useState} from 'react';
import './message.css'

export enum MessageType {
    SUCCESS = 'info',
    ERROR = 'error'
}

interface MessageProps {
    type: MessageType,
    duration?: number
}

const Message: FC<MessageProps> = ({children, type, duration = 3000}) => {

    const [visibility, setVisibility] = useState(true);

    useEffect(() => {
        if (duration && duration > 0) {
            setTimeout(() => setVisibility(false), duration)
        }
    }, [])

    return (
        <>
            {visibility && <div className={`${type === MessageType.ERROR ?  'message-error-wrapper' : 'message-success-wrapper'}`}>
                <span className={`${type === MessageType.ERROR ?  'message-error' : 'message-success'}`}>{children}</span>
            </div>}
        </>
    );
};

export default Message;
