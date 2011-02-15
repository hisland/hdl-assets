//将长度为1的字符串前置0
function length1Prefix0(value){
	value += '';
	return value.length==1 ? '0'+value : value;
}

/**********************************************************************************************
 * 
 * 增加日期对象方法
 * 
 * 有value设置日期,无value读取日期
 * 参数形式:'2010-09-01'|'2010/09/01' 前置0可省略
 * 
 */
Date.prototype.dateString = function(value){
	if(value){
		value += '';
		var arr = value.match(/\d{4}([-\/])\d{1,2}\1\d{1,2}/);
		if(!arr){
			alert('Date.prototype.dateString: 出错,请确保参数格式为 2010-09-01 或 2010/09/01 前置0可省略');
			throw 'Date.prototype.dateString: 出错,请确保参数格式为 2010-09-01 或 2010/09/01 前置0可省略';
		}
		this.setFullYear(arr[1]);
		this.setMonth(arr[2]-1);
		this.setDate(arr[3]);
		return this;
	}else{
		var  y = this.getFullYear()
			,m = length1Prefix0(this.getMonth()+1)
			,d = length1Prefix0(this.getDate());
		return y+'-'+m+'-'+d;
	}
};
Date.prototype.timeString = function(value){
	if(value){
		value += '';
		var arr = value.match(/\d{1,2}:\d{1,2}:\d{1,2}/);
		if(!arr){
			alert('Date.prototype.timeString: 出错,请确保参数格式为 09:05:02 前置0可省略');
			throw 'Date.prototype.timeString: 出错,请确保参数格式为 09:05:02 前置0可省略';
		}
		this.setHours(arr[1]);
		this.setMinutes(arr[2]);
		this.setSeconds(arr[3]);
		return this;
	}else{
		var  h = length1Prefix0(this.getHours())
			,m = length1Prefix0(this.getMinutes())
			,s = length1Prefix0(this.getSeconds());
		return h+':'+m+':'+s;
	}
};
Date.prototype.dateTimeString = function(value){
	if(value){
		value += '';
		var arr = value.match(/(\d{4}([-\/])\d{1,2}\2\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2})/);
		if(!arr){
			alert('Date.prototype.dateTimeString: 出错,请确保参数格式为 2010-09-01 09:05:02 或 2010/09/01 09:05:02 前置0可省略');
			throw 'Date.prototype.dateTimeString: 出错,请确保参数格式为 2010-09-01 09:05:02 或 2010/09/01 09:05:02 前置0可省略';
		}
		this.dateString(arr[1]);
		this.timeString(arr[3]);
		return this;
	}else{
		return this.dateString()+' '+this.timeString();
	}
};
Date.prototype.isValid = function(){
	if(/^NaN$|^Invalid Date$/.test(this.toString())){
		return false;
	}
	return true;
};

