import express from "express";
import logger from "morgan";
import cors from "cors";
import http from "http";

import config from "./config"
import dataSourceRouter from "./routes/dataSource"
import pollRouter from "./routes/poll"
import bodyParser from "body-parser";

const main = () => {
    configureServer(
        configureApp()
    );

};

const configureApp = () => {
    let queue = [];
    let app = express();
    app.use(logger('dev'))
        .use(express.json())
        .use(bodyParser.raw({ type: 'application/octet-stream' }))
        .use(express.urlencoded({extended: false}))
        .use(cors())
        .set('port', config.server.port)
        .use(express.static('public'));
    app.use('/datasource', dataSourceRouter(queue))
        .use('/poll', pollRouter(queue));

    return app;
};

const configureServer = (app) =>
    http.createServer(app)
        .listen(config.server.port)
        .on('error', (error) => {
            throw error
        })
        .on(
            'listening',
            () => console.log('Server is listening on port ' + config.server.port)
        );

main();
