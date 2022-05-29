import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {ICourse} from "../../../models/ICourse";
import {ILection} from "../../../models/ILection";
import {AppStateType} from "../../../reduxStore/store";
import {addUserToCourse, getAllMembersFromCourse} from "../../../reduxStore/course-reducer";
import {getAllLectionsFromCourse} from "../../../reduxStore/lection-reducer";
import progIcon from "../../../assets/img/programmingIcon.svg";
import starIcon from "../../../assets/img/star-svgrepo-com.svg"
import {useNavigate} from "react-router-dom";
import {IUser} from "../../../models/IUser";

interface CourseItemProps {
    courseItem: { course: ICourse, author: IUser },
    getAllLectionsFromCourse: (courseId: string) => void,
    lections: ILection[],
    members: Array<string>,
    getAllMembersFromCourse: (courseId: string) => void,
}

const CourseItem: FC<CourseItemProps> = ({
                                        courseItem,
                                        lections,
                                        getAllLectionsFromCourse,
                                        members,
                                        getAllMembersFromCourse,
                                    }) => {

    useEffect(() => {
        getAllLectionsFromCourse(courseItem.course._id);
    }, [courseItem]);

    useEffect(() => {
        getAllMembersFromCourse(courseItem.course._id);
    }, []);

    const navigate = useNavigate()

    const handleRowClick = () => {
        navigate(`/manage-course/${courseItem.course._id}`)
    }
    return (
        <tr onClick={()=> handleRowClick()} className="table__row" style={{cursor: "pointer"}}>
            <td className="table__content course-info__content" data-heading="Course name">
                <div className="course-icon__content">
                    <img className="course__icon" src={progIcon} alt=""/>
                </div>
                <div>
                    <p className="course-title__text">{courseItem.course.title}</p>
                    <p className="author__text">{courseItem.author.name}</p>
                </div>
            </td>
            {/*<td className="table__content" data-heading="Rate">*/}
            {/*    <div className="rate__text">*/}
            {/*        <img className="star__icon" src={starIcon} alt=""/>*/}
            {/*        <p>4.8</p>*/}
            {/*    </div>*/}
            {/*</td>*/}
            <td className="table__content" data-heading="Type">
                <div className="type__text">
                    <p>{courseItem.course.theme}</p>
                </div>
            </td>

            <td className="table__content" data-heading="Members">{members.length}</td>
            <td className="table__content" data-heading="Lectures">{lections.length}</td>
        </tr>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        lections: state.lection.lections,
        members: state.course.members
    }
}

export default connect(mapStateToProps, {
    getAllLectionsFromCourse,
    addUserToCourse,
    getAllMembersFromCourse
})(CourseItem);
