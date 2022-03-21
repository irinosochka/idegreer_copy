import React, {FC} from 'react';
import './message.css'

export enum MessageType {
    SUCCESS = 'info',
    ERROR = 'error'
}

interface MessageProps {
    type: MessageType
}

const Message: FC<MessageProps> = ({children, type}) => {
    return (
        <div className={`${type === MessageType.ERROR ?  'message-error-wrapper' : 'message-success-wrapper'}`}>
            <span className={`${type === MessageType.ERROR ?  'message-error' : 'message-success'}`}>{children}</span>
        </div>
    );
};

export default Message;
