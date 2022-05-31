import {$lection} from "../http";
import {CourseResponse} from "../models/response/CourseResponse";
import {LectionResponse} from "../models/response/LectionResponse";

export default class AddService {
    static addLection(title: string, description: string, link: string, homework: string, courseId: string): Promise<any> {
        return $lection.post<CourseResponse>('/addLection', {title, description, link, homework, courseId}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static updateLectionData(lectionId: string, title: string, description: string, link: string, homework: string): Promise<any> {
        return $lection.post<CourseResponse>('/updateLectionData', {lectionId, title, description, link, homework}).then(res => {
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


    static getHomeworkResponse(userId: string, courseId: string, lectionId: string): Promise<any> {
        return $lection.get<LectionResponse>(`/getHomeworkResponse/${courseId}/${userId}/${lectionId}`).then(res => {
                return res
            }).catch(e => console.log(e))
    }

    static getMembersWithHomework(courseId: string, lectionId: string): Promise<any> {
        return $lection.get<LectionResponse>(`/getMembersWithHomework/${courseId}/${lectionId}`).then(res => {
                return res
            }).catch(e => console.log(e))
    }

    static addHomeworkResponse(userId: string, courseId: string, lectionId: string, response: string): Promise<any> {
        return $lection.post<CourseResponse>('/addHomeworkResponse', {userId, courseId, lectionId, response}).then(res => {
            return res
        }).catch(e => console.log(e))
    }
}
