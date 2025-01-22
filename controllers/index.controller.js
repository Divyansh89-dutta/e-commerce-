module.exports.index = async (req, res, next) => {
    req.json({
        message: 'Welcome to our API'
    })
};