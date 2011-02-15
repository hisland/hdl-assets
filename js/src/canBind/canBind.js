function canBind(){}
canBind.prototype.getBindType = function(type){
	if(!this['--'+type]){
		this['--'+type] = [];
		sayLog('新建hdl事件类型: ' + type);
	}
	return this['--'+type];
}
canBind.prototype.bind = function(type, func){
	type = this.getBindType(type);
	if(typeof func === 'function'){
		for(var i=0;i<type.length;i++){
			if(type[i] === func){
				sayLog('以下函数已存在,不用重复注册:\n' + func);
				return false;
			}
		}
		type.push(func);
	}else{
		sayNotice('注册的参数func不是函数类型:\n' + func);
	}
	return this;
}
canBind.prototype.unbind = function(type, func){
	type = this.getBindType(type);
	if(func === undefined){
		type.length = 0;
	}else{
		for(var i=0;i<type.length;i++){
			if(type[i] === func){
				type.splice(i, 1);
				break;
			}
		}
	}
	return this;
}
canBind.prototype.trigger = function(type, func){
	type = this.getBindType(type);
	if(func === undefined){
		for(var i=0;i<type.length;i++){
			type[i].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}else{
		for(var i=0;i<type.length;i++){
			if(type[i] === func){
				type[i].apply(this, Array.prototype.slice.call(arguments, 1));
				break;
			}
		}
	}
	return this;
}