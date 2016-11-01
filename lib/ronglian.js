var md5 = require("md5");
var moment = require("moment");
var request = require("request");
var Base64 = require('./base64.js').Base64;
var utils = require('util');
var URL = "https://app.cloopen.com:8883";
function Ronglian(config){
	this.accountSid = config.accountSid;
	this.authToken = config.authToken;
	this.appId = config.appId;
}

Ronglian.prototype.send = function(options,cb){
	var ts = moment().format("YYYYMMDDHHmmss");

	var accountSid = this.accountSid;
	//1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
	//时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
	//2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
	var sigParameter = md5(this.accountSid+this.authToken+ts).toUpperCase();


	var Accept = "application/json";
	var Content_Type = "application/json;charset=utf-8";
	// 	验证信息，生成规则详见下方说明
	// 1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
	// 2.冒号为英文冒号
	// 3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
	var Authorization = Base64.encode(this.accountSid+":"+ts); 

	var to = options.mobile;
	var appId = this.appId;
	var templateId = options.templateId;
	var datas = options.datas;

	var url = URL + utils.format("/2013-12-26/Accounts/%s/SMS/TemplateSMS?sig=%s",accountSid,sigParameter);

	var reqOptions = {};
	reqOptions.url = url
	reqOptions.headers = {
		"Accept":Accept,
		"Content-Type":Content_Type 
	};
	reqOptions.method = "POST"
	reqOptions.form = {
		to:to,
		appId:appId,
		templateId:templateId,
		datas:datas
	};

	function callback(error, response, body){
		if (!error && response.statusCode == 200) {
		    var info = JSON.parse(body);
		    if(info.statusCode == '000000'){
		    	return cb(null,info);
		    } else {
		    	return cb(info);
		    }
		}
		cb(error); 
	}
	request(reqOptions, callback);
}

////-----
var ronglian = Ronglian({
	accountSid:"8a216da85805311d01581dbd18290dd6",
	authToken:"5d416f9576fa4168bda42ff0615966a9",
	appId:"8a216da85805311d01581dbd19790ddd"
}); 
////------

module.exports = Ronglian;