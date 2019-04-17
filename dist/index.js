'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _response = require('./concerns/response');

var _response2 = _interopRequireDefault(_response);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _errors = require('./concerns/errors');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('./passport');

var _passport4 = _interopRequireDefault(_passport3);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

app.use((0, _cors2.default)({
  exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

app.use(_bodyParser2.default.urlencoded({
  extended: false
}));

app.use(_passport2.default.initialize());

/**
 * If a connection to the Postgres is successfull, the API will continue loading
 */
(0, _database2.default)(function (db) {

  /**
   * Configure & initialize swagger documentation
   */
  var swaggerOptions = {
    swaggerDefinition: _config2.default.swaggerDefinition,
    apis: ['./src/controllers/*.js']
  };
  var swaggerSpec = (0, _swaggerJsdoc2.default)(swaggerOptions);
  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerSpec));

  /**
   * Configure the passport logic
   */
  (0, _passport4.default)(db, _passport2.default);

  /**
   * API router
   */
  app.use('/api', (0, _routes2.default)(db));

  /**
   * If any request url does not start with /api, the response will be 404
   */
  app.use(function (req, res, next) {
    (0, _response2.default)(res).notFound('Not found');
  });

  /**
   * All the errors will be caught here
   */
  app.use(function (err, req, res, next) {
    if (err instanceof _expressValidation2.default.ValidationError) {
      return (0, _response2.default)(res).error((0, _errors.formatValidationErrors)(err.errors));
    }
    (0, _response2.default)(res).internalError('Internal server error');
  });

  /**
   * Starts server on the specified port
   */
  app.listen(process.env.PORT, function () {
    console.log('Started on port ' + process.env.PORT);
  });
});
//# sourceMappingURL=index.js.map