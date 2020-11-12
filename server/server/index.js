// @{ Internal Imports }
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// @{ External Imports }
const express = require('express');

// @{ Middelwares }
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// @{ ServerConfiguration }
const ServerConfiguration = require('./lib/services/configuration.service').getConfiguration();
const BASE_API_URL = ServerConfiguration && ServerConfiguration.BASE_API_URL
                     ? ServerConfiguration.BASE_API_URL
                     : '/api';

module.exports = {
    startServer: async function (callback) {
        const app = express();
        const PORT = process.env.PORT || ServerConfiguration.PORT || 3000;

        try
        {
            this.registerInternalServices(app);
            this.registerMiddlewares(app);
            this.registerRoutes(app);
            this.defineStaticResources(app);
            this.registerAuthenticationMiddlewares(app);
            this.miscellaneousTasks(app);

            // Defining https server here.
            const server = http.createServer(app);

            server.listen(PORT, (err) => {
                console.log(`Server started on port: http://localhost:${PORT}/  \n`);
                if (typeof callback === 'function') {
                    callback(err, server);
                }
            });
        } catch (error) {
            if (typeof callback === 'function') {
                callback(error);
            }
        }
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
    },

    registerRoutes: function (app) {
        app.use(BASE_API_URL + '/serverlist'  , require('./lib/apis/serverlist')(express.Router()));
        // app.use(BASE_API_URL + '/labasset'  , require('./lib/apis/LabAsset')(express.Router()));
    },

    registerInternalServices: function (app) {
        require('./lib/services/storage.service');
    },

    defineStaticResources: function (app) {
        app.use(express.static(path.join(__dirname, '..', 'public')));
        app.use(express.static(path.join(__dirname, '..', 'public', 'dist')));
    },

    registerAuthenticationMiddlewares: function (app) {
        // ToDo
    },

    miscellaneousTasks: function (app) {
        // Handle error in routes
        app.use((err, req, res, next) => {
            console.log(err);
            console.log('Something went wrong.',(err && err.message ? err.message : ''));
            res.status(500).send('Something broke! ERROR: ' + (err && err.message ? err.message : ''));
        });

        // Handle Routes unavailability or 404 Error on UI Refresh
        app.use(function (req, res, next) {
            console.log('What?????????????????');
            console.log(req.originalUrl);
            if (req.originalUrl.startsWith('/home') || req.originalUrl.startsWith('/view') || req.originalUrl.startsWith('/edit')) {
                res.sendFile(path.resolve(__dirname + '/../public/dist/index.html'));
            } else {
                res.status(404).send();
            }
        });
    }

};
