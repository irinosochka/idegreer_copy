import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import CourseItem from "../components/AddCourse/CourseItem";

interface MainPageProps{
    courses: any
}

const MainPage: FC<MainPageProps> = ({courses}) => {
    return (
        <div style={{width: '1200px', display: 'block', margin: '0 auto'}}>
            <h1 style={{textAlign: 'left', marginTop: '20px', fontSize: '20px', marginLeft: '30px'}}>All courses</h1>
            <div style={{display: 'flex', width: '1000px'}}>
                {courses.map((course: any) =>
                    <CourseItem course={course} key={course.courseName.length}/>
                )}
            </div>
        </div>
    );
};

export default observer(MainPage);