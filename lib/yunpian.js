var apikey = '';
var request = require('request');

var sendUrl = 'http://yunpian.com/v1/sms/send.json';
var getUserUrl = 'http://yunpian.com/v1/user/get.json';
var putUserUrl = 'http://yunpian.com/v1/user/set.json';
var getDefaultTemplateUrl = 'http://yunpian.com/v1/tpl/get_default.json';
var addTemplateUrl = 'http://yunpian.com/v1/tpl/add.json';
var getTemplateUrl = 'http://yunpian.com/v1/tpl/get.json';
var putTemplateUrl = 'http://yunpian.com/v1/tpl/update.json';
var delTemplateUrl = 'http://yunpian.com/v1/tpl/del.json';

function YunPian(key) {
    this.apikey = key;
};

YunPian.prototype.send = function (options, cb) {
    var form = {
        apikey: this.apikey,
        mobile: options.mobile,
        text: options.text
    };
    request.post({
        url: sendUrl,
        form: form
    }, function (err, response, body) {
        if (err) {
            return cb(err);
        }
        cb(null, body);
    });
};

YunPian.prototype.getUser = function (cb) {
    var form = {
        apikey: apikey
    }
    request.post({
        url: getUserUrl,
        form: form
    }, function (err, response, body) {
        cb(err, body);
    });
};

YunPian.prototype.putUser = function (options, cb) {
    var form = {
        apikey: apikey
    };

    if (options['emergency_contact']) {
        form['emergency_contact'] = options['emergency_contact'];
    }

    if (options['emergency_mobile']) {
        form['emergency_mobile'] = options['emergency_mobile'];
    }

    if (options['alarm_balance']) {
        form['alarm_balance'] = options['alarm_balance'];
    }
    request.post({
        url: putUserUrl,
        form: form
    }, function (err, response, body) {
        cb(err, body);
    });
};

YunPian.prototype.getDefaultTemplate = function (options, cb) {
    var form = {
        apikey: apikey
    };

    if (options['tpl_id']) {
        form['tpl_id'] = options['tpl_id'];
    }
    request.post({
        url: getDefaultTemplateUrl,
        form: form
    }, function (err, response, body) {
        cb(err, body);
    });
};


YunPian.prototype.getTemplate = function (options, cb) {
    var form = {
        apikey: apikey
    };

    if (options['tpl_id']) {
        form['tpl_id'] = options['tpl_id'];
    }
    request.post({
        url: getTemplateUrl,
        form: form
    }, function (err, response, body) {
        cb(err, body);
    })
};

YunPian.prototype.addTemplate = function (options, cb) {
    var form = {
        apikey: apikey
    };

    if (options['tpl_content']) {
        form['tpl_content'] = options['tpl_content'];
    }
    if (options['notify_type']) {
        form['notify_type'] = options['notify_type'];
    }

    request.post({
        url: addTemplateUrl,
        form: form
    }, function (err, response, body) {
        cb(err, body);
    });
};

YunPian.prototype.putTemplate = function (options, cb) {
    var form = {
        apikey: apikey
    };

    if (options['tpl_content']) {
        form['tpl_content'] = options['tpl_content'];
    }
    if (options['tpl_id']) {
        form['tpl_id'] = options['tpl_id'];
    }

    request.post({
        url: putTemplateUrl,
        form: form
    }, function (err, response, body) {
        cb(err, body);
    });
};

YunPian.prototype.delTemplate = function (options, cb) {
    var form = {
        apikey: apikey
    };
    if (options['tpl_id']) {
        form['tpl_id'] = options['tpl_id'];
    }

    request.post({
        url: delTemplateUrl,
        form: form
    }, function (err, response, body) {
        cb(err, body);
    });
};

module.exports = YunPian;