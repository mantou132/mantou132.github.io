function enumeration(array){
	function enumeration(){};
	var proto = enumeration.prototype = {
		constructor:enumeration,
		toString:function(){return this.name;},
		valueOf:function(){return this.value;},
		toJSON:function(){return this.name;}
	}

	//类的静态方法
	enumeration.forEach = function(f,c){
		for(e of this.values){f.call(c,e)}
	}
	enumeration.values = [];
	for (var i = array.length - 1; i >= 0; i--) {
		var e = Object.create(proto);
		e.name = array[i];
		e.value = i;
		enumeration.values.push(e);
	}

	//返回一个新的枚举类型类，他包含有限个该类的值
	return enumeration;
}