const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: "mongodb+srv://admin:admin@cluster0.lq28g.mongodb.net/" + "myFirstDatabase",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-idegreer-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-idegreer-${file.originalname}`
        };
    }
});

const uploadFiles = multer({ storage: storage }).array("file", 10);
const uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
