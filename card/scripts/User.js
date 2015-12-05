define(function(){
	function User(){
		this.cards;//手里的牌
		this.oldCards;//打过的牌
	}
	User.prototype.outCard = function (cs){
		//出牌啊
		//思考之后出牌
		cs.forEach(function(c){
			this.oldCards.push((this.cards.splice(c,0))[0]);
		})
	}
	//按大小排序
	User.prototype.sortBySize = function (){

	}
	//是否有n个的顺子
	User.prototype.haveJunko = function (n){

	}
	//是否有三张
	User.prototype.haveThree = function (n){

	}
	//是否有对子
	User.prototype.havePair = function (){
		
	}
	//是否有炸
	User.prototype.haveBomb = function (){
		this.cards.forEach(function(c){
			c
		})
	}

	return User;
})