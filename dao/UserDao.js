let mysql = require('mysql');
let $conf = require('../conf/db');
let $sql = require('./userSqlMapping');

let pool = mysql.createPool($conf.mysql);

function query(sql, params, errCallback, callback) {
	pool.getConnection(function(err, connection) {
		if (err) 
			errCallback(err);

		connection.query(sql, params, function(err, result) {
			connection.release();

			if (err) 
				errCallback(err);
			else
				callback(result);
		});
	});
}

exports.add = function(params, errCallback, callback) {
	query($sql.insert, [params.account, params.password, params.salt, params.name, params.age], errCallback, callback);
}

exports.queryByAccount = function(account, errCallback, callback) {
	query($sql.queryByAccount, [account], errCallback, callback);
}

exports.queryAll = function(errCallback, callback) {
	query($sql.queryAll, [], errCallback, callback);
}

