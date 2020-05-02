module.exports = {
    isProd: function () {
        return (process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase().includes('prod'));
    }
}
