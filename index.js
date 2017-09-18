
var loaderUtils = require("loader-utils");
var assign = require("object-assign");
var Liquid = require("liquid-node");
var Engine = new Liquid.Engine;

function getLoaderConfig(context) {
	var query = loaderUtils.getOptions(context) || {};
	var configKey = query.config || 'liquid';
	var config = context.options && context.options.hasOwnProperty(configKey) ? context.options[configKey] : {};
	delete query.config;
	return assign(query, config);
}

module.exports = function (content) {
	if (this.cacheable) this.cacheable();
	var config = getLoaderConfig(this);
    var callback = this.async();
	return Engine.parseAndRender(content, config.data || {}).then(function(result) {
		return callback(null, result);
	});

}

module.exports.raw = true;
  