var express = require('express');
var router = express.Router();
var console = require('console');
var Utils = require('../lib/utils/utils');
var service = require('../lib/service/schema-service2');

router.get('/search', function (req, res) {
    var param = buildParam(req.query, ["dsId", "text", "pageSize", "pageNum"]);
    if (!param.pageSize) {
        param.pageSize = 12;
    }
    if (!param.pageNum) {
        param.pageNum = 1;
    }
    service.search(param, function searchDataSchemas(err, response) {
        if(err) {
            res.json({status: 500, message: err.message});
        }
        res.json({status: 200, data: response.body});
    })
});

router.get('/update', function (req, res) {
    var param = buildParam(req.query, [ "dsId", "schemaName","status","description"]);
    service.update(param,function updateSchema(err,response) {
        console.log(response.body);
        if(err) {
            res.json({status: 500, message: err.message});
            return;
        }
        res.json({status: 200, data: response.body});
    });
});

router.get('/deleteSchema', function (req, res) {
    var param = req.query;
    service.deleteSchema(param,function updateSchema(err,response) {
        if(err) {
            res.json({status: 500, message: err.message});
            return;
        }
        res.json({status: 200, data: response.body});
    });
});

var buildParam = function (query, params) {
    var param = {};
    params.forEach(function (key) {
        if (query[key]) {
            param[key] = query[key];
        }
    });
    return param;
}

module.exports = router;

