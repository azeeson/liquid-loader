var loaderUtils = require("loader-utils");
var assign = require("object-assign");
var Liquid = require("liquid-node");
var Engine = new Liquid.Engine();
var Path = require("path");
var fs = require("fs");

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

	// Get template data from data-file of loader options
	let templateData = {};

	if (config.data) {
		templateData = config.data;
	} else {
		const dataPath = config.dataPath || 'data';
		const processedFile = Path.basename(this.resourcePath);
		const liquidDataFilePath = Path.join(root, dataPath, `${processedFile}.json`)
		const liquidData = fs.readFileSync(liquidDataFilePath, { encoding: "utf8" });
	  
		try {
			templateData = JSON.parse(liquidData);
		} catch (error) {
			console.error(`Error parsing data from ${liquidDataFilePath} to JSON, please make sure your data is json compatible.`);
		}
	}

	return Engine.parseAndRender(content, templateData).then(function(
		result
	) {
		return callback(null, result);
	});
};

module.exports.raw = true;
