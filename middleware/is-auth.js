const processAuthFailure = (req, next) => {
    req.isAuth = false;
    return next();
};

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return processAuthFailure(req, next);
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        return processAuthFailure(req, next);
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretkey :-P');
    } catch(err) {
        return processAuthFailure(req, next);
    }

    if (!decodedToken) {
        return processAuthFailure(req, next);
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}
