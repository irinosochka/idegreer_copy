import React, {FC, useEffect, useState} from "react";
import {ILection} from "../models/ILection";
import {connect} from "react-redux";
import {AppStateType} from "../reduxStore/store";
import {actions, getMembersWithHomework} from "../reduxStore/lection-reducer";
import CheckHomeworkModal from "../components/UserPanel/ProfessorPanel/CheckHomeworkModal";

interface Props {
    lection: ILection,
    getMembersWithHomework: (courseId: string, lectionId: string) => void,
    membersWithHomework: any,
    setMembersWithHomework: (members: any) => void
}

const HomeworksMembersListItem: FC<Props> = ({
                                                 lection,
                                                 getMembersWithHomework,
                                                 membersWithHomework,
                                                 setMembersWithHomework
                                             }) => {

    const [showHomeworks, setShowHomeworks] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [person, setPerson] = useState<string>('')

    useEffect(() => {
        return () => {
            setShowHomeworks(false);
            setMembersWithHomework([])
        }
    }, [])
    return (
        <li
            onClick={() => {
                if (lection.course._id && lection._id) {
                    getMembersWithHomework(lection.course._id, lection._id)
                }
                if (membersWithHomework.length > 0) {
                    setShowHomeworks(true)
                }
            }
            }
        >{lection.title}
            <div>
                {showHomeworks && <ol>
                    {membersWithHomework.length > 0 && membersWithHomework.map((member: any) => {
                        return <li key={member}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                {member && member.userId && <p onClick={() => {
                                    if (member.userId) {
                                        setPerson(member)
                                        setShowModal(true)
                                    }
                                }}>{member.userId}</p>}
                            </div>
                        </li>
                    })
                    }
                </ol>}
            </div>
            {showModal && <CheckHomeworkModal active={showModal} setActive={setShowModal} selectedLection={lection}
                                              userId={person}/>}
        </li>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        membersWithHomework: state.lection.membersWithHomework
    }
}

export default connect(mapStateToProps, {
    getMembersWithHomework,
    setMembersWithHomework: actions.setMembersWithHomework
})(HomeworksMembersListItem)
