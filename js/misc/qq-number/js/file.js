//读写本地文件类
(function(){

	//fileName 是相对于当前文件的相对路径,如 user/userid/user.xml
	window.file = function(fileName){
		return new init(fileName);
	}
	function init(fileName){
		//获取文件相对于此文件的目录
		var root =decodeURI(window.location.href);
		this.root = root = root.substring(8,root.lastIndexOf('/')+1);

		//相关参数
		var path = this.path = root + fileName;
		var fso = this.fso = createFso();
		var file;
		var temp;

		//打开文件就已读取内容
		if(fso.FileExists(path)){
			file = fso.OpenTextFile(path,1);
			this.content = file.AtEndOfStream ? '' : file.ReadAll();
		
		//文件不存在则建立
		}else if(confirm('文件不存在,是否要创建?')){
			temp = fileName.substring(0,root.lastIndexOf('/')).split('/');
			path = root;
			for(var i=0;i<temp.length-1;i++){
				path += temp[i]+'/';
				if(!fso.FolderExists(path)){
					fso.CreateFolder(path);
				}
			}
			path += temp[temp.length-1];
			
			file = fso.CreateTextFile(path,true);
			this.content = '';
		}
		else{
			alert('要打开的文件不存在');
		}
		file.Close();
	}

	//建立FSO
	function createFso(){
		var fso = '';
		if(/*@cc_on!@*/1){
			return false;
		}
		try{
			fso = new ActiveXObject('scripting.fileSystemObject');
		}catch(e){
			alert("你必须点击【是】才能使用文件操作");
			return createFso();
		}
		if(fso) return fso;
		else alert('不能建立FSO');
	}
	//建立CMD
	function createCMD(){
		var cmd = '';
		if(/*@cc_on!@*/1){
			return false;
		}
		try{
			cmd = new ActiveXObject('WScript.Shell');
		}catch(e){
			alert("你必须点击【是】才能使用文件操作");
			return createCMD();
		}
		if(cmd) return cmd;
		else alert('不能建立CMD');
	}

	//保存内容到文件,如文件已存在需要确认
	init.prototype.save = function(content){
		var file = this.fso.OpenTextFile(this.path,2,true);
		if(confirm('文件会被覆盖,是否继续?')){
			file.Write(content);
		}
		file.Close();
	}

	//删除文件,需要确认
	init.prototype.del = function(){}

	//移动文件,需要确认
	init.prototype.move = function(to){}

	//重写文件类的toString方法
	init.prototype.toString = function(){
		return this.content;
	}
})();