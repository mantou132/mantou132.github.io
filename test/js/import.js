"use strict";
let title_width;
let theme_select = "gray";
let theme = {
	gray:{
		bgc:"#ddd",
		ligth:"#eee",
		dark:"#aaa"
	},
	green:{
		bgc:"#70E6CA",
		ligth:"#A4EAD9",
		dark:"rgb(55, 188, 155)"
	},
	red:{
		bgc:"#FFD2D2",
		ligth:"#FFF0F0",
		dark:"#F16464"
	}, 
	blue:{
		bgc:"#A6DFEC",
		ligth:"#D3F7FF",
		dark:"#50ABBF"
	}, 
	gold:{
		bgc:"#E2ECA6",
		ligth:"#E8F78C",
		dark:"#B1C14C"
	}
}
function st(e){ 
	e?theme_select=e:"";
	return `
	.tab_switch{
		width: 100%;
		box-sizing:border-box;
		position: relative;
		font: 400 1em/1.5 PingFang SC, Lantinghei SC, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans;
	}
	.tab_switch p{
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
	.tab_switch > input:checked + label + p{
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

let tem = ` 	<input type="radio" id="tab_title" name="tab_switch" autocomplete="off">
		<label class="tab_title" for="tab_title">选项卡1</label>
		<p></p>`;

let MTTab = function(){};
let MTTabTltle = function(){};
let MTTabContent = function(){};
(function(superClass){
	let hover =function(e){
		e.addEventListener("mouseover",hoverListener ,false);
		function hoverListener(event) { 
			e.addEventListener("mouseout", function() {
				clearTimeout(t);
			},false);
			var t = setTimeout(function(){e.click();},1000);
		}
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
				let call = this;
				let observer = new MutationObserver(function(mutations,observer) {
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
				let style = document.createElement("style")
				style.innerHTML =  this.getAttribute("theme")?st(this.getAttribute("theme")):st();
				let div = document.createElement("div")
				div.innerHTML = tem;
				let docf = document.createDocumentFragment();
				let tab_switch = document.createElement("div")
				tab_switch.className = "tab_switch";
				let tt = this.querySelectorAll("mt-tab-title");
				let tc = this.querySelectorAll("mt-tab-content");
				for (let n = 1 ,j = tt.length ; n <= j; n++) {
					div.querySelector("label").setAttribute("for",`tab_title${n}`);
					div.querySelector("input").setAttribute("id",`tab_title${n}`);
					div.querySelector("label").innerHTML = tt[n-1].innerHTML;
					div.querySelector("p").innerHTML = tc[n-1].innerHTML;
					let div_c = div.cloneNode(true);
					hover(div_c.querySelector("label"));
					for (let i = 0,z = div_c.children.length; i < z; i++) {
						docf.appendChild(div_c.children[0]);
					};
				}
				tab_switch.appendChild(docf);
				tab_switch.firstElementChild.setAttribute("checked",true);
				let shadow = this.createShadowRoot();
				shadow.appendChild(style);
				shadow.appendChild(tab_switch);
			}
		},
		updateTheme: {value:function(t){
                if (["green", "red", "blue", "gold","gray"].indexOf(t) > -1) {
                    let stl = this.shadowRoot.firstElementChild;
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