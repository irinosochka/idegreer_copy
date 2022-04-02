import {$lection} from "../http";
import {CourseResponse} from "../models/response/CourseResponse";
import {LectionResponse} from "../models/response/LectionResponse";

export default class AddService {
    static addLection(title: string, description: string, duration: string, link: string, courseId: string): Promise<any> {
        return $lection.post<CourseResponse>('/addLection', {title, description, duration, link, courseId}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static getLectionUsingCourseId(courseId: string): Promise<any> {
        return $lection.get<LectionResponse>(`/getLectionsFromCourse/${courseId}`).then(res => {
                return res
            }).catch(e => console.log(e))
    }
}
