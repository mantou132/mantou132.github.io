//customEvent("Mouseover")
//dispatchEvent
//URL.createObjectURL
//dispatchEvent


var items_json = {};
var items = document.querySelectorAll(".rstblock");
var i = 0;

var observer = new MutationObserver(MTcallback);
var article = document.querySelector('.rstblock').parentElement;

var pop;
var options = {
    'childList': true
};
observer.observe(article, options);

function MTcallback(ags) {
    if (i >= items.length) {
        return;
    }

    ags.map(function(record) {
        if (!record.addedNodes.length) {
	        return ;
	    }
        pop = record.addedNodes[0];
        var item_json = {};
		// function clrea_ob_pro(o){
		// 	for (n in o){
		// 		if (typeof o[n] == "object") {
		// 			clrea_ob_pro(o[n]);
		// 		}else{
		// 			delete o[n];
		// 			console.log(o[n]);
		// 		}
		// 	} 
		// 	if ("length" in o) {o["length"]=0};
		// }
		// clrea_ob_pro(item_json);

        item_json["href"] = items[i].href;
        item_json["target"] = items[i].target;
        item_json["name"]  =items[i].querySelector(".rstblock-content .rstblock-title").textContent;
        item_json["img"] = items[i].querySelector(".rstblock-logo-icon").src;
        item_json["brand"] = Boolean(items[i].querySelector(".rstblock-logo div"));
        item_json.shijian = [];
        item_json.shijian[0] = Boolean(items[i].querySelector(".rstblock-logo span"));
        if (item_json.shijian[0]) {
            item_json.shijian[1] = items[i].querySelector(".rstblock-logo span").textContent;
        }
        item_json.work = Boolean(items[i].classList.contains("rstblock-closed"));
        item_json.volume = items[i].querySelector(".rstblock-monthsales").textContent.slice(2,-1);
        item_json.star = items[i].querySelector(".rstblock-starrating.icon-star > .icon-star").style.width;

        item_json.qisongfei = pop.querySelector(".rstpopover-delivery .plrtiny").textContent;
        item_json.dec = pop.querySelector(".rstpopover-notice").textContent;

        item_json["youhui"] = {};
        var y = pop.querySelectorAll(".rstpopover-activities li");
        console.log(y);
        	for (var j = y.length - 1; j >= 0; j--) {
        		switch(y[j].querySelector("i").textContent){
        			case "减" :
        			item_json.youhui.jian = true;
        			break;
        			case "抵" :
        			item_json.youhui.di = true;
        			break;
        			case "保" :
        			item_json.youhui.bao = true;
        			break;
        			case "付" :
        			item_json.youhui.fu = true;
        			break;
        			case "首" :
        			item_json.youhui.shou = true;
        			break;
        			case "专" :
        			item_json.youhui.zhuan = true;
        			break;
        			case "配" :
        			item_json.youhui.pei = true;
        			break;
        			case "茶" :
        			item_json.youhui.cha = true;
        			break;
        			case "票" :
        			item_json.youhui.piao = true;
        			break;
        			case "新" :
        			item_json.youhui.xin = true;
        			break;
        			case "跑" :
        			item_json.youhui.pao = true;
        			break;
        			case "13" :
        			item_json.youhui.shisan = true;
        			break;
        			case "牛" :
        			item_json.youhui.niu = true;
        			break;
        			case "折" :
        			item_json.youhui.zhe = true;
        			break;
        		}
        	}
        items_json[i] = item_json;
        i++;
    });
}
