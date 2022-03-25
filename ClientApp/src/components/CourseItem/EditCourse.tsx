import React, {useContext, useEffect, useState} from 'react';

import {observer} from "mobx-react-lite";
import "../AdminPanel/index.css";
// @ts-ignore
import editIcon from "../../assets/img/edit-svgrepo-com.svg"
import {Context} from "../../index";



const EditCourse: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCourse, setShowCourse] = useState(false);

    useEffect(() => {
        store.getAllCourses()
    }, []);

    const {store} = useContext(Context);

    // const addRole = () => {
    //     //
    // };

    return (
        <div>
            <div>
                <h1>Edit courses</h1>
            </div>
            <div className="input__wrapper">
                <input type="text"
                       placeholder="Search course"
                       value={searchTerm}
                       onChange={e => {
                           setSearchTerm(e.target.value);
                           setShowCourse(!showCourse)
                       }}/>
            </div>

            <div className="body">
                {showCourse && store.courses.length?.length === 0 && (
                    <div className="notFound">No Courses Found</div>
                )}

                {store.courses?.filter((course: any ) => {
                    if (searchTerm == "") {
                        return course;
                    } else if(course.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return course;
                    }
                }).map((course: any) => {
                    return(
                        <div className="body__item">
                            <div>
                                <h3>{course?.title}</h3>
                                <p>{course?.theme}</p>
                                <p>Price: {course?.price}</p>
                            </div>
                            <div>
                                <div style={{cursor: 'pointer'}} /*onClick={() => {addRole}}*/>
                                    <img src={editIcon} style={{color: '#fff', width: '15px', height: '15px'}}  alt=""/>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    )
}

export default observer(EditCourse);
