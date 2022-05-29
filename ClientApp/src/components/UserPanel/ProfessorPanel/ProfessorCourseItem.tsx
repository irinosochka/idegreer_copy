import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {ICourse} from "../../../models/ICourse";
import {AppStateType} from "../../../reduxStore/store";
import {addUserToCourse, getAllMembersFromCourse} from "../../../reduxStore/course-reducer";
import {getAllLectionsFromCourse} from "../../../reduxStore/lection-reducer";
import progIcon from "../../../assets/img/programmingIcon.svg";
import starIcon from "../../../assets/img/star-svgrepo-com.svg"
import {useNavigate} from "react-router-dom";
import {IUser} from "../../../models/IUser";

interface CourseItemProps {
    courseItem: { course: ICourse, author: IUser },
}

const CourseItem: FC<CourseItemProps> = ({
                                             courseItem,
                                         }) => {

    useEffect(() => {
        getAllLectionsFromCourse(courseItem.course._id);
    }, [courseItem]);

    useEffect(() => {
        getAllMembersFromCourse(courseItem.course._id);
    }, []);

    const navigate = useNavigate()

    const handleManageCourse = () => {
        navigate(`/manage-course/${courseItem.course._id}`)
    }

    const handleShowHomeworks = () => {
        navigate(`/homeworks-list/${courseItem.course._id}`)
    }

    return (
        <tr className="table__row">
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

            <td className="table-button__content" data-heading="Lectures" onClick={()=> handleShowHomeworks()}>Show homeworks</td>
            <td className="table-button__content" data-heading="Course" onClick={()=> handleManageCourse()}>Manage course</td>
        </tr>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
    }
}

export default connect(mapStateToProps, {
    addUserToCourse,
})(CourseItem);
