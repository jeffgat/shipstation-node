"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var base64 = require('base-64');
var stopcock = require('stopcock');
var rateLimitOpts = {
    limit: 40,
    interval: 1000 * 40,
};
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["POST"] = "POST";
    RequestMethod["DELETE"] = "DELETE";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
var Shipstation = (function () {
    function Shipstation() {
        var _this = this;
        this.baseUrl = 'https://ssapi.shipstation.com/';
        this.request = function (_a) {
            var _b = _a.country, country = _b === void 0 ? 'international' : _b, url = _a.url, _c = _a.method, method = _c === void 0 ? RequestMethod.GET : _c, _d = _a.useBaseUrl, useBaseUrl = _d === void 0 ? true : _d, data = _a.data;
            var opts = {
                headers: {
                    Authorization: "Basic " + (country === 'canada'
                        ? _this.authorizationTokenCanada
                        : _this.authorizationToken),
                },
                method: method,
                url: "" + (useBaseUrl ? _this.baseUrl : '') + url,
            };
            if (data) {
                opts.data = data;
            }
            return axios_1.default.request(opts);
        };
        if (!process.env.SS_API_KEY || !process.env.SS_API_SECRET) {
            throw new Error("APIKey and API Secret are required! Provided API Key: " + process.env.SS_API_KEY + " API Secret: " + process.env.SS_API_SECRET);
        }
        this.authorizationToken = base64.encode(process.env.SS_API_KEY + ":" + process.env.SS_API_SECRET);
        this.authorizationTokenCanada = base64.encode(process.env.SS_API_KEY_CANADA + ":" + process.env.SS_API_SECRET_CANADA);
        this.request = stopcock(this.request, rateLimitOpts);
    }
    return Shipstation;
}());
exports.default = Shipstation;
