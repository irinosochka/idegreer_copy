import React, {FC} from 'react';
import '../AuthComponents/auth.scss';
import {ICourse} from "../../models/ICourse";

import reactLogo from '../../assets/img/react-logo.png'

interface CourseItemProps {
    course: ICourse
}

const CourseItem: FC<CourseItemProps> = ({course}) => {

    return (
        <div className={'item__wrapper'}>
            <div style={{width: '100%', textAlign: 'center'}} >
                <img style={{width: '150px', borderRadius: '10px 10px 0 0', position: 'relative', top: '50px'}} src={reactLogo} alt=""/>
            </div>
            <div className="course__item" style={{width: '200px', borderRadius: '30px', padding: '60px 30px 20px 30px', background: 'rgb(77, 98, 67)', color: '#fff'}}>
                <h2 style={{marginBottom: '10px', fontSize: '20px', borderBottom: '3px solid #ee9a46', paddingBottom: '10px'}}>{course.title}</h2>
                <h3 style={{marginBottom: '10px', color: '#9f9f9f', fontSize: '16px'}}>{course.theme}</h3>
                {course.author &&
                <div>
                    <p className="course__author" style={{marginBottom: '10px', color: '#9f9f9f', fontSize: '12px'}}>{course.author.name}</p>
                </div>
                }
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p className="course__description" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}}>{course.price !== '0' ? '$' + course.price : 'Free'}</p>
                    <div style={{cursor: 'pointer', background: '#ee9a46', padding: '10px', borderRadius: '50px', height: '20px', width: '20px', textAlign: 'center', color: '#fff'}}>+</div>
                </div>
            </div>
        </div>
    );
};

export default CourseItem;
