const nodemailer = require('nodemailer')
const CourseService = require('../service/course-service')
const UserService = require('../service/user-service')

class MailController {
    async sendMail(req, res) {
        const courseId = req.body.courseId;
        const userMessage = req.body.message;


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const usersIds = await CourseService.getAllUsersFromCourse(courseId);
        const userArr = []
        for (const user of usersIds.userList) {
            await UserService.getUserUsingId(user).then(res => userArr.push(res.user));
        }
        let mailList = [];
        userArr.forEach(user => mailList.push(user.email))

        const message = {
            from: `IDegreer <${process.env.EMAIL}>`, // sender address
            to: mailList, // list of receivers
            subject: 'IDegreer updates', // Subject line
            text: userMessage, // plain text body
        }

        transporter.sendMail(message, (err, info) => {
            if(err) {
                console.log("error in sending mail", err);
                return res.status(400).json({
                    message: `error in sending mail ${err}`
                })
            } else {
                console.log("successfully send the mail", info)
                return res.json({
                    message: info
                })
            }
        })
    }
}

module.exports = new MailController()
