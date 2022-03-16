import {$course} from "../http";

export default class CourseService {
    static addCourse(username: string, password: string, title: string, theme: string, description: string): Promise<any> {
        return $course.post('/add', {username, password, title, theme, description}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static getCourses(): Promise<any> {
        return $course.get('/getAllCourses').then(res => {
            return res
        }).catch(e => console.log(e))
    }
}