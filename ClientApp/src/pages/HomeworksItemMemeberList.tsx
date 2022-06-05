import React, {FC, useEffect, useState} from "react";
import {connect} from "react-redux";
import {getUser} from "../reduxStore/user-reducer";

interface Props {
    member: any,
    setShowModal: (bool: boolean) => void
    setPerson: (userId: any) => void,
    getUser: (userId: string) => any
}

const HomeworksItemMemers: FC<Props> = ({member, setShowModal, setPerson, getUser}) => {

    const [courseUser, setCourseUser] = useState<any>();

    useEffect(() => {
        getUser(member.userId).then((res: any) => setCourseUser(res))
    }, [])

    return (
        <>
            <li key={member}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {member && courseUser && member.userId && <p onClick={() => {
                        setShowModal(true)
                        setPerson(member)
                    }}>{courseUser.name}</p>}
                </div>
            </li>
        </>
    )
}

export default connect(null, {getUser})(HomeworksItemMemers)
