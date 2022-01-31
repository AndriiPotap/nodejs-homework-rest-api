const ctrlWrap = (ctrl) => {
    const foo  = async (req, res, next) => {
        try {
            await ctrl (req, res, next)
        } catch (error) {
            if (error.message.includes("Cast to ObjectId failed")) {
                error.status = 404;
            }
            next(error)
        }
    }
        return foo;
    }

    module.exports = ctrlWrap;