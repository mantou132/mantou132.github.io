define(["factory","module"], function(factory,module) {//直接异步加载完毕执行回调函数，但是这样污染了全局变量
	//console.log(module.config().test);//将配置信息传入模块,module是内建的
	function Card (suit,rank) { // 定义牌种 类
		this.suit = suit;//花色
		this.rank = rank;//点数
	}

	//类的静态属性
	Card.Suits = enumeration(["方块","梅花","红桃","黑桃"]);
	Card.Ranks = enumeration([3,4,5,6,7,8,9,10,"J","Q","K","A",2]);
	Card.Kings = enumeration((function(){
			var k = new Array(13);
			k.push("小王","大王");
			return k;
		})());

	Card.prototype.toString = function(){
		return this.suit.toString() + this.rank.toString();//+ 先valueOf,只会作toString
	}
	//比较
	Card.prototype.compareTo = function(that){//?:右结合性
		return this.rank < that.rank ? -1 ://sort中表示小
				this.rank > that.rank ? 1 : 0;
	}

	//sort规则函数
	Card.orderByRank = function(a,b){return a.compareTo(b);}

	Card.orderBySuit = function(a,b){
		return a.rank < b.rank ? -1 :
				a.rank > b.rank ? 1 :
				a.suit < b.suit ? -1 :
				a.suit > b.suit ? 1 : 0;
	}

	function Deck(king){//定义 扑克 牌
		var cards = this.cards = [];
		Card.Suits.forEach(function(s){
			Card.Ranks.forEach(function(r){
				cards.push(new Card(s,r))
			})
		})
		king && Card.Kings.forEach(function(r){
				cards.push(new Card("",r))
			})
	}

	//随机切换牌顺序
	Deck.prototype.shuffle = function(){
		for (var i = this.cards.length - 1; i >= 0; i--) {
			var r = Math.floor(Math.random()*(i+1));
			temp = this.cards[i];
			this.cards[i] = this.cards[r];
			this.cards[r] = temp;
		}
		return this;
	}
	//发牌,返回发的牌并更新牌。
	Deck.prototype.deal = function(n){
		return this.cards.splice(this.cards.length - n,n);
	}

	return Deck;
});
