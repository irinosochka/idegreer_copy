import React, {FC} from 'react';

interface TwoButtonsProps {
    isFirst: boolean,
    setFirst: () => void,
}

const TwoButtons: FC<TwoButtonsProps> = ({isFirst, setFirst, children}) => {

    return (
        <button className={`role__btn ${isFirst ? 'active' : ''}`} onClick={setFirst} style={{marginBottom: '20px'}}>
            {children}
        </button>
    );
};

export default TwoButtons;
