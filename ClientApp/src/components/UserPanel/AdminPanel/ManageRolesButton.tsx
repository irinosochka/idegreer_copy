import React, {FC} from 'react';

interface ManageRolesButtonProps {
    isAddCourse: boolean,
    setAddCourse: () => void
}

const ManageRolesButton: FC<ManageRolesButtonProps> = ({isAddCourse, setAddCourse, children}) => {

    return (
        <button className={`role__btn ${isAddCourse ? 'active' : ''}`} onClick={setAddCourse}>
            {children}
        </button>
    );
};

export default ManageRolesButton;
