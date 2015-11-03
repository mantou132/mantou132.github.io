;var setTheme = (function() {//闭包引用
	var theme = {
		default:{
			bgc:"#222",
			cc:"#333",
			fc:"#fff",
			debug:{
				string:"rgb(255, 208, 112)",
				object:"rgb(91, 185, 255)",
				error:"rgb(242, 66, 66)"
			},
			code:{
				number:"#10D888",
				string:"#FD4B4B",
				def:"#FFECA4",
				keyword:"#E94DFF",
				atom:"rgb(86, 142, 240)"
			}
		},
		light:{
			bgc:"#aaa",
			cc:"#bbb",
			fc:"#222",
			debug:{
				string:"rgb(144, 97, 0)",
				object:"rgb(17, 42, 114)",
				error:"rgb(183, 8, 8)"
			},
			code:{
				number:"rgb(17, 102, 68)",
				string:"rgb(170, 17, 17)",
				def:"rgb(156, 133, 54)",
				keyword:"rgb(119, 0, 136)",
				atom:"rgb(23, 78, 176)"
			}
		}
	}
	var themeInnerHTML = function(theme_select){
		return `
	    *{
	        box-sizing:border-box;
	    }
	    *:focus,*:active{
	        outline: none;
	    }
	    ::-moz-selection{
			color: ${theme[theme_select].fc};
			background: ${theme[theme_select].bgc};
		}
		::-webkit-selection{
			color: ${theme[theme_select].fc};
			background: ${theme[theme_select].bgc};
		}
		::-ms-selection{
			color: ${theme[theme_select].fc};
			background: ${theme[theme_select].bgc};
		}
		::selection{
			color: ${theme[theme_select].fc};
			background: ${theme[theme_select].bgc};
		}
	    html,body{
	    	font: 400 16px/1.5 PingFang SC, Lantinghei SC, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans; 
	        margin: 0px;
	        padding: 0px;
	        width: 100%;
	        height: 100%;
	        overflow: hidden;
	        background: ${theme[theme_select].bgc};
	        color: ${theme[theme_select].fc};
	    }
	    body > header{
	        height: 4rem;
	        font-size: 2rem;
	        line-height: 2rem;
	        padding-left: 1rem;
	    	padding-top: 1rem;
	    	background: rgba(28, 28, 28,.3);
	    	border-bottom: .1rem dashed ${theme[theme_select].cc};
	    }
	    header span.tilte{
	    	font-weight: 700;
	    }
        nav a:visited,
        nav a:link{
            color: ${theme[theme_select].fc};
            opacity: .5;
            text-decoration: none;
        }
        nav a:hover{
        	color: ${theme[theme_select].fc};
        	opacity: 1;
        	text-decoration: underline;
        }
        nav dt{
        	opacity: .5;
        }
        header nav{
            float: right;
            display: inline;
            font-size: .8rem;
            margin-right: 1rem;
            margin-top: 1.2rem;
            line-height: 1rem;
        }
        header nav *{
            display: inline;
            margin: 0px;
        }
	    main{
	    	position: relative;
	        height: calc(100% - 5rem - 0rem);
	        margin-top:1rem;
	        font-family: "Consolas","微软雅黑";
	    }
	    .code{
	    	font-size: 1rem;
	        font-family: "Consolas","微软雅黑";
	        margin: 0px 1rem 1rem 1rem;
	        line-height: 1.2rem;
	        overflow: auto;
	        border: none;
	        float:left;
	        -moz-tab-size: 4;
	        tab-size: 4;
	    	height: calc(100% - 1rem);
	    	width: calc(70% - 2rem);
	        color: ${theme[theme_select].fc};
	    	position: relative;
	    	background: ${theme[theme_select].cc};
	    }
	    .code > div{
	        margin: 1rem 1rem 1rem 0rem;
	    	height: calc(100% - 2rem);
	    	width: calc(100% - 1rem);
	    }
	    .code .cm-def{
	    	color: ${theme[theme_select].code.def};
	    }
	    .code .cm-keyword{
	    	color: ${theme[theme_select].code.keyword};
	    }
	    .code .cm-string{
	    	color: ${theme[theme_select].code.string};
	    }
	    .code .cm-number{
	    	color: ${theme[theme_select].code.number};
	    }
	    .code .cm-atom{
	    	color: ${theme[theme_select].code.atom};
	    }
	    .debug{
	    	float:left;
	    	width: calc(30% - 1rem);
	    	height: calc(70% - 2rem);
	    	overflow-y: auto;
	    	background: ${theme[theme_select].cc};
	    	word-wrap: break-word;
	    }
	    .debug p {
			margin: 0px;
			opacity: .7;
			border-left: .3rem solid;
			position: relative;
			padding-left: 2rem;
		}
		.debug p:last-child {
			font-style: italic;
			opacity: 1;
		}
		.debug > .undefined,.debug p.undefined:last-child{
			opacity: .5;
		}
		.debug > p::before{
			position: absolute;
			line-height: 100%;
			left: 0;
			top: calc(50% - .5rem);
			margin-right: 0.8rem;
			margin-left: 0.3rem;
		}
		.debug > .undefined::before,
		.debug > .string::before,
		.debug > .object::before,
		.debug > .number::before,
		.debug > .function::before{
	        content: '>';
	    }
		.debug > .string,
		.debug > .number,
		.debug > .function::after{
			color: ${theme[theme_select].debug.string};
		}
		.debug > .object,
		.debug > .function{
			color: ${theme[theme_select].debug.object};
		}
		.debug > .function::after{
	        content: 'function (){}';
	        content: "function";
			position: absolute;
			left: 2em;
			top: 0em;
	    }
		.debug > .error{
			color:${theme[theme_select].debug.error};
		}
	    .debug > .error::before{
	        content: 'x';
	    }
		.debug:empty::before{
			content: "debug…";
			line-height: 100px;
			font-size: 3rem;
			display: block;
			top:calc(50% - .5rem);
			text-align: center;
			opacity: .3;
			cursor: default;
		}
	    .video{
	        float:right;
	        width: calc(30% - 1rem);
	        height: 30%;
	        margin:1rem 1rem 0rem 0rem;
	        border: 0px dashed red;
	        z-index: 8;
	        background: ${theme[theme_select].cc};
	        overflow: hidden;
		    position: relative;
		}
		.video:before{
			content: "WebRTC";
			position: absolute;
			line-height: 100%;
			height: 100%;
			font-size: 3rem;
			display: block;
			top:calc(50% - .5rem);
			text-align: center;
			width: 100%;
			opacity: .3;
			cursor: default;
			z-index: -1;
		}
		.video button{
			border:none;
			padding: .4em;
			width: 50%;
			height: 2rem;
			margin: 0em;
			float: left;
			cursor: pointer;
			background-color: #ddd;
		}
		.video button + button{
			border-left: 1px solid ${theme[theme_select].cc};
		}
		.video button[disabled]:hover {
			background-color: #ddd;
			cursor: not-allowed;
		}
	    video{
	    	object-fit: cover;
	        height: 100%;
	        width: 50%;
	        background: gray;
	        display: inline-block;/*删除元素后面下面的间距*/
	    }
	    footer nav{
	    	display: none;
	    }`;
	}
	function style_cache(){//使用闭包来引用style标签，避免重复选择和冲突
		var st = document.createElement("style");
		document.querySelector("head").appendChild(st);
		return function(name) {
			if (arguments.length) {
				try{
					st.innerHTML = themeInnerHTML(name);
					window.localStorage.themeName = name;
				}catch(e){
					throw "可能没有这个主题";
					console.log(e);
				}
			}else{
				try{
					st.innerHTML = themeInnerHTML(window.localStorage.themeName);
				}
				catch(e){
					st.innerHTML = themeInnerHTML("default");
				}
			}
		}
	}
	return style_cache();//导出的全局函数,可接收一个主题名字参数如"light".
})();

window.addEventListener("beforeunload",function(e) {
	window.localStorage.int = editor.getValue();
},false);//刷新关闭保存值

setTheme();
window.addEventListener("DOMContentLoaded",function(e) {
	if(window.localStorage.int != undefined){
		document.querySelector("#code").value = window.localStorage.int;
	}
	window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        mode: {name: "javascript", globalVars: true}
    });
    document.addEventListener("keypress",function(){
        editor.showHint();
    },false);
},false);

document.addEventListener("keydown",function(e){
	if (e.keyCode == 82 && e.altKey) {
		e.preventDefault();
		debug(e);
	}if (e.keyCode==83 && e.ctrlKey) {
		e.preventDefault();
		save(code);
	}
},false);

window._console = function(code){//这个函数不能有返回，否则就被debug拿到了。
	var debug = document.getElementsByClassName('debug')[0];
	var p = document.createElement("p");
	p.className = "string";
	p.innerHTML = code;
	debug.appendChild(p);
	debug.scrollTop = debug.scrollHeight - debug.clientHeight;
	if (debug.children.length == 100) {
		debug.removeChild(debug.children[0]);
	};
}


function debug(e){
	// console.log(e.keyCode);
	var code = editor.getValue();
	console.log(code);
	var error = false,
		defined = true,
		object = false,
		string= false,
		number= false;
		fun = false;
	try{
		var msg = eval(code);
		//console.log(typeof msg);
		switch(typeof msg){
			case "undefined":
				defined= false;
				break;
			case "string":
				string= true;
				msg = '"' + msg + '"';
				break;
			case "object":
				object= true;
				msg = Object.prototype.toString.call(msg);
				break;
			case "function":
				fun = true;
				console.log(msg.toString());
				msg = msg.toString().replace(/{(.|\n|\r)*}/,"{}");
				break;
			case "number":
				number= true;
				break;
		}
	}catch(e){
		//console.log(e.stack);
		var line =  e.lineNumber? " @" +e.lineNumber : "";
		var column = e.columnNumber  ? ":" + e.columnNumber : "";
		msg =  e.message + line + column;
		var error = true;
	};
	_console(msg);
	var p = document.querySelector(".debug p:last-child");
	p.className = "";
	var a = p.classList;
	error?a.add("error"):
	string?a.add("string"):
	object?a.add("object"):
	fun?a.add("function"):
	number?a.add("number"):
	!defined?a.add("undefined"):"";
}

save = (function(){//闭包引用a，不会重复生成，跟上面的style一样
	a = document.createElement("a");
	return function(s){
		document.body.appendChild(a);
		var blob = new Blob([s], {type: "/text"});
		a.href = window.URL.createObjectURL(blob);
		a.download = "demo.js";
		a.style.display = "none";
		a.click();
	}
})();


(function videoControls(target){
	var observer = new MutationObserver(function callback(mutations){
		mutations.forEach(function(mutation){
			mutation.addedNodes[0].removeAttribute("controls");
		});
	})
	observer.observe(target,{childList:true})
})(document.querySelector(".video"))