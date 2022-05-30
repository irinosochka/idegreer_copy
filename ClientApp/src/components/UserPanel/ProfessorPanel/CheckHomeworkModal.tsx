import React, {FC, useState} from 'react';
import "./ProfessorPanel.css"
import {connect} from "react-redux";
import {addUserToCourse} from "../../../reduxStore/course-reducer";
import {AppStateType} from "../../../reduxStore/store";
import Button from "../../../common/button/Button";
import {ILection} from "../../../models/ILection";
import {IUser} from "../../../models/IUser";

interface ModalWindowProps {
    active: boolean,
    setActive: (bool: boolean) => void,
    selectedLection: ILection,
    authUser: IUser,
}

const CheckHomeworkModal: FC<ModalWindowProps> = ({active, setActive, selectedLection, authUser}) => {
    const [notice, setNotice] = useState('');
    const [points, setPoints] = useState('');
    const [showNotice, setShowNotice] = useState(false);

    const addFeedback = () => {
        setActive(false);
    }

    return (
        <div className={active ? "modal__window__wrapper active" : "modal__window__wrapper"}
             onClick={() => setActive(false)}>
            <div className={active ? "modal__window__homework active" : "modal__window__homework"}
                 onClick={e => e.stopPropagation()}>
                <h2 className='lecture__title'>{selectedLection.title}</h2>
                <div className="homework__container">
                    <div className="message">
                        <div className="author-message">
                            <h4>{authUser.name}</h4>
                        </div>
                        <div className="box arrow-top">{selectedLection.homework}</div>
                    </div>
                    <div className="message">
                        <div className="author-message">
                            <h4>Iryna Novoselska</h4>
                            <p>10:23</p>
                        </div>
                        <div className="box arrow-top">Etiam sit amet consequat arcu, non tincidunt ipsum. Sed luctus felis leo, eget suscipit velit tempor in. Proin vitae tortor tristique, dignissim urna eu, scelerisque erat.</div>
                    </div>
                    <div className="message">
                        <div className="author-message">
                            <h4>{authUser.name}</h4>
                        </div>
                        <div className="box arrow-top">
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <input type="number"
                                       value={points}
                                       onChange={(e) => {
                                           setPoints(e.target.value);
                                       }}
                                       placeholder={'Points'}
                                       style={{width: '100px', textAlign: 'center'}}
                                />
                                {!showNotice && <h4 onClick={() => setShowNotice(true)}>Add notice</h4>}
                                {showNotice && <h4 onClick={() => setShowNotice(false)}>Hide notice</h4>}
                            </div>
                            {showNotice && <textarea className="form-control"
                                          onChange={(event) => {
                                              setNotice(event.target.value);
                                          }}
                                          value={notice}
                                          placeholder={'Notice'}
                                          style={{resize: "none", padding: '5px 15px', width: 'calc(100% - 32px)', height: '80px', borderRadius: '5px', marginRight: '10px'}}
                                /> }
                        </div>
                    </div>
                    <Button width={100} onClick={() => addFeedback()}>Send</Button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        addUserToCourseSuccess: state.course.addUserToCourseSuccess,
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {addUserToCourse})(CheckHomeworkModal);
