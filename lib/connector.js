var assert = require('assert');
var SmsProvider = require('./ronglian');
var provider;

/**
 * Export the YunPianConnector class.
 */

module.exports = SmsConnector;

/**
 * Create an instance of the connector with the given `settings`.
 */

function SmsConnector(settings) {
    assert(typeof settings === 'object', 'cannot initialize YunPianConnector without a settings object');
    var connector = this;

    var apiKey = this.apiKey = settings.apiKey;

    provider = connector.smsProvider = new SmsProvider(apiKey);
}

SmsConnector.initialize = function(dataSource, callback) {
    dataSource.connector = new SmsConnector(dataSource.settings);
    callback();
}

SmsConnector.prototype.DataAccessObject = DataAccessObject;

function DataAccessObject() {}

/**
 * Send a YunPian message or call with the given `options`.
 */
DataAccessObject.send = function(options, fn) {
    var dataSource = this.dataSource;
    var settings = dataSource && dataSource.settings;
    var connector = dataSource.connector;
    assert(connector, 'Cannot use this module without a connector!');

    var mobile = options.mobile;
    var templateId = options.templateId;
    var datas = options.datas;
    connector.smsProvider.send({
        mobile: mobile,
        templateId: templateId,
        datas: datas
    }, function(err, result) {
        if (err) {
            fn(err);
        } else {
            result = JSON.parse(result);
            fn(null, result);
        }
    });
}

/**
 * Send using `modelInstance.send()`.
 */

DataAccessObject.prototype.send = function(fn) {
    this.constructor.send(this, fn);
}
