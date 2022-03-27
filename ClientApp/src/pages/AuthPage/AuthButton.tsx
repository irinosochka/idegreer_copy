import React, {FC} from 'react';

interface AuthButtonProps {
    isLogin: boolean,
    setLogin: () => void
}

const AuthButton: FC<AuthButtonProps> = ({isLogin, setLogin, children}) => {

    return (
        <button className={`reg__btn ${isLogin ? 'active' : ''}`} onClick={setLogin}>
            {children}
        </button>
    );
};

export default AuthButton;
