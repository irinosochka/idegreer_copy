import React, {FC, useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import CourseItem from "../components/CourseItem/CourseItem";
import {Context} from "../index";
import {ICourse} from "../models/ICourse";

interface MainPageProps{
}

const MainPage: FC<MainPageProps> = () => {

    const {store} = useContext(Context)

    useEffect(() => {
        store.getAllCourses()
    }, [])

    return (
        <div style={{width: '1200px', display: 'block', margin: '0 auto'}}>
            <h1 style={{textAlign: 'left', marginTop: '20px', fontSize: '20px'}}>All courses</h1>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {store.courses.map((course: ICourse) =>
                    <CourseItem course={course} key={course._id}/>
                )}
            </div>
        </div>
    );
};

export default observer(MainPage);
