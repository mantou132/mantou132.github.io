(function() {
	var startX,startY,currentX,currentY,c,context,dragged;
	var gradient;
    var panel = document.getElementById('panel');
    var markBar = document.getElementsByClassName('markBar');
    var setPanelBox = document.getElementsByClassName('setPanelBox')[0];
    var filterTool = document.getElementById("filterTool").children[0];
    var toolBar = document.getElementById("toolbar");
    var filterSubmit = document.getElementById("filterSubmit");
    var setPanelClose = document.getElementsByClassName("setPanelClose")[2];

    window.addEventListener("load",function() {
        var s = location.hash;
        document.getElementById('code').textContent = decodeURIComponent(s).slice(1);
        if(s.indexOf("linear-gradient") > 1){
            //click
            document.getElementById("linearGradientTool").children[0].click();
            panel.style.backgroundImage = /:(.*)/.exec(decodeURIComponent(s))[1];
        }if(s.indexOf("radial-gradient") > 1){
            //click
            document.getElementById("radialGradientTool").children[0].click();
            panel.style.backgroundImage = /:(.*)/.exec(decodeURIComponent(s))[1];
        }if(s.indexOf("filter") > 0){
            filterTool.click();
            console.log(decodeURIComponent(s));
            panel.style.filter = /:(.*)/.exec(decodeURIComponent(s))[1];
            panel.style.webkitFilter = /:(.*)/.exec(decodeURIComponent(s))[1];
        }
    },false);

    filterSubmit.addEventListener("click",function(el) {
    	if(setFilter.matches("form:valid")){
    		//submit data & close click...
    		console.log("test");
    		var f = "";
    		for (var i = setFilter.length - 3; i >= 0; i--) {
    			if(setFilter[i].value){
    				f += setFilter[i].id + "(" + setFilter[i].value + ") ";
    			}
    		};
    		console.log(f);
    		panel.style.filter = f;
    		panel.style.webkitFilter = f;
			setPanelClose.click();
			writeCode("filter");
            writeCode("-webkit-filter");
    	}
    },false);

    toolBar.addEventListener("change",function(el) {console.log(el);
    	if (el.target == filterTool) {
    		panel.removeEventListener("mousedown", handleStart, false);
    		panel.style.cursor = "default";
    		panel.style.background = "#AAA center center no-repeat url(image/Fotolia_72152609_S.jpg)";
    		panel.style.backgroundSize = "cover";
    	}else{
    		panel.addEventListener("mousedown", handleStart, false);
    		panel.style.cursor = "crosshair";
    		panel.style.background = "#aaa";
    		panel.style.filter = "none";
            panel.style.webkitFilter = "none";
    	}
    },false);
    panel.addEventListener("mousedown", handleStart, false);
    document.addEventListener("dblclick", showSetPanel, false);
    function handlePosition (e,el) {//确定鼠标指针位置
    	var px,py,ex,ey;
    	px=el.getBoundingClientRect().left;
    	py=el.getBoundingClientRect().top;
    	ex=e.clientX;
    	ey=e.clientY;
    	return {x:ex-px,y:ey-py};
    }
    function handleStart(e) { //初始化tip
        if (e.buttons === 1 || e.button===0) {
        	var position = handlePosition(e,this);
        	startX=position.x;
        	startY=position.y;
        	c=document.createElement("canvas");
        	c.width=this.offsetWidth;
        	c.height=this.offsetHeight;
        	this.appendChild(c);
        	context=c.getContext("2d");
        	context.fillStyle="#fff";
        	context.arc(startX,startY,5,0,0.2*Math.PI,true);
        	context.fill();
    		this.addEventListener("mousemove", handleDarg, false);
    		this.addEventListener("mouseup",handleEnd,false);
        };
    }
    function handleDarg(e){
    	var position = handlePosition(e,this);
    	c.width=panel.offsetWidth;
    	context.fillStyle="#fff";
    	context.strokeStyle="#fff";
    	context.arc(startX,startY,5,0,0.2*Math.PI,true);
    	context.fill();
    	context.beginPath();
    	context.moveTo(startX,startY);
    	context.lineTo(position.x,position.y);
    	context.stroke();
    	context.beginPath();
    	context.arc(position.x,position.y,5,0,0.2*Math.PI,true);
    	context.fill();
    }
    function handleEnd(e){
    	currentX=handlePosition(e,this).x;
    	currentY=handlePosition(e,this).y;
    	this.removeChild(c);
    	setGradient();
    	judgementModel();
    	appGradient(panel);
    	writeCode("backgroundImage");
    	this.removeEventListener("mousemove", handleDarg, false);
    	this.removeEventListener("mouseup", handleEnd, false);
    }
    gradient = {//初始化渐变对象
    	modify:false,
    	model:"linear-gradient",
    	deg:0,
    	start:{
    		color:"black",
    		position:0
    	},
    	end:{
    		color:"white",
    		position:100
    	},
    	centerColor:[]
    }
    function judgementModel(){
    	var model;
    	if (document.getElementById("linearGradientTool").children[0].checked) {gradient.model="linear-gradient"}
    	if (document.getElementById("radialGradientTool").children[0].checked) {gradient.model="radial-gradient"}
    	return model;
    }
    function setGradient(model,deg,centerColor){
    	if(arguments.length === 0){
    		if(currentX>startX){
    			gradient.deg=Math.atan((currentY - startY)/(currentX - startX))*360/2/Math.PI-90;
    		}else{
    			gradient.deg=Math.atan((currentY - startY)/(currentX - startX))*360/2/Math.PI+90;
    		}
    	}else{
    		if (model) {gradient.model=model};
    		if(deg) {gradient.deg=deg};
    		var DmarkBar;
    		if (markBar[1].scrollWidth) {DmarkBar = markBar[1];} else{DmarkBar = markBar[0]}
    		gradient.modify = true;
    		var tem = [];
    		var l = getComputedStyle(DmarkBar).width.slice(0,-2);
    		Array.prototype.forEach.call(DmarkBar.children,function(element, index, array){
    			tem.push((Number(getComputedStyle(element).left.slice(0,-2)) + 10)/l*100);
    		});
    		console.log(tem);
    		//取tem的最小值以及index
    		//push进gradient.centerColor
    		gradient.centerColor = [];
    		function pushColor (tem) {
    			for (var j = tem.length - 1; j >= 0; j--) {
    				for (var i = tem.length - 1,min=tem[i],index=i; i > 0; i--) {
	    				if(min>tem[i-1]){
	    					min = tem[i-1];
	    					index = i-1;
	    				}
	    			}
	    			gradient.centerColor.push({
	    				color:DmarkBar.children[index].children[0].value,
	    				position:min
	    			});
	    			tem.splice(index,1,Number.MAX_VALUE);
	    		};
    		}
    		pushColor(tem);
    	}
    	console.log(gradient.centerColor);
    }
    function appGradient (el) {
    	var fix;
    	var model = (el == panel)?gradient.model:"linear-gradient";
    	if (gradient.model == "linear-gradient") {fix = Math.floor(gradient.deg-180)+"deg"}
    	if (gradient.model == "radial-gradient") {
    		if(el == panel){fix = "ellipse farthest-corner at " + startX  +"px "+ startY +"px "}else{fix = Math.floor(gradient.deg-180)+"deg";console.log("heheheh")};
    	}
    	el.style.backgroundColor="#eee";
    	if (gradient.modify) {
    		var c = "";
    		for (var i = 0; i <= gradient.centerColor.length - 1; i++) {
    			c += " ,"
    			c += gradient.centerColor[i].color;
    			c += " ";
    			c += gradient.centerColor[i].position;
    			c += "%";
    		};
    		console.log(c);
    		el.style.backgroundImage=model+"("+
    									fix + " " +
    									c+
    									")";

    	}else{
	    	el.style.backgroundImage=model+"("+
	    								fix + ", " +
	    								gradient.start.color +" "+ gradient.start.position +"% ,"+
	    								gradient.end.color +" "+ gradient.end.position +"%)";
		}
    }		
    function writeCode (backgroundImage) {
    	var code = document.getElementById('code');
    	var bgimag = getComputedStyle(panel)[backgroundImage];
    	if (bgimag == undefined) {
    		//code.textContent="失败";
    	}else{
            //js proto name replice css name...
            function upperToHyphenLower(match){
                return '-' + match.toLowerCase();
            }
            backgroundImage = backgroundImage.replace(/[A-Z]/,upperToHyphenLower);
    		code.textContent = backgroundImage + ":" + bgimag;
            location.hash = encodeURIComponent(code.textContent);
    	}
    }
    function showSetPanel (e) {
    	if (e.target.tagName == "SPAN") {
	    	setPanelBox.style.display = "flex";
	    	var toolName = e.target.parentElement.id;
	    	var showPanelName = "set" + toolName.charAt(0).toUpperCase() + toolName.slice(1,-4)+"Panel";
	    	var showPanel = document.getElementById(showPanelName);
	    	showPanel.style.display = "block";
	    	};
    }
    document.addEventListener("click",hiddenSetPanel,false);
    function hiddenSetPanel (e) {
    	if (e.target.classList.contains("setPanelClose")) {
    		setPanelBox.style.display = "none";
    		e.target.parentElement.parentElement.style.display = "none";
    	};
    }

    Array.prototype.forEach.call(markBar,function(x) {
    	x.addEventListener("dblclick",addColorMark,false);
    });
    function addColorMark (e) {
    	colorMark = document.createElement("label");
    	colorMarkInput = document.createElement("input");
    	colorMarkInput.type = "color";
    	colorMark.appendChild(colorMarkInput);
    	colorMarkGrag = document.createElement("span");
    	colorMark.appendChild(colorMarkGrag);
    	currentX=handlePosition(e,this).x;
    	colorMark.style.left = currentX-10 +"px";
    	colorMark.draggable = "true";
    	this.appendChild(colorMark);
    	setGradient(null,-90,null);
    	appGradient(document.getElementsByClassName('gradientPreview')[0]);
    	appGradient(document.getElementsByClassName('gradientPreview')[1]);
    }
    document.addEventListener("change",function(e) {
    	//console.log(e);
    	if (e.target.matches(".markBar input[type='color']")) {
    		setGradient(null,-90,null);
    		appGradient(document.getElementsByClassName('gradientPreview')[0]);
    		appGradient(document.getElementsByClassName('gradientPreview')[1]);
    	}
    },false);
    document.addEventListener("dragstart",colorMarkDragStart,false);
    document.addEventListener("drag",colorMarkDrag,false);
	document.addEventListener("dragover", function( e ) {
		// 取消默认阻止放置
		e.preventDefault();
		if(e.target.className != 'markBar'){
		}
	}, false);
	document.addEventListener("drop", function( e ) {
		// prevent default to allow drop
		e.preventDefault();
		if(e.target.className == 'markBar'){
			// 取消默认阻止放置
			dragged.style.left = e.layerX-10 +"px";
			setGradient(null,-90,null);
			appGradient(document.getElementsByClassName('gradientPreview')[0]);
			appGradient(document.getElementsByClassName('gradientPreview')[1]);
		}else{
			console.log(e);
			dragged.parentElement.removeChild(dragged);
			setGradient(null,-90,null);
    		appGradient(document.getElementsByClassName('gradientPreview')[0]);
    		appGradient(document.getElementsByClassName('gradientPreview')[1]);
		}
	}, false);
    function colorMarkDragStart (e) {
    	console.log(e);
    	dragged = e.target.tagName ==="SPAN"?e.target.parentElement:e.target;
    	e.dataTransfer.setData('text/plain',null);
    	e.dataTransfer.setDragImage(dragged, e.layerX, e.layerY);
    	e.dataTransfer.effectAllowed = "all";
    }
    function colorMarkDrag(e) {
    	//console.log(e);
    }
})()
