exports.index = function(res) {
	var type = require('./mime.js');
    res.writeHead(200, {
        'Content-type': "text/html"
    });
    res.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' + '床前明月光');
    res.end();
};