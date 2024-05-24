const {CustomError} = require('../utils/CustomError');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyAccessToken = (req, res, next) => {
   
    try {
        // check token is in header or cookie
        let token;
        if (req.headers.authorization) {
            // jwt is in format 'Bearer abcxyz'
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies['accessToken']) {
            token = req.cookies['accessToken'];
        }
        if (!token) return next(new CustomError('Please login first!', 401));
        // validate
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.account = decode;

        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).send({
                status: 'fail',
                message: error.message, // 'jwt expired'
            });
        } else {
            return next(new CustomError('Invalid token, please login again', 401));
        }
    }
};

const authentication = async (req, res, next) => {
    verifyAccessToken(req, res, next);
};

module.exports = { authentication };