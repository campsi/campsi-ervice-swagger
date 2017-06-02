const express = require('express');
const CampsiService = require('campsi/lib/service');
const handlers = require('./handlers');

module.exports = class SwaggerService extends CampsiService {
    initialize() {
        this.router.use('/', (req, res, next) => {
            req.server = this.server;
            next();
        });

        if(this.config.ui) {
            this.router.use(express.static(__dirname + '/SwaggerUI'));
            this.router.get('/', handlers.getSwaggerUI);
        }

        this.router.get('/swagger.json', handlers.getSwaggerSpec);

        return super.initialize();
    }
};
