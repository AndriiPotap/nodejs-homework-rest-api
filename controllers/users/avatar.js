const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;

const avatar = async (req, res, next) => {
    const {_id: id} = req.user;
    const {path: tmpUpload, originalname } = req.file;
try {
    const uploadDir = path.resolve("pablic/avatar");
    const [ext] = originalname.split(".").revers();
    const avatarFileName = `${id}.${ext}`;
    const avatarFilePath = path.join(uploadDir, avatarFileName);
   await fs.rename(tmpUpload, avatarFilePath);
   const avatarURL = `/avatar/${avatarFileName}`;
   await User.findByIdAndUpdate(id, {avatarURL}); 
   res.status(200).json({
    "Content-Type": "application/json",
    ResponseBody: {
        avatarURL: avatarURL,
    },
   })
} catch (error) {
    res.status(401).json({
        "Content-Type": "application/json",
        ResponseBody: {
            message: "Not authorized!",
        }
    })
    
}
}

module.exports = avatar;