const { Router } = require('express');
const {authRouter} = require('./authRoute')
const {boardRouter} = require('./boardRoute')
const {authentication} = require('../middlewares/auth')

const rootRouter = Router();

rootRouter.use('/helloworld', (req, res) => {
    res.status(200).send({
        status: 'ok',
        message: 'Hello World',
    });
});

rootRouter.use('/auth', authRouter);

rootRouter.use(authentication);
rootRouter.use('/boards',boardRouter);

module.exports = {
    rootRouter,
};