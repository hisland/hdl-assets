function getFileSize(fileObj){
	var ua = navigator.userAgent;
	var size = 0;
	if(/msie/i.test(ua)){
		var img = new Image();
		img.dynsrc = fileObj.value;
		size = img.fileSize;
	}else if(/firefox/i.test(ua)){
		size = fileObj.files[0].fileSize;
	}

	//如果还没有得到,则尝试fso
	if(size == -1){
		var fso = new ActiveXObject('Scripting.FileSystemObject');
		size = fso.GetFile(fileObj.value).size;
	}
	return size;
}