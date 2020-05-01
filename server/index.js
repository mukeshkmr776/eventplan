// @{ Internal Imports }
const path = require('path');

// @{ External Imports }
const express = require('express');

// Request Data Middelwares
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// Authentication/Authorization Middelwares
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// @{ ServerConfiguration }
const ServerConfiguration = require(path.join(__dirname, 'lib', 'config', 'server.config.json'));
const BASE_API_URL = ServerConfiguration && ServerConfiguration.BASE_API_URL
                     ? ServerConfiguration.BASE_API_URL
                     : '/api';

module.exports = {
    startServer: async function (callback) {
        const app = express();
        const PORT = process.env.PORT || ServerConfiguration.PORT || 3000;

        this.registerMiddlewares(app);
        this.registerRoutes(app);
        this.defineStaticResources(app);
        this.registerAuthenticationMiddlewares(app);
        this.miscellaneousTasks(app);

        const server = app.listen(PORT, (err) => {
            console.log('Server started on port: http://localhost:' + PORT + '/ \n');
            if (typeof callback === 'function') {
                callback(err, server);
            }
        });
    },

    stopServer: function (instance, cb) {
        if(instance) {
            instance.close(cb);
        } else if (typeof cb === "function") {
            cb()
        }
    },

    registerMiddlewares: function (app) {
        // For Security
        app.use(helmet())

        // For request logging
        app.use((req, res, next) => {
            console.log('LOG - ' + req.method + ' - ' + req.url);
            next();
        });

        // For Request/Data Parsing/Compression
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(compression());
        app.use(cors());

        // For Authentication
        app.use(passport.initialize());
        app.use(passport.session());
    },

    registerRoutes: function (app) {
        app.use(BASE_API_URL + '/login'  , require('./lib/routes/login')(express.Router()));
        app.use(BASE_API_URL + '/user'   , require('./lib/routes/user')(express.Router()));
        app.use(BASE_API_URL + '/event'  , require('./lib/routes/event')(express.Router()));
        app.use(BASE_API_URL + '/shared' , require('./lib/routes/shared')(express.Router()));
    },

    defineStaticResources: function (app) {
        app.use(express.static(path.join(__dirname, '..', 'public')));
        app.use(express.static(path.join(__dirname, '..', 'public', 'dist')));
    },

    registerAuthenticationMiddlewares: function (app) {
        var User = require('./lib/database/schemas').getSchema('User');
        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    },

    miscellaneousTasks: function (app) {
        // Handle error in routes
        app.use((err, req, res, next) => {
            console.log(err);

            console.log('Something went wrong.',(err && err.message ? err.message : ''));
            res.status(500).send('Something broke! ERROR: ' + (err && err.message ? err.message : ''));
        });

        // Handle Routes unavailability: NOT WORKING PROPERLY
        // app.use(function (req, res, next) {
        //     res.status(404).send("What!");
        // });
    },

};
