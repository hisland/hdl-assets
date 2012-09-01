define(['jquery', 'kissy'], function($, S){
	return {
		mapName2File: {},
		menuXML: {},
		makeMenuXML: function(){
			return (new XMLSerializer()).serializeToString(this.menuXML);
		},
		getMap: function(fn){
			var T = this;
			$.get('menu-map.txt', function(rs){
				rs.replace(/\t*([^\t]+)\t+(\w+)/g, function(a, b, c){
					T.mapName2File[b] = c;
					return a;
				});
				fn();
			});
		},
		getExMenu: function(fn){
			var T = this;
			$.get('menuWAD.xml', function(rs){
				T.menuXML = rs;
				fn();
			}, 'xml');
		},
		readData: function(fn){
			var T = this;
			T.getMap(function(){
				T.getExMenu(function(){
					fn();
				});
			});
		}
	};
});