let JsonResult = require('../lib/jsonResult');
let express = require('express');
let router = express.Router();
let UserDao = require('../dao/UserDao'); 
let rk = require('randomkey');
let crypto = require('crypto');

// user list
router.get('/', function(req, res, next) {
	UserDao.queryAll(function(err) {
		next(err);
	}, function(result) {
		return res.json(JsonResult.createForDatas(1, '', result, result.length));
	});
});

// user login
router.post('/login', function(req, res, next) {
	let account = req.body.account;
	let password = req.body.password;

	if (account === null || account === '') {
		return res.status(400).json(JsonResult.create(0, 'account can not be empty'));
	}
	if (password === null || password === '') {
		return res.status(400).json(JsonResult.create(0, 'password can not be empty'));
	}

	// 根据账号获取用户信息
	UserDao.queryByAccount(account, function(err) {
		next(err);
	}, function(result) {
		if (result[0]) {
			let salt = result[0].salt;
			let hashedPsw = result[0].password;

			let hash = crypto.createHash('sha256');
			let loginHashedPsw = hash.update(password + salt).digest('hex');

			if (hashedPsw === loginHashedPsw) {
				return res.json(JsonResult.create(1, 'login successfully'));
			} 
		} 

		return res.status(400).json(JsonResult.create(0, 'account or password is not right'));
	});
});

// user add
router.post('/', function(req, res, next) {
	let params = req.body;
	// todo 数据校验

	// todo 密码加盐
	params.salt = rk(64);
	let hash = crypto.createHash('sha256');
	let hashedPsw = hash.update(params.password + params.salt).digest('hex');
	params.password = hashedPsw;

	// 避免新增用户的账号重复
	UserDao.queryByAccount(params.account, function(err){
		next(err);
	}, function(result) {
		if (result[0]) 
			return res.status(400).json(JsonResult.create(0, 'account is existing'));
		else {
			UserDao.add(params, function(err) {
				next(err);
			}, function(result) {
				return res.json(JsonResult.createForAdd(1, 'create user successfully', result.insertId));
			});
		}	
	});
});

module.exports = router;
