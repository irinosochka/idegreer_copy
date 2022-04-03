import {$course} from "../http";
import {CourseResponse} from "../models/response/CourseResponse";

export default class CourseService {
    static addCourse(userId: string, title: string, theme: string, description: string, price: string): Promise<any> {
        return $course.post<CourseResponse>('/add', {userId, title, theme, description, price}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static changeCourseData(courseId: string, newTitle: string, newTheme: string, newDescription: string, newPrice: string): Promise<any> {
        return $course.post<CourseResponse>('/changeCourseData', {courseId, newTitle, newTheme, newDescription, newPrice}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static getCourses(): Promise<any> {
        return $course.get<Array<CourseResponse>>('/getAllCourses').then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static getCoursesOfAuthor(authorId: string): Promise<any> {
        return $course.get<Array<CourseResponse>>(`/getCoursesByAuthorId/${authorId}`).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static getCourse(courseId: string): Promise<any> {
        return $course.get<Array<CourseResponse>>(`/getCourse/${courseId}`).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static deleteCourse(courseId : string): Promise<any> {
        return $course.delete<Array<CourseResponse>>(`deleteCourseById/${courseId}`).then(res =>{
            return res
        }).catch(e => console.log(e))
    }
}
