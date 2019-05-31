const { errorLogger } = require("../services/logger");

function errorHandler(err, req, res, next) {
    errorLogger.error(`${req.method} ${req.url} ${err.message}`);
    res.status(500).send(`${req.method} ${req.url} ${err.message}`);
}

module.exports = errorHandler;