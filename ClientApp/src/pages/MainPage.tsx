import React, {FC, useContext} from 'react';
import {Context} from "../index";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import {observer} from "mobx-react-lite";
import CourseItem from "../components/AddCourse/CourseItem";
interface MainPageProps{
    courses: any
}

const MainPage: FC<MainPageProps> = ({courses}) => {

    const {store} = useContext(Context);

    return (
        <div>
            {store.isAuth}
            {store.user.roles?.includes('ADMIN') && <AdminPanel />}
            <div className="list_courses">
                <h1 style={{textAlign: 'center', marginTop: '20px'}}>List of courses</h1>
                {courses.map((course: any) =>
                    <CourseItem course={course} key={course.courseName.length}/>
                )}
            </div>
        </div>
    );
};

export default observer(MainPage);