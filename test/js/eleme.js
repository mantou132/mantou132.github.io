//应该可以添加到 Node 原型中
if (!window.getComputedStyle) {
	window.getComputedStyle = function(e){
		return e.currentStyle;
	};
}

if (!document.addEventListener) {
	document.addEventListener = function(type,fun,oo) {
		return this.attachEvent('on' + type, fun);
	}
}

image_play_ul(".advertisement", "y");
//div > ul > li > a > img 这样的结构可复用
function image_play_ul(div_class, direction) {
    var w, h, l, attr, al, o = {
        x: 1
    };
    var ul_p = document.querySelector(div_class);
    var ul = ul_p.children[0];
    var ul_li_seclet = div_class + " li";
    var ul_li = document.querySelectorAll(ul_li_seclet);
    var font_size = getComputedStyle(ul).fontSize.slice(0, -2);
    var n = ul_li.length;
    w = Number(getComputedStyle(ul_p).width.slice(0, -2));
    h = Number(getComputedStyle(ul_p).height.slice(0, -2));
    if (direction = "y") {
        attr = "top";
        al = h;
    } else if (direction = "x") {
        attr = "left";
        al = w;
    }
    ul.style.position = "absolute";
    ul_p.style.position = "relative";
    ul_p.style.overflow = "hidden";
    for (var i = 1; i <= n; i++) {
        span = document.createElement("span");
        span.textContent = i;
        span.style.right = 10 * (i - 1) + i * font_size + "px";
        ul_p.appendChild(span);
        if (i == 1) {
            span.className = "img_cur";
        }
        if (!span.addEventListener) {
        	span.addEventListener = function(type,fun,oo) {
        		return this.attachEvent('on' + type, fun);
        	}
        }
        span.addEventListener("click", function(e) {
            clear_class_name(div_class + " span");
            this.className = "img_cur";
            var n = Number(this.textContent);
            o.x = n; //当前点击序列
            MTanimation(this.parentElement.querySelector("ul"), attr, (o.x - 1) * -al, 0.2, 20);
            console.log(attr);
        }, false);
    } //创建序号

    var spans = document.querySelectorAll(div_class + " span");
    var style_rule = div_class + " span{\
    	display: block;\
    	background: white;\
    	position: absolute;\
    	right: 10px;\
    	bottom: 10px;\
    	height: 1em;\
    	line-height: 1em;\
    	width: 1em;\
    	cursor: pointer;\
    	opacity: 0.3;\
  		-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity= 30);\
    	text-align: center;\
    }" + div_class + " span.img_cur{\
    	color: white;\
    	background:rgba(255, 102, 0, 0.8);\
    	opacity: 1;\
  		-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity= 100);\
    }" + div_class + " li {\
        height:" + h + "px;\
        overflow : hidden;\
    }" + div_class + " img {\
            width: 100%;\
            display :block;\
        }";

    var style = document.createElement("style");
    style.scoped = true;
    style.textContent = style_rule;
    ul_p.appendChild(style);

    var play_start = setInterval(function() {
        l = o.x % n == 0 ? al * (n - 1) : (-al);
        ul.style[attr] = (o.x % n - 1) * l + "px"; //初始正位
        MTanimation(ul, attr, Number(ul.style[attr].slice(0, -2)) + l, .3, 40);
        clear_class_name(div_class + " span");
        spans[o.x % n].className = "img_cur";
        o.x++;
    }, 4000);

    //先等着。
    // ul.addEventListener("mouseover",function(e){
    // 	if (e.trage === this) {
    // 		Object.defineProperty(o,"x",{configurable:true,writable:false});
    // 		console.log(o);
    // 	}
    // },false);
    // ul.addEventListener("mouseout",function(e){
    // 	if (e.trage === this) {
    // 		Object.defineProperty(o,"x",{configurable:true,writable:true});
    // 		console.log(o);
    // 	}
    // },false);

    function clear_class_name(name) {
        for (var j = 0, l = document.querySelectorAll(name).length; j < l; j++) {
            document.querySelectorAll(name)[j].className = "";
        };
    }
}


//等待扩展
function MTanimation(el, attr, value, time, key) {
    var cur = Number(getComputedStyle(el)[attr].slice(0, -2));
    var ft = value - cur;
    var play = setInterval(function() {
        el.style[attr] = Number(getComputedStyle(el)[attr].slice(0, -2)) + ft / key / time + "px";
    }, 1000 / key);
    setTimeout(function() {
        clearInterval(play);
        el.style[attr] = value + "px"; //动画结束正位
    }, time * 1000);
}

//暂时创建了全局变量items
//get json data
function xhr_get(url, method, body) {
    var xhr = new XMLHttpRequest();
    //xhr.open(method||"GET",url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(),true);
    xhr.open(method || "GET", url, true);
    xhr.setRequestHeader("Content-Type", "json/text");
    xhr.onreadystatechange = function(e) {
       // console.log(xhr.readyState);
    }
    xhr.onload = function() {
        items = JSON.parse(xhr.responseText);
        load_item(items);
    }
    xhr.onprogress = function(e) {
        //console.log(e);
        //console.log(e.loaded / e.total * 100 + "%");
    }
    xhr.onerror = function(e) {
        console.log(e);
    }
    xhr.onabort = function(e) {
        console.log(e);
    }
    xhr.send(body);
}

//太挤了
function load_item(items) {
	var hover_a;
    for (var i in items) {
        var tem = document.querySelector(".content_template").cloneNode(true);
        tem.href = items[i]["href"];
        tem.target = items[i]["target"];
        tem.querySelector(".content_template_left").className = items[i].brand ? "content_template_left brand" : "content_template_left";
        if (items[i].work) {
        	tem.querySelector(".content_template_left").className += " nowork";
        	tem.querySelector(".content_template_right").className += " nowork"
        }
        tem.querySelector(".content_template_left > img").src = /(.*)\?(.*)/.exec(items[i].img)?/(.*)\?(.*)/.exec(items[i].img)[1]:items[i].img;
        tem.querySelector(".content_template_left > span").textContent = items[i].shijian[0] ? items[i].shijian[1] : "";
        tem.querySelector(".content_template_right > .shopname").textContent = items[i].name;
        tem.querySelector(".content_template_right .starstar").style.width = items[i].star;
        tem.querySelector(".content_template_right .volume").textContent = "月售" + items[i].volume + "单";
        if (!items[i].peisongfei) {
        	tem.className += " content_pei";
        }
        tem.querySelector(".content_template_right .sendinfo").textContent = (items[i].qisongfei?items[i].qisongfei+ "元起送":"")  + (items[i].peisongfei ? "/" + items[i].peisongfei + "元配送" : "/免费配送");
        for (var n in items[i].youhui) {//这里到底是为什么items[0]的数据放到其他item中去了
        	var ii = document.createElement("i");
        	var pp = document.createElement("p");
        	var spans = document.createElement("span");
        	tem.className += " content_" + n;
            ii.className = "icon_"+n;
            ii.textContent = items[i].youhui[n];
            tem.querySelector(".content_template_right .teselist").appendChild(ii);
            pp.textContent = "满60立减59元，快来";
            var iii = ii.cloneNode(true);
            pp.insertBefore(iii, pp.firstChild);
            spans.className = "mobile";
            spans.textContent = "(手机用户专享)";
            pp.appendChild(spans);
            tem.querySelector(".pop .pop_tese").appendChild(pp);
        }
        tem.querySelector(".pop .pop_title").textContent = items[i].name;
        tem.querySelector(".pop .pop_jiage_qidong i").textContent = items[i].qisongfei;
        tem.querySelector(".pop .pop_jiage_peisong i").textContent = items[i].peisongfei || "0";
        tem.querySelector(".pop .pop_miaoshu").textContent = items[i].dec;

       	//这个返回值很有用，不然tem引用的永远是最后添加的元素，导致后面的事件侦听不正常。
        hover_a = document.querySelector(".main .content").appendChild(tem);

        if (!document.addEventListener) {
			tem.addEventListener = function(type,fun,oo) {
				return this.attachEvent('on' + type, fun);
			}
		}
        hover_a.addEventListener("mouseover", function(e) {
        	//是时候改点属性了
        	var pop = this.querySelector(".pop");
        	var w = Number(getComputedStyle(this).width.slice(0,-2));
        	var h = Number(getComputedStyle(this).height.slice(0,-2));
        	var r = Number(this.getBoundingClientRect().left)-w;
        	var b = Number(this.getBoundingClientRect().top)-h;
        	if (w < r) {//改到右边
        		pop.style.right = "100%";
        		pop.style.left = "auto";
        		pop.className += " pop_to_left";
        	}if (h < b) {//改到上面
				pop.style.bottom = "0px";
				pop.style.top = "auto";
				pop.className += " pop_to_top";
        	}
            pop.className += " hover";
        }, false);
        hover_a.addEventListener("mouseout", function(e) {
            this.querySelector(".pop").removeAttribute("style");
            this.querySelector(".pop").className = "pop";
        }, false);
    }
}


//筛选
var sty1 = document.createElement("style");
document.getElementsByTagName('head')[0].appendChild(sty1);
function content_pre_change(){
	var t=5,s = "",i,n,g,ss="",o;
    o = {			
    "jian":true,
    "di":true,
    "bao":true,
    "fu":true,
    "shou":true,
    "zhuan":true,
    "pei":true,
    "cha":true,
    "piao":true,
    "xin":true,
    "pao":true,
    "shisan":true,
    "niu":true,
    "zhe":true
	}

	sty1.textContent = "";
	g = document.querySelectorAll('.suppliers_pre input');

	for (i = g.length - 1; i >= 0; i--) {
		if(g[i].checked){
			ss += " .content_" + g[i].className.slice(4) + ",";
		}else{
			t--;
		}
	}
	for (n in o) {
		s += " .content_" + n + ",";
	}
	if (t > 0) {
		sty1.textContent = s.slice(0,-1) + "{display:none}";
		sty1.textContent += ss.slice(0,-1) + "{display:block}";
	}else{
		sty1.textContent = "";
	}
}
document.querySelector(".main .content_pre .suppliers_pre").onchange = function(){content_pre_change()};



//4 col or 3 col
var sty = document.createElement("style");
document.getElementsByTagName('head')[0].appendChild(sty);
function size_change(){
	if (document.body.clientWidth < 1280) {
		sty.textContent = "";
	} else {
		sty.textContent = ".page,.footer,.page, .headbox div.header{width:1180px;}.main .content a.content_template{width:25%}";
	}
}
size_change();
window.onresize = function(){size_change()};

//标题变换
document.addEventListener("visibilitychange",function(){
	if (document.hidden) {
		document.titletitle =  document.title;
		document.title = "快回来点餐";
	}else{
		document.title = document.titletitle;
	}
},false)

//搜索框动画
var search= document.querySelector(".location .search_box input");
if (!search.addEventListener) {
	search.addEventListener = function(type,fun,oo) {
		return this.attachEvent('on' + type, fun);
	}
}
search.addEventListener("focus",function(){
	MTanimation(this, "width", 300, .2, 30);
},false);
search.addEventListener("blur",function(){
	MTanimation(this, "width", 200, .2, 30);
},false);
