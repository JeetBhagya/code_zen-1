const isAuthenticated = async (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.status(401).json({"errors":"unauthenticated"})
    }
}


module.exports = isAuthenticated