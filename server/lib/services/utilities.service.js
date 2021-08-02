module.exports = {
    isProduction: function () {
        return process.env.NODE_ENV &&
               (
                   process.env.NODE_ENV['PROD'] ||
                   process.env.NODE_ENV['prod'] ||
                   process.env.NODE_ENV['PRODUCTION'] ||
                   process.env.NODE_ENV['production']
               )
    },
    getProjectRoot: function () {
        return process.cwd();
    },
}