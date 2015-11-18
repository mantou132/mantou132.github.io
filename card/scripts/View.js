define(function(){
	var setStyle = (function() {
		var style = {
			"♠":"black","♥":"#FF5234","♣":"black","◆":"#FF5234","大":"red","小":"#666"
		};
		return function(c){
			var suit=c[0], rank=c[1];
			return `	.poker{
				margin: 10px;
				font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans;
		    	position: relative;
		    	display:inline-block;
		    	height: 300px;
		    	width: 220px;
		    	box-shadow: 0px 0px 10px rgba(0,0,0,.5);
		    	border-radius: 5px;
		    	background: white;
		    	color: ${style[suit]};
		    	cursor: default;
		    }
		    .poker:hover{
		    	box-shadow: 0px 0px 15px rgba(0,0,0,1);
		    }
		    .poker::before{
		    	height: 100%;
		    	width: 100%;
		    	position: absolute;
		    	content: "${suit}";
		    	line-height: 300px;
		    	font-size: 220px;
		    	text-align: center;
		    }
		    .poker::after{
		    	position: absolute;
		    	display: block;
		    	content: "${rank}\\000a${suit}";
		    	white-space: pre;
		    	/*不处理元素中的字符格式*/
		    	text-align: center;
		    	width: 1em;
		    	top:.5em;
		    	left: .5em;
		    	line-height: 1em;
		    	font-size: 24px;
		    }
			`;
		};
	})();

	//web组件
	var MTPoker = function(){};
	//ES6的class extend写很简单
	var p = "prototype",i = "innerHTML";
	MTPoker[p] = Object.create(HTMLElement[p]);
	MTPoker[p].constructor = MTPoker;
	MTPoker[p].createdCallback = function(){
		var shadow = this.createShadowRoot();
		var style = document.createElement("style");
		style[i] = setStyle(this[i]);
		shadow[i] = `<div class="poker"></div>`;//这个div的样式就相对于是shadowRoot了
		shadow.appendChild(style);
	};

	return MTPoker;
})