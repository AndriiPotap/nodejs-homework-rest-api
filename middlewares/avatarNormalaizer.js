const jimp = require("jimp");

const avatarNormalaizer = async (req, res, next) => {
try {
    const {path: tmpUpload} = req.file;
    await jimp.read(`${tmpUpload}`, (error, avatar) => {
        if (error) throw error;
        avatar.resize(250, 250).write(`${tmpUpload}`);
        next()
    })
} catch (error) {
    next(error)
}
};


module.exports = avatarNormalaizer;