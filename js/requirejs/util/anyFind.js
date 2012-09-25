define(['jquery', 'kissy'], function($, S){

function Find(){
	this.data = {
		list: []
	};
	this.emptyAll = false;
}
$.extend(Find.prototype, {
	put: function(str, obj){
		if(S.isString(str) && $.isPlainObject(obj)){
			if(str.length === 0){
				return this;
			}

			var arr = str.split(''), i,
				global = this.data,	
				next = this.data;

			while(i = arr.shift()){
				if(next[i]){
					next = next[i];
					next.list.push(obj);
				}else{
					next[i] = {
						list: [obj]
					};
					if(next !== global){
						global[i] = next[i];
					}
					next = next[i];
				}
			}
		}
		return this;
	},
	remove: function(str, obj){
		//remove str all
		if(!obj){
			
		}else{
			
		}
		return this;
	},
	find: function(str){
		if(S.isString(str)){
			//空字符串操作
			if(str.length === 0){
				if(this.emptyAll){
					return this.data.list;
				}else{
					return null;
				}
			}

			var arr = str.split(''), i,
				next = this.data;

			while(i = arr.shift()){
				if(next[i]){
					next = next[i];
				}else{
					next = null;
					break;
				}
			}

			//还存在next则返回list
			if(next){
				return next.list;
			}else{
				return null;
			}
		}
		return null;
	},
	setEmptyAll: function(state){
		if($.isBoolean(state)){
			this.emptyAll = state;
		}
	}
});

Find.init = function(){
	return new Find();
};

return Find;

});