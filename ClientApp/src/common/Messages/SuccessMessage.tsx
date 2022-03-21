import React, {FC} from 'react';
import './successMessage.css';

interface Props {
}

const SuccessMessage: FC<Props> = ({children}) => {
    return (
        <div className={'message-success-wrapper'}>
            <span className={'message-success'}>{children}</span>
        </div>
    );
};

export default SuccessMessage;