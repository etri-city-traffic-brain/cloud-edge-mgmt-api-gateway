var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/openapi');
var apiUesrRouter = require('./routes/users');
//var apiProviderPortalRouter = require('./routes/portal_provider');
var apiAdminPortalRouter = require('./routes/portal_admin');
var apiNoticeRouter = require('./routes/notice');
var apiBoardsRouter = require('./routes/boards');
var apiBookmarkRouter = require('./routes/bookmark');
var apiCategoryRouter = require('./routes/category');
var apilistRouter = require('./routes/openapi_list');
var filedataRouter = require('./routes/filedata');
var apiserviceRouter = require('./routes/apiservice');
var downloadRouter = require('./routes/download');
var historyRouter = require('./routes/history');
var historyproviderRouter = require('./routes/history_provider');
var historydeveloperRouter = require('./routes/history_developer');
var datalistRouter = require('./routes/data_list');
var recommandationRouter = require('./routes/recommandation');
var searchRouter = require('./routes/search');
var searchadminRouter = require('./routes/search_admin');
var requestRouter = require('./routes/request');
var userMypage= require('./routes/user_mypage');
var toolRouter= require('./routes/tool');
var mailRouter= require('./routes/mail');
var providerRouter= require('./routes/provider');
var providerMonitoringRouter= require('./routes/provider_monitoring');
var adminMonitoringRouter= require('./routes/admin_monitoring');
var examexcelRouter= require('./routes/exam_excel');

var ssoRouter= require('./routes/sso');

//var apiUserOpenApiRouter = require('./routes/user_openapi');

var swaggerSpec = require('./swagger_config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', apiUesrRouter);
//app.use('/provider', apiProviderPortalRouter);
app.use('/admin', apiAdminPortalRouter);
app.use('/notice', apiNoticeRouter);
app.use('/boards', apiBoardsRouter);
app.use('/bookmark', apiBookmarkRouter);
app.use('/category', apiCategoryRouter);
//app.use('/useropenapi', apiUserOpenApiRouter);
app.use('/apilist', apilistRouter);
app.use('/filedata', filedataRouter);
app.use('/apiservice', apiserviceRouter);
app.use('/download', downloadRouter);
app.use('/history', historyRouter);
app.use('/history_provider', historyproviderRouter);
app.use('/history_developer', historydeveloperRouter);
app.use('/datalist', datalistRouter);
app.use('/recommandation', recommandationRouter);
app.use('/usermypage', userMypage);
app.use('/search', searchRouter);
app.use('/search_admin', searchadminRouter);
app.use('/request', requestRouter);
app.use('/tool', toolRouter);
app.use('/mail', mailRouter);
app.use('/sso', ssoRouter);

app.use('/exam_excel', examexcelRouter);

app.use('/provider', providerRouter);
app.use('/provider_monitoring', providerMonitoringRouter);

app.use('/admin_monitoring', adminMonitoringRouter);

app.use('/api-docs', swaggerSpec.swaggerUi.serve, swaggerSpec.swaggerUi.setup(swaggerSpec.swaggerSpec));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
