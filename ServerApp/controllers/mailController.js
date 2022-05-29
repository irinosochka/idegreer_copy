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
            html: `<body style="width: 500px;
                      font-family: BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
                      text-align: center">
                      <div style="background-color: #6675bc; color: #fff; height: 100px; ">
                        <h1 style="font-weight: 500">iDegreer</h1>
                        <h3 style="font-weight: 400">You have a new notification</h3>
                      </div>
                      <div style="margin-bottom: 30px">
                        <p style="color: #000">Hi,</p>
                        <p style="color: #000">${userMessage}</p>
                        <p style="color: #000">Please go to iDegreer to see changes.</p>
                      </div>
                      <div style="background-color: #cacaca;
                        height: auto;
                        padding: 15px;
                        margin-top: 20px">
                        <h3 style="font-weight: 500; color: #000">Thanks for using iDegreer</h3>
                      </div>
                    </body>`
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
