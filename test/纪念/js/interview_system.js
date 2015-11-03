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
	    html,body{
	    	font: 400 16px/1.5 PingFang SC, Lantinghei SC, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans; 
	        margin: 0px;
	        padding: 0px;
	        width: 100%;
	        height: 100%;
	        background: ${theme[theme_select].bgc};
	        color: ${theme[theme_select].fc};
	    }
	    body > header{
	        height: 4rem;
	        font-size: 2.5rem;
	        line-height: 3rem;
	        padding-left: 1rem;
	    	padding-top: 1rem;
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
	        box-shadow: inset 0 0 3px rgba(0,0,0,.3);
	        margin: 0px 1rem 1rem 1rem;
	        padding: 1rem;
	        line-height: 1.2rem;
	        overflow: auto;
	        resize:none;
	        border: none;
	        float:left;
	        white-space: pre;
	        word-wrap: normal;/*不会自动换行*/
	        -moz-tab-size: 4;
	        tab-size: 4;
	    }
	    #code{
	    	height: calc(100% - 1rem);
	    	width: calc(70% - 2rem);
	        color: white;
	    	position: relative;
	    	background: ${theme[theme_select].cc};
	    }
	    #code_warp{
	    	height: calc(100% - 1rem);
	    	width: calc(70% - 2rem);
	    	pointer-events: none;
	    	color: ${theme[theme_select].fc};
	    	position: absolute;
	    	background: none;
	    }
	    #code_clone{
	    	height: 100%;
	    	width: 100%;
	    	margin:0px;
	    	position: absolute;
			top: 0px;
			left: 0px;
			pointer-events: inherit;
	    }
	    #code_clone span{
	    	text-shadow:0px 0px 0px,0px 0px 0.1px;
	    }
	    #code_clone > code{
	    	margin-right: 1rem;/*解决chrome和Firefox的滚动条差异问题*/
	    	font-family: "Consolas","微软雅黑";
	    }
	    #code::-moz-selection{
			color: transparent;
			background: ${theme[theme_select].bgc};
			}
	    #code::-webkit-selection{
			color: transparent;
			background: ${theme[theme_select].bgc};
			}
	    #code::-ms-selection{
			color: transparent;
			background: ${theme[theme_select].bgc};
			}
	    #code::selection {
			color: transparent;
			background: ${theme[theme_select].bgc};
			}
	    #code_warp::after{
	    	pointer-events: none;
	    	position: absolute;
		    content: "Alt+R 运行";
		    opacity: .5;
		    right: .5rem;
			bottom: .5rem;
	    }
	    .debug{
	    	float:left;
	    	width: calc(30% - 1rem);
	    	height: calc(100% - 1rem);
	    	overflow: auto;
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
	    }
		.debug > .error{
			color:${theme[theme_select].debug.error};
		}
	    .debug > .error::before{
	        content: 'x';
	    }
	    .video{
	        position: absolute;
	        bottom: 0px;
	        left: 0px;
	        width: 20vw;
	        height: 20vw;
	        border: 3px dashed red;
	    }
	    .video:hover video{
	        position: fixed;
	        width: 20vw;
	        height: 20vw;
	        right: 0px;
	        left: auto;
	    }
	    video{
	        height: 100%;
	        width: 100%;
	        background: gray;
	        display: block;/*删除元素后面下面的间距*/
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
					window.localStorage.theme = name;
				}catch(e){
					throw "主题设置错误";
					console.log(e);
				}
			}else{
				try{
					st.innerHTML = themeInnerHTML(window.localStorage.theme);
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
	window.localStorage.int = document.querySelector("#code").value;
},false);//刷新关闭保存值

window.addEventListener("load",function(e) {//chrome刷新不触发DOMContentLoaded事件
	setTheme();
	//console.log("DOMContentLoaded")
	//var code = document.querySelector("#code").value;//这样引用的只是一条字符串
	if (window.localStorage.int) {
		document.querySelector("#code").value = window.localStorage.int;
		syncCode();
	}else{
		document.querySelector("#code").value = document.querySelector("#code").textContent;
	}
},false);
document.querySelector("#code").addEventListener("input",syncCode,false);

document.querySelector("#code").addEventListener("keydown",debug,false);


(function syncScroll(){
	var attrs = ["scrollTop","scrollLeft"];
	var elements = [document.querySelector("#code"),document.querySelector("#code_clone")];
	elements[0].addEventListener("scroll",function(e){
		for(attr of attrs){
			elements[1][attr] = this[attr];
		}
	},false)//css pointerevents none，Firefox还是接受scrollbar 拖动事件

	elements[1].addEventListener("scroll",function(e){
		for(attr of attrs){
			if(elements[0][attr] !== this[attr]){
				elements[0][attr] = this[attr]
			}
		}
	},false)//css pointerevents none，Firefox还是接受scrollbar 拖动事件
})()

function syncCode(){
	document.querySelector("#code_clone > code").innerHTML = document.querySelector("#code").value
	Prism.highlightAll();//实时高亮
}

function debug(e){
	//console.log(e.keyCode);
	if (e.keyCode == 82 && e.altKey) {
		e.preventDefault();
		var debug = document.getElementsByClassName('debug')[0];
			code = document.querySelector("#code").value;
		var error = false,
			defined = true,
			object = false,
			string= false,
			number= false;
			fun = false;
		try{
			var msg = eval(code);
			console.log(typeof msg);
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
					break;
				case "function":
					fun = true;
					break;
				case "number":
					number= true;
					break;
			}
		}catch(e){
			msg =  e;
			var error = true;
		};
		var p = document.createElement("p");
		var a = p.classList;
		error?a.add("error"):
		string?a.add("string"):
		object?a.add("object"):
		fun?a.add("function"):
		number?a.add("number"):
		!defined?a.add("undefined"):"";
		p.innerHTML = msg;
		debug.appendChild(p);
		debug.scrollTop = debug.scrollHeight - debug.clientHeight;
	}
	if(enableTabIndent(this, e)){
        e.preventDefault();
        syncCode();
    }//insert tab
}
