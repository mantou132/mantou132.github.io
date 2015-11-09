"use strict";
var title_width;
var theme_select = "gray";
var theme = {
	gray:{
		bgc:"#ddd",
		ligth:"#eee",
		dark:"#aaa",
		color:"#000"
	},
	green:{
		bgc:"#70E6CA",
		ligth:"#A4EAD9",
		dark:"rgb(55, 188, 155)",
		color:"#fff"
	},
	red:{
		bgc:"#FFD2D2",
		ligth:"#FFF0F0",
		dark:"#F16464",
		color:"#fff"
	}, 
	blue:{
		bgc:"#A6DFEC",
		ligth:"#D3F7FF",
		dark:"#50ABBF",
		color:"#fff"
	}, 
	gold:{
		bgc:"#E2ECA6",
		ligth:"#E8F78C",
		dark:"#B1C14C",
		color:"#000"
	}
}
function st(e){ 
	e?theme_select=e:"";
	return `
	.tab_switch{
		color: ${theme[theme_select].color};
		text-shadow:none;
		width: 100%;
		box-sizing:border-box;
		position: relative;
		font: 400 1em/1.5 PingFang SC, Lantinghei SC, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans;
	}
	.tab_switch div{
		border:none;
		outline:none;
		margin: 0px;
		display: none;
		text-align: justify;
		background: ${theme[theme_select].bgc};
	}
	.tab_switch > input{
		display: none;
	}
	.tab_switch > input + label{
		padding: .5rem;
		border-top: .2em solid transparent;
		cursor: pointer;
	}
	.tab_switch > input:checked + label{
		border-top: .2em solid ${theme[theme_select].dark};
		background: ${theme[theme_select].bgc};
		font-weight: 700;
	}
	.tab_switch > input:checked + label + div{
		display: block;
		padding: 1rem;
	}
	.tab_switch > input + label:not(:first-of-type){
		position: absolute;
		top: 0px;
	}
	.tab_switch > input + label:nth-of-type(2){left: 6em;}
	.tab_switch > input + label:nth-of-type(3){left: 12em;}
	.tab_switch > input + label:nth-of-type(4){left: 18em;}
	.tab_switch > input + label:nth-of-type(5){left: 24em;}
	.tab_switch > input + label:nth-of-type(6){left: 30em;}
	.tab_switch > input + label:nth-of-type(7){left: 36em;}
	.tab_switch > input + label:nth-of-type(8){left: 42em;}
	.tab_switch > input + label:nth-of-type(9){left: 48em;}

	.tab_switch > input + label{
		line-height: 1.1rem;
		font-size: 1.1rem;
		width: 5.8em;
		display: block;
		box-sizing:border-box;
		text-align: center;
		background: ${theme[theme_select].ligth};
	}`;
}

var tem = ` 	<input type="radio" id="tab_title" name="tab_switch" autocompvare="off">
		<label class="tab_title" for="tab_title">选项卡1</label>
		<div></div>`;

var MTTab = function(){};
var MTTabTltle = function(){};
var MTTabContent = function(){};
(function(superClass){
	var hover =function(e){
		function click(e){//Firefox直接element的click方法无效
			var inputs = e.parentElement.querySelectorAll("input[id^=tab_title]");
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].checked = inputs[i] == e.parentElement.querySelector("#"+e.htmlFor) ? true : false;
			};
		}
		function hoverListener(event) { 
			e.addEventListener("mouseout", function() {
				clearTimeout(t);
			},false);
			var t = setTimeout(function(){click(e)},1000);
		}
		e.addEventListener("mouseover",hoverListener ,false);
		e.addEventListener("click",function(){click(e)} ,false);
	}
	//ES6的class extend写很简单
	MTTab.prototype = Object.create(superClass.prototype,{
		constructor: {
			value: MTTab,
			enumerable: false,
			writable: true,
			configurable: true
		},
		createdCallback: {
			value:function() {
				this.drawShadow();
				var call = this;
				var observer = new MutationObserver(function(mutations,observer) {
				  	call.drawShadow();
				  	console.log(mutations);
				})
				observer.observe(this,{
					attributes: false,
					childList: true,
					characterData: true,
					subtree:true 
				});
			}
		},
		drawShadow:{
			value:function(t){
				var shadow = this.createShadowRoot();
				var style = document.createElement("style")
				style.innerHTML =  this.getAttribute("theme")?st(this.getAttribute("theme")):st();
				var div = document.createElement("div")
				div.innerHTML = tem;
				var docf = document.createDocumentFragment();
				var tab_switch = document.createElement("div")
				tab_switch.className = "tab_switch";
				var tt = this.querySelectorAll("mt-tab-title");
				var tc = this.querySelectorAll("mt-tab-content");
				for (var n = 1 ,j = tt.length ; n <= j; n++) {
					div.querySelector("label").setAttribute("for",`tab_title${n}`);
					div.querySelector("input").setAttribute("id",`tab_title${n}`);
					div.querySelector("label").innerHTML = tt[n-1].innerHTML;
					div.querySelector("div").innerHTML = tc[n-1].innerHTML;
					var div_c = div.cloneNode(true);
					hover(div_c.querySelector("label"));
					for (var i = 0,z = div_c.children.length; i < z; i++) {
						docf.appendChild(div_c.children[0]);
					};
				}
				tab_switch.appendChild(docf);
				tab_switch.firstElementChild.setAttribute("checked",true);
				shadow.appendChild(style);
				shadow.appendChild(tab_switch);
			}
		},
		updateTheme: {value:function(t){
                if (["green", "red", "blue", "gold","gray"].indexOf(t) > -1) {
                    var stl = this.shadowRoot.firstElementChild;
                    stl.innerHTML = st(t);
                }else{
                	this.setAttribute("theme","gray");
                }
			}//enumerable,writable,configurable默认false
		},
		attributeChangedCallback: {value:function(attrName, oldVal, newVal){
				switch (attrName) {
                    case "theme":
                        this.updateTheme(newVal);
                        break;
                }
			}//enumerable,writable,configurable默认false
		}
	})
	return MTTab;
})(HTMLElement);

(function(superClass){
	//ES6的class extend写很简单
	MTTabTltle.prototype = Object.create(superClass.prototype,{
		constructor: {
			value: MTTabTltle,
			enumerable: false,
			writable: true,
			configurable: true
		}
	})
	return MTTabTltle;
})(HTMLElement);

(function(superClass){
	//ES6的class extend写很简单
	MTTabContent.prototype = Object.create(superClass.prototype)
	MTTabContent.prototype.constructor = MTTabContent;
	return MTTabContent;
})(HTMLElement);
document.registerElement('mt-tab', MTTab);
document.registerElement('mt-tab-title', MTTabTltle);
document.registerElement('mt-tab-content', MTTabContent);