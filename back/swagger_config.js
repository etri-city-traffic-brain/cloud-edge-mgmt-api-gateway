const swaggerJSDoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
var swaggerDefinition = {
    info: {                                             // API informations (required)
        title: 'Opendata API Gateway',                            // Title (required)
        version: '1.0.0',                               // Version (required)
        description: 'Opendata API Gateway Specification', // Description (optional)
    },
    // host: "api.avilos.codes",
    basePath: "/"                                     // v1,v2... 확장가능(swaggerDefinition,swaggerSpec도 버전별로 따로 생성해야 함)
};

// Options for the swagger docs
var options = {
    swaggerDefinition: swaggerDefinition,               // Import swaggerDefinitions
    apis: [                                             // Path to the API docs
        'routes/*.js'                                 // v1,v2... 확장가능(swaggerDefinition,swaggerSpec도 버전별로 따로 생성해야 함)
    ]
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = module.exports.swaggerSpec = swaggerJSDoc(options);

// Swagger UI
module.exports.swaggerUi = swaggerUi;