exports.create = function(state, message = '') {
	return {'state': state, 'message': message};
};
exports.createForAdd = function(state, message = '', dataId = 0) {
	return {'state': state, 'message': message, 'dataId': dataId};
};
exports.createForDatas = function(state, message = '', datas = [], total = 0) {
	return {'state': state, 'message': message, 'datas':datas, 'total': total};
};
exports.createForData = function(state, message = '', data = {}) {
	return {'state': state, 'message': message, 'data': data};
};