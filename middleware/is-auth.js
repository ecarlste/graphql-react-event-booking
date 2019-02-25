const processAuthFailure = () => {
    req.isAuth = false;
    return next();
};

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        processAuthFailure();
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        processAuthFailure();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretkey :-P');
    } catch(err) {
        processAuthFailure();
    }

    if (!decodedToken) {
        processAuthFailure();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}
