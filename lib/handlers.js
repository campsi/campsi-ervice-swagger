const helpers = require('campsi/lib/modules/responseHelpers');
const forIn = require('for-in');

function getEmptySwagger() {
    return {
        swagger: '2.0',
        info: {},
        tags: [],
        paths: {}
    };
}

function setUrlInfos(swagger, config) {
    swagger.schemes = config.schemes;
    swagger.host = config.host;
    swagger.basePath= config.basePath;
}

function getContactBlock(config) {
    try {
        return {
            name: config.contact.name,
            url: config.contact.url,
            email: config.contact.email
        };
    } catch (error) {
        return {};
    }
}

function getLicenseBlock(config) {
    try {
        return {
            name: config.license.name,
            url: config.license.url
        };
    } catch (error) {
        return {};
    }
}

function setInfoBlock(swagger, config) {
    let contact = getContactBlock(config);
    let license = getLicenseBlock(config);
    swagger.info = {
        title: config.title,
        description: config.description,
        termsOfService: config.termsOfService,
        contact: contact,
        license: license,
        version: config.version
    };
}

function addTag(swagger, service) {
    swagger.tags.push({
        name: service.config.title,
        description: service.config.description,
        externalDocs: {
            description: service.description,
            url: 'url test'
        }
    });
}

function addPaths(swagger, path, service) {
    forIn(service.router.stack, (route) => {
        if (route.route) {
            let swaggerPath = '/' + path + route.route.path.replace(/\/:([a-zA-Z0-9_-]+)/g, '/{$1}');
            let methods = Object.keys(route.route.methods);
            forIn(methods, (method) => {
                if (!swagger.paths[swaggerPath]) {
                    swagger.paths[swaggerPath] = {};
                }
                swagger.paths[swaggerPath][method] = {};
                swagger.paths[swaggerPath][method].tags = [service.config.title];
                swagger.paths[swaggerPath][method].parameters = [];
                forIn(route.route.stack, (func) => {
                    let pathMethod = swagger.paths[swaggerPath][method];
                    if(func.handle && func.handle.apidoc) {
                        func.handle.apidoc.summary && (pathMethod.summary = func.handle.apidoc.summary);
                        func.handle.apidoc.description && (pathMethod.description = func.handle.apidoc.description);
                    }
                });
                forIn(route.keys, (key) => {
                    let parameter = {};
                    parameter.name = key.name;
                    parameter.in = 'path';
                    parameter.description = '';
                    parameter.required = !key.optional;
                    parameter.type = 'string';
                    swagger.paths[swaggerPath][method].parameters.push(parameter);
                });
            });
        }
    });
}

module.exports.getSwaggerUI = function (req, res) {
    res.sendFile(__dirname + '/SwaggerUI/index.html');
};

module.exports.getSwaggerSpec = function (req, res) {

    let swagger = getEmptySwagger();
    setUrlInfos(swagger, req.server.config);
    setInfoBlock(swagger, req.server.config);
    req.server.services.forEach((service, path) => {
        addTag(swagger, service);
        addPaths(swagger, path, service);
    });

    helpers.json(res, swagger);
};
