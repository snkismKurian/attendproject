
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.hogehoge = function(req, res) {
	var id = req.param('id');
	// res.send(id, {'Content-Type':'text/plain'},200);
	res.render('hogehoge', {
		title: 'hogehoge festival page',
		var1: 'Node.js',
		var2: 'JavaScript',
		var3: req.param('id')
	});
};

// connect to the MongoDB
var mongo = require('mongodb');
var client = new mongo.Db('test', 
	new mongo.Server('127.0.0.1', 27017));
client.open(function (err, client) {
	if (err) {
		console.log(err);
	} else {
		console.log('connected to mongodb');
	}
});

// show data and form
exports.showMongo = function(req, res) {
	client.collection('dbtest',
		function(err, collection) {
			if (err) {
				throw err;
			}
			collection.find().toArray(function(err, results) {
				if (err) {
					throw err;
				}
				res.render('member', {
					title: 'Mongo Example',
					list: results
				});
			});
		}
	);
};

//save posted data
exports.saveMongo = function(req, res) {
	var name = req.param('name');
	client.collection('dbtest',
		function(err, collection) {
			if (err) {
				throw err;
			}
			collection.save({name:name}, function(err) {
				if (err) {
					throw err;
				}
				res.redirect('/member');
			});
		}
	);
};

// 出席・退席ボタン押下時
exports.showCondition = function(req, res) {
	client.collection('dbtest',
		function(err, collection) {
			if (err) {
				throw err;
			}
			collection.find().toArray(function(err, results) {
				if (err) {
					throw err;
				}
				res.render('member/condition', {
					title: 'Mongo Example',
					list: results
				});
			});
		}
	);
};

//save posted data
exports.saveCondition = function(req, res) {
	var name = req.param('name');
	client.collection('dbtest',
		function(err, collection) {
			if (err) {
				throw err;
			}
			collection.save({name:name}, function(err) {
				if (err) {
					throw err;
				}
				res.redirect('/member/condition');
			});
		}
	);
};