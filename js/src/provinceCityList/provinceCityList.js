provinceCityList = 
	{
		'0100':{
				 name:'北京'
				,citys:['101']
			}
		'2':{
				 name:'四川'
				,citys:['201',]
			}
	};

provinceCityList = 
	{
		'0100':{
				 name:'北京'
				,citys:['101']
			}
		'2':{
				 name:'四川'
				,citys:['201',]
			}
	};
//省市县都是此形式的对象,pid可以找到属于哪个,list可以知道包含哪些
//省:{name:'', id:'', pid:null, type:'province', list:[id, id, id]}
//市:{name:'', id:'', pid:'pid', type:'city', zip_code:'644000', area_code:'028', list:[id, id, id]}
//县:{name:'', id:'', pid:'pid', type:'county', zip_code:'644000', area_code:'028'}

//服务器返回省列表内容
{
	 type:'province'
	,id: 28
	,name:'四川'
	,pid:null
	,list:[28, 29, 30, 31]
};
//服务器返回市列表内容
{
	 type:'city'
	,id: 28
	,name:'成都'
	,pid:28
	,list:list:[28, 29, 30, 31]
};
//服务器返回县列表内容
{
	 type:'county'
	,id: 28
	,name:'大邑'
	,pid:28
};

provinceCityList = {};

//设置获取数据的URL
provinceCityList.url = 'url'
provinceCityList.beforeGet()
provinceCityList.afterGet()

//获取省列表
provinceCityList.getProvinces = function(callback){
	$.post(this.url, '', function(data){
		//处理返回数据

		if(typeof callback == 'function'){
			callback();
		}
	})
}

//获取对应省ID的市列表 pIds为'1,3,4',
provinceCityList.getCities = function(pIds, callback){
	$.post(this.url, 'pid='+pIds, function(data){
		//处理返回数据

		if(typeof callback == 'function'){
			callback();
		}
	})
}

//根据id,name获得一个节点
provinceCityList[key];
//根据节点获得某个属性值
provinceCityList[key][key];

//快捷名称和代码互换
provinceCityList.getName = function(id){
	var item = this.item(id);
	if(item){
		return item.name;
	}else{
		alert('不能获得值: '+ id);
	}
}
provinceCityList.getId = function(name){
	var item = this.item(name);
	if(item){
		return item.id;
	}else{
		alert('不能获得值: '+ id);
	}
}


function item(){}
item.prototype = {
	 attr: function(key){
		if(this[key]){
			return this[key];
		}else{
			alert('不能获得值: '+ id);
		}
	}
}

//制作联动的类
function ABCList(){
	
}

provinceCityList = new ABCList();