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


function getFileSize(fileObj){
	var ua = navigator.userAgent;
	var size = 0;
	//standared
	if(fileObj.files){
		size = fileObj.files[0].size;
	}else if(/msie/i.test(ua)){
		//img DYNSRC, must uppercase
		var img = new Image();
		img.DYNSRC = fileObj.value;
		size = img.fileSize;
		alert(size);


		//img src
		img.src = fileObj.value;
		img.onload = function(e){
			alert(this.fileSize)
		}

		function checkState(){
			if (img.readyState === 'complete') {
				alert(33);
			} else {
				alert(img.readyState);
				setTimeout(checkState, 100);
			}
		}
		checkState();
		$('body')[0].appendChild(img)
		alert(33)
	}

	//如果还没有得到,则尝试fso
	try{
		if(size === -1){
			var fso = new ActiveXObject('Scripting.FileSystemObject');
			size = fso.GetFile(fileObj.value).size;
		}
	}catch(e){
	}
	return size;
}
