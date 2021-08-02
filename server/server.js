// @{ Internal Imports }
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

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

// @{ ServerConfiguration }
const { ConfigurationService } = require('./lib/services');

let serverInstance = null;

module.exports = {
    startServer: async function () {
        return new Promise((resolve, reject) => {
            console.log('Starting server...');
            const ServerConfiguration = ConfigurationService.getServerConfiguration();
            const PORT = process.env.PORT || ServerConfiguration.PORT || 3000;

            // ExpressJs Server Initialization
            const app = express();

            this.registerMiddlewares(app);
            this.registerRoutes(app);
            this.defineStaticResources(app);
            this.miscellaneousTasks(app);

            // Defining https server here.
            let server = null;
            if(!!ServerConfiguration.HTTPS) {
                server = https.createServer(this.getHttpsCertificates(), app);
            } else {
                server = http.createServer(app);
            }

            server.listen(PORT, (err) => {
                if (err) {
                    console.error('Error while starting server: ', err.message);
                    console.error(err.stack);
                    serverInstance = null;
                    reject(err);
                }
                serverInstance = server;
                console.log(`Server started on port: ${ !!ServerConfiguration.HTTPS ? 'https' : 'http'}://localhost:${PORT}/ \n`);
                resolve(server);
            });
        });
    },

    stopServer: async function () {
        console.log('Stopping server...');
        if(serverInstance !== null) {
            serverInstance.close();
        }
        console.log('Successfully stopped server!');
    },

    registerMiddlewares: function (app) {
        // For Security
        app.use(helmet())

        // For request logging
        app.use((req, res, next) => {
            // console.log('LOG - ' + req.method + ' - ' + req.url);
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
        const ServerConfiguration = ConfigurationService.getServerConfiguration();
        const BASE_API_URL = ServerConfiguration.BASE_API_URL ?? '/api';

        app.use(BASE_API_URL + '/login'  , require('./lib/apis/login')(express.Router()));
        app.use(BASE_API_URL + '/user'   , require('./lib/apis/user')(express.Router()));
        app.use(BASE_API_URL + '/event'  , require('./lib/apis/event')(express.Router()));
        app.use(BASE_API_URL + '/shared' , require('./lib/apis/shared')(express.Router()));
    },

    defineStaticResources: function (app) {
        const PUBLIC_FOLDER = path.normalize(path.join(process.cwd(), 'public'));
        const UI_FOLDER = path.normalize(path.join(PUBLIC_FOLDER, 'ui'));

        if (!fs.existsSync(PUBLIC_FOLDER)) fs.mkdirSync(PUBLIC_FOLDER);
        if (!fs.existsSync(UI_FOLDER)) fs.mkdirSync(UI_FOLDER);

        app.use(express.static(PUBLIC_FOLDER));
        app.use(express.static(UI_FOLDER));
    },

    miscellaneousTasks: function (app) {
        // Handle error in routes
        app.use((err, req, res, next) => {
            console.log('Something went wrong.',(err && err.message ? err.message : ''));
            console.log(err.stack);
            res.status(500).send('Something broke! ERROR: ' + (err && err.message ? err.message : ''));
        });

        // Handle Routes unavailability or 404 Error on UI Refresh
        app.use(function (req, res, next) {
            console.log('What?????????????????');
            console.log(req.originalUrl);
            if (req.originalUrl.startsWith('/home') || req.originalUrl.startsWith('/view') || req.originalUrl.startsWith('/edit')) {
                const index_html = path.normalize(path.resolve(__dirname, 'public', 'dist', 'index.html'));
                console.log(index_html);
                res.sendFile(index_html);
            } else {
                res.status(404).send();
            }
        });
    },

    getHttpsCertificates: function () {
        return {
            key: '',
            cert: '',
            ca: []
          };
    }

};
