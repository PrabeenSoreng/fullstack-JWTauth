const jwt = require('jsonwebtoken');

exports.checkAuthToken = (req, res, next) => {
    if (!req.headers.Authorization) {
        return res.status(500).json({ message: 'No Authorization' });
    }
    const token = req.headers.Authorization.split(' ')[1];
    if (!token) {
        return res.status(500).json({ message: 'No token found' });
    }
    return jwt.verify(token, 'mysecret', (err, decoded) => {
        if (err) {
            if (err.expiredAt < new Date()) {
                return res.status(500).json({ message: 'Token has expired. Login again', token: null });
            }
            next();
        }
        req.user = decoded.data;
        next();
    });
}