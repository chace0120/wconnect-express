module.exports  = {
	insert: 'INSERT INTO user(id, account, password, salt, name, age) VALUES(NULL, ?, ?, ?, ?, ?)',
	update: 'UPDATE user SET name=?, age=? WHERE id=?',
	delete: 'DELETE FROM user WHERE id=?',
	queryById: 'SELECT * FROM user WHERE id=?',
	queryAll: 'SELECT * FROM user',
	queryByAccount: 'SELECT * FROM user WHERE account=? LIMIT 1'
}
