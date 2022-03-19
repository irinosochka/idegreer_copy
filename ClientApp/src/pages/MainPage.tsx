import React, {FC, useContext} from 'react';
import {Context} from "../index";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import {observer} from "mobx-react-lite";
import AddCourse from "../components/AddCourse/AddCourse";

interface MainPageProps{
    setCourses: (course: any) => void,
    course: any
}

const MainPage: FC<MainPageProps> = ({setCourses, course}) => {

    const {store} = useContext(Context);

    return (
        <div>
            {store.isAuth && <AddCourse setCourses={setCourses} course={course}/>}
            {store.user.roles?.includes('ADMIN') && <AdminPanel />}
        </div>
    );
};

export default observer(MainPage);