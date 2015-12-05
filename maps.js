//一次性输出整个目录所有内容到一个页面，内容多时不适合用。
var fs = require('fs');
var path = require('path');
function maps(dir, id) {
	console.log(dir,2222);
	var old_id = id ? id+'_' : 'maps';
	var id = 0;
	return '<ul>' + 
        fs.readdirSync(dir).reduce(function(previousValue, file, index, array) {
		    var d = ((dir=='./')?'':(dir + '/')) + file;
		    console.log(d);
            if(fs.statSync(d).isFile()) {
            	return previousValue + `<li id="${old_id + ++id}"><a href="${d}">${file}</a></li>`;
            }else if(fs.statSync(d).isDirectory()) {
            	var new_id = old_id + ++id; 
            	return previousValue + `<li class="dir" id = "${new_id}"><a href="#${new_id}">${file}</a>${maps(d, new_id)}</li>`;
            }
        },''/*未提供时自动返回当前值，不算return*/) + '</ul>';
}
exports.render = function(dir) {
	return `<!DOCTYPE html>
			<html lang="zh-cn">
			<head>
				<meta charset="UTF-8">
				<title>site map</title>
				<style>
					.dir > ul{
					    display: none;
					}
					.dir_open > ul{
						display: block;
					}
					.dir a{
						cursor: pointer;
					}
					.dir a:hover{
						background: rgba(0,0,111,.1)
					}
				</style>
			</head>
			<body>
			` + maps(dir) + `
			<script type="text/javascript">
				document.addEventListener('click',function(e){
					var t = e.target;
					if ( t.matches('.dir a') ) {
						t.parentElement.classList.toggle('dir_open');
					};
				},false);
				window.addEventListener('hashchange',display_target,false);
				window.addEventListener('load',display_target,false);
				function display_target(e,s){
					var sl = s||location.hash;
					document.querySelector(sl).classList.add('dir_open');
					s = sl.match(/.*_/);
					!s || display_target(e,s[0].slice(0,-1));
				}
			</script>
			</body></html>`
};
