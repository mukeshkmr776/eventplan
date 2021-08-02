module.exports = {
    STATUS_CODE: {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORISED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        LOCKED: 423,
        INTERNAL_SERVER_ERROR: 500
    },

    sendResponse: function (res, status, message) {
        status = status ?? this.STATUS_CODE.OK;
        res.status(status)
        res.end();
    }
}