import React, {FC, useState} from 'react';
import "./ProfessorPanel.css"
import {connect} from "react-redux";
import {addUserToCourse} from "../../../reduxStore/course-reducer";
import {AppStateType} from "../../../reduxStore/store";
import Button from "../../../common/button/Button";
import {ILection} from "../../../models/ILection";
import {IUser} from "../../../models/IUser";
import closeIcon from "../../../assets/img/close-svgrepo-com.svg";
import swal from "sweetalert";
import {getHomeworkResponse} from "../../../reduxStore/lection-reducer";

interface ModalWindowProps {
    userId: any,
    active: boolean,
    setActive: (bool: boolean) => void,
    selectedLection: ILection,
    authUser: IUser,
    getHomeworkResponse: (userId: string, courseId: string, lectionId: string) => void
}

const CheckHomeworkModal: FC<ModalWindowProps> = ({userId, active, setActive, selectedLection, authUser}) => {
    const [notice, setNotice] = useState('');
    const [points, setPoints] = useState('');
    const [showNotice, setShowNotice] = useState(false);
    const [isError, setError] = useState(false);

    const addFeedback = () => {
        let pointsNumber = parseInt(points);

        if(points.length !== 0 && pointsNumber >= 0){
            setActive(false);
            swal({
                title: "Remark was added",
                text: "You have check homework!",
                icon: "success",
                buttons: [false],
                timer: 1000
            });
        } else {
            setError(true);
        }
    }


    return (
        <div className={active ? "modal__window__wrapper active" : "modal__window__wrapper"}
             onClick={() => setActive(false)}>
            <div className={active ? "modal__window__homework active" : "modal__window__homework"}
                 onClick={e => e.stopPropagation()}>
                <div className="lecture__title">
                    <h2>{selectedLection.title}</h2>
                    <div style={{paddingLeft: '20px', width: '25px', cursor: 'pointer', filter: 'brightness(0) saturate(100%) invert(99%) sepia(76%) saturate(0%) hue-rotate(337deg) brightness(104%) contrast(102%)'}}>
                        <img src={closeIcon} onClick={() => setActive(false)} alt=""/>
                    </div>
                </div>
                <div className="homework__container">
                    <div className="message">
                        <div className="author-message">
                            <h4>{authUser.name}</h4>
                        </div>
                        <div className="box arrow-top">{selectedLection.homework}</div>
                    </div>
                    <div className="message">
                        <div className="author-message">
                            <h4>{userId._id}</h4>
                            <p>10:23</p>
                        </div>
                        <div className="box arrow-top">{userId.response}</div>
                    </div>
                    <div className="message">
                        <div className="author-message">
                            <h4>{authUser.name}</h4>
                        </div>
                        <div className="box arrow-top">
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <input type="number" min="0"
                                       value={points}
                                       onChange={(e) => {
                                           let regex=/^(\s*|^\d*\.?\d)$/;
                                           if (regex.test(e.target.value)){
                                               setPoints(e.target.value);
                                               setError(false);
                                           }
                                       }}
                                       pattern="^-?[0-9]d*(.d+)?$"
                                       placeholder={'Points'}
                                       style={{width: '100px', textAlign: 'center'}}
                                       className={`input-points ${isError ? 'input-points__error' : ''}`}
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

export default connect(mapStateToProps, {addUserToCourse, getHomeworkResponse})(CheckHomeworkModal);
