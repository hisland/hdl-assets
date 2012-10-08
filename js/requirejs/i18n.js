define(['kissy'], function(S){
	var I18N = window.JSI18N || {};
	var rs = {
		getText: function(){
			if(arguments.length === 1){
				return this.getText1(arguments[0]);
			}else if(arguments.length === 2){
				if(S.isPlainObject(arguments[1])){
					return this.getText2.apply(this, arguments);
				}else{
					return this.getText3.apply(this, arguments);
				}
			}else if(arguments.length > 2){
				return this.getText3.apply(this, arguments);
			}else{
				throw 'getText need at least 1 argument';
			}
		},
		getText1: function(str){
			return I18N[str] || str;
		},
		getText2: function(str, obj){
			str = this.getText1(str);
			return S.substitute(str, obj);
		},
		getText3: function(/* str1, str2, str3... */){
			var param = S.makeArray(arguments), str = param.shift(), obj = {};
			S.each(param, function(v, i, o){
				obj[i] = v;
			});
			return this.getText2(str, obj);
		}
	};

	window.getText = function(){
		return rs.getText.apply(rs, arguments);
	}

	return rs;
});