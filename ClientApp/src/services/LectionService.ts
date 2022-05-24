import {$lection} from "../http";
import {CourseResponse} from "../models/response/CourseResponse";
import {LectionResponse} from "../models/response/LectionResponse";

export default class AddService {
    static addLection(title: string, description: string, duration: string, link: string, homework: string, courseId: string): Promise<any> {
        return $lection.post<CourseResponse>('/addLection', {title, description, duration, link, courseId}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static updateLectionData(lectionId: string, title: string, description: string, duration: string, link: string, homework: string): Promise<any> {
        return $lection.post<CourseResponse>('/updateLectionData', {lectionId, title, description, duration, link, homework}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static deleteLection(lectionId: string): Promise<any> {
        return $lection.delete<CourseResponse>(`/deleteLectionById/${lectionId}`).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static getLectionUsingCourseId(courseId: string): Promise<any> {
        return $lection.get<LectionResponse>(`/getLectionsFromCourse/${courseId}`).then(res => {
                return res
            }).catch(e => console.log(e))
    }

    static addHomeworkResponse(userId: string, courseId: string, lectionId: string, response: string): Promise<any> {
        return $lection.post<CourseResponse>('/addHomeworkResponse', {userId, courseId, lectionId, response}).then(res => {
            return res
        }).catch(e => console.log(e))
    }
}
