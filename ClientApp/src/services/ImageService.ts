import axios from "axios";

export default class CourseService {
    static addPhoto(formData: FormData): Promise<any> {
        return axios.post('http://localhost:5000/upload', formData).then(res => console.log(res)).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static getPhoto(name: string): Promise<any> {
        return axios.get(`http://localhost:5000/files/${name}`, { responseType: 'arraybuffer' },).then(res => {
            return res
        }).catch(e => console.log(e))
    }

}

