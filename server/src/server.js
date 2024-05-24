const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { rootRouter } = require('./routes/index');
const app = express();


app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use('', rootRouter);

module.exports = {
    app,
};