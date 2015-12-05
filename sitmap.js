//按目录分页输出；
var fs = require('fs');
var path = require('path');
function maps(dir, pre) {
	try{
		var dirs = fs.readdirSync(dir)
	}catch(e){throw e};
	return '<ul>' + 
        dirs.reduce(function(previousValue, file, index, array) {
		    var d = ((dir=='./')?'':dir) + file;
		    var stats = fs.statSync(d);
            if(stats.isFile()) {
            	return previousValue + `<li data-mtime = "${stats.mtime.toLocaleString()}" class="file"><a href="/${d}">${file}</a></li>`;
            }else if(stats.isDirectory()) {
            	return previousValue + `<li data-mtime = "${stats.mtime.toLocaleString()}" class="dir"><a href="/${pre}/${d}/">${file}</a></li>`;
            }
        },''/*未提供时自动返回当前值，不算return*/) + '</ul>';
}
exports.render = function(dir,pre) {
	try{
		var ul = maps(dir,pre);
	}catch(e){throw e};
	var style = `
		<style>
		a:link{
			text-decoration: none;
		}
		a:hover{
			text-decoration: underline;
		}
		.file{
			list-style: none;
		}
		.dir {
			list-style: square;
		}
		body{
			max-width: 800px;
			margin: auto;
		}
		ul{
			padding:0 2em
		}
		.dir:after,.file:after{
			content: "最后修改时间: "  attr(data-mtime) " ||";
			opacity: .4;
			font-size: .8em;
			line-height:2rem;
			position: absolute;
			right: .5em;
			
		}
		li{
			font-size:1rem;
			line-height: 2rem;
			position: relative;
			padding:0px .5em;
		}
		li:nth-child(2n){
			background: rgba(0,0,0,.1);
		}
		@media (max-width:480px){
			body{
				width: 100%;
			}
			.dir:after,.file:after{
				content:"";
			}ul{
				padding: 0;
			}
			li{
				padding: 0 2em;
			}
			li.dir{
				list-style-position: inside;
				margin-left: -1em;
			}
		}
		@supports(list-style: "+  "){
			.dir{
				list-style: "+  ";
			}
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
