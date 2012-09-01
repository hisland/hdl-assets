define(['jquery', 'kissy'], function($, S){
	var I18N = window.I18N || {};

	return {
		getText: function(str){
			if(arguments.length === 1){
				return this.getText1(str);
			}else if(arguments.length > 1){
				return this.getText2.apply(this, arguments);
			}else{
				return 'getText need at least 1 argument';
			}
		},
		getText1: function(str){
			return I18N[str] || str;
		},
		getText2: function(/* str1, str2, str3... */){
			var param = S.makeArray(arguments),
				str = param.shift();
			return str;
		}
	};
});