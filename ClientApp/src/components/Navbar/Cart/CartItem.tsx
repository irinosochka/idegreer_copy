import React, {FC} from 'react';
import './cartItem.css';
import {ICourse} from "../../../models/ICourse";
import progIcon from "../../../assets/img/programmingIcon.svg";
import removeIcon from "../../../assets/img/remove-svgrepo-com.svg";
import {connect} from "react-redux";
import {actions} from "../../../reduxStore/user-reducer";

interface CourseItemProps {
    course: ICourse,
    removeOneCourseFromCart: (courseId: string) => void
}

const CourseItem: FC<CourseItemProps> = ({course, removeOneCourseFromCart}) => {
    return (
        <div className={"cart__item"}>
            <div className={"cart__item__img"}>
                <img style={{height: '120px'}} src={progIcon} alt=""/>
            </div>

            <div className={"cart__item__description"}>
                <h2 className={"item_title"} >{course.title}</h2>
                <h3 className={"item_theme"}>{course.theme}</h3>
                {course.author && <div className={"item_author"}> {course.author.name} </div>}
            </div>

            <div className="cart__item__price">
                {course.price !== '0' ? '$' + course.price : 'Free'}
            </div>

            <div className={"cart__item__img remove_icon"}>
                <img style={{height: '30px'}} src={removeIcon} alt="" onClick={() => removeOneCourseFromCart(course._id)}/>
            </div>
        </div>
    );
};

export default connect(null, {removeOneCourseFromCart: actions.removeOneCourseFromCart})(CourseItem);
