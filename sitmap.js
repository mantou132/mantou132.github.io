//按目录分页输出；
var fs = require('fs');
var path = require('path');
function maps(dir, pre) {
	console.log(dir,2222);
	return '<ul>' + 
        fs.readdirSync(dir).reduce(function(previousValue, file, index, array) {
		    var d = ((dir=='./')?'':dir) + file;
		    var stats = fs.statSync(d);
            if(stats.isFile()) {
            	return previousValue + `<li data-mtime = "${stats.mtime}" class="file"><a href="/${d}">${file}</a></li>`;
            }else if(stats.isDirectory()) {
            	return previousValue + `<li data-mtime = "${stats.mtime}" class="dir"><a href="/${pre}/${d}/">${file}</a></li>`;
            }
        },''/*未提供时自动返回当前值，不算return*/) + '</ul>';
}
exports.render = function(dir,pre) {
	var ul = maps(dir,pre);
	var style = `
		<style>
		.file{
			list-style: none;
		}
		.dir {
			list-style: "+ ";
		}
		body{
			max-width: 800px;
			margin: auto;
		}
		.dir:after,.file:after{
			content: "最后修改时间: "  attr(data-mtime) " ||";
			opacity: .4;
			font-size: .8em;
			line-height:2rem;
			position: absolute;
			right: 10px;
			
		}
		li{
			font-size:1rem;
			line-height: 2rem;
			position: relative;
			padding:0px 10px;
		}
		li:nth-child(2n){
			background: rgba(0,0,0,.1);
		}
		</style>
	`;
	return `<!DOCTYPE html>
			<html lang="zh-cn">
			<head>
				<meta charset="UTF-8">
				<title>site map</title>
				${style}
			</head>
			<body>
			<h1><a href="../">../</a></h1>
				${ul}
			</body></html>`;
};
