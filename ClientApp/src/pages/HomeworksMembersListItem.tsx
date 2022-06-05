import React, {FC, useEffect, useState} from "react";
import {ILection} from "../models/ILection";
import {connect} from "react-redux";
import {AppStateType} from "../reduxStore/store";
import {actions, getMembersWithHomework} from "../reduxStore/lection-reducer";
import CheckHomeworkModal from "../components/UserPanel/ProfessorPanel/CheckHomeworkModal";
import HomeworksItemMemeberList from "./HomeworksItemMemeberList";

interface Props {
    lection: ILection,
    getMembersWithHomework: (courseId: string, lectionId: string) => any,
    membersWithHomework: any,
    setMembersWithHomework: (members: any) => void
}

const HomeworksMembersListItem: FC<Props> = ({
                                                 lection,
                                                 getMembersWithHomework,
                                             }) => {

    const [showHomeworks, setShowHomeworks] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [person, setPerson] = useState<string>('')
    const [member, setMember] = useState([])
    //
    // useEffect(() => {
    //         getMembersWithHomework(lection.course._id, lection._id).then((res: any) => res && setMember(res))
    // }, [])

    useEffect(() => {
        return () => setMember([])
    }, [])

    return (
        <>
            <li onClick={async () => {
                await getMembersWithHomework(lection.course._id, lection._id).then((res: any) => res && setMember(res))
                setShowHomeworks(!showHomeworks)
            }}>
                <span>{lection.title}</span>
                {showHomeworks && <div>
                    <ol>
                        {member.length > 0 && member.map((member: any) => {
                            return <React.Fragment key={member._id}><HomeworksItemMemeberList member={member} setShowModal={setShowModal}
                                                                             setPerson={setPerson}/></React.Fragment>
                        })
                        }
                    </ol>
                </div>}
            </li>
            {showModal && <CheckHomeworkModal active={showModal} setActive={setShowModal} selectedLection={lection}
                                              userId={person}/>}
        </>
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
