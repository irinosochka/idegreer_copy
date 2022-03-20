import {$course} from "../http";
import {CourseResponse} from "../models/response/CourseResponse";

export default class CourseService {
    static addCourse(username: string, title: string, theme: string, description: string, price: string): Promise<any> {
        return $course.post<CourseResponse>('/add', {username, title, theme, description, price}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static getCourses(): Promise<any> {
        return $course.get<Array<CourseResponse>>('/getAllCourses').then(res => {
            return res
        }).catch(e => console.log(e))
    }
}