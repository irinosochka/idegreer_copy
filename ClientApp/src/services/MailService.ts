import {$mail} from "../http";

export default class MailService {
    static sendMailAboutLectionChange(courseId: string, message: string): Promise<any> {
        return $mail.post(`/sendmail`, {courseId, message}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }
}
