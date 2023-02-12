const errorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode ? req.statusCode : 500;

    res.status(statusCode);

    res.json({
        status: false,
        msg: err.message,
        statck: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

module.exports = {
    errorHandler
}