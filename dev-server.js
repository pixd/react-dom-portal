var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');
var webpackDev = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(config);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(webpackHot(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'examples/index.html'));
});

var port = process.env.PORT || 3000;
var host = process.env.IP || 'localhost';

var server = app.listen(port, host, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server running at http(s)://' + host + ':' + port + '/\n'); // eslint-disable-line
});
