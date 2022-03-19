import {FC} from 'react';
import './infoMessage.css'

interface Props {
}

const ErrorMessage: FC<Props> = ({children}) => {
    return (
        <div className={'message-error-wrapper'}>
            <span className={'message-error'}>{children}</span>
        </div>
    );
};

export default ErrorMessage;