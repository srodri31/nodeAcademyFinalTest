const morgan = require("morgan");
const { infoLogger } = require("../services/logger");

const requestLogger = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" (:response-time)ms', {
    stream: {
        write: message => infoLogger.info(message)
    }
})

module.exports = requestLogger;