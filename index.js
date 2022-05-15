var loaderUtils = require("loader-utils");
var assign = require("object-assign");
var Liquid = require("liquid-node");
var Engine = new Liquid.Engine();
var Path = require("path");

function getLoaderConfig(context) {
	var query = loaderUtils.getOptions(context) || {};
	var configKey = query.config || "liquid";
	var config =
		context.options && context.options.hasOwnProperty(configKey)
			? context.options[configKey]
			: {};
	delete query.config;
	return assign(query, config);
}

function isFunction(arg) {
	return typeof(arg) === 'function';
}

module.exports = function(content) {
	if (this.cacheable) this.cacheable();

	var root,
		config = getLoaderConfig(this),
		callback = this.async();

	if (typeof config.context == undefined) {
		root = Path.join(this.context || ".");
	} else {
		root = Path.join(config.context || ".");
	}

	Engine.registerFileSystem(new Liquid.LocalFileSystem(root));
	if (typeof config.filters === 'object') {
		Engine.registerFilters(config.filters);
	}

	let templateData = {};

	if (isFunction(config.data)) {
		try {
			templateData = config.data(this.resourcePath);
		} catch (error) {
			return callback(error);
		}
	} else {
		templateData = config.data;
	}

	return Engine.parseAndRender(content, templateData).then(function(
		result
	) {
		return callback(null, result);
	});
};

module.exports.raw = true;
