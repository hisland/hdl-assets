<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>new document</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<script type="text/javascript">
var require = {
	baseUrl: '../../',
	deps: ['config'],
	callback: function() {
		require(['swfupload/main', 'less'], function(SWFUpload) {
			window.up1 = SWFUpload.initOneFile({
				upload_url: 'upload.php',
				file_post_name: 'god',
				file_size_limit: 20,
				placeholder_id: 'spanButtonPlaceHolder',
				swfupload_loaded_handler: function() {
					console.log('swfUploadLoaded()')
				},
				file_dialog_start_handler: function() {
					return false;
					console.log('fileDialogStart()')
				},
				file_queued_handler: function() {
					console.log('fileQueued(file object)')
					console.log(arguments)
				},
				file_queue_error_handler: function() {
					console.log('fileQueueError(file object, error code, message)')
					console.log(arguments)
				},
				file_dialog_complete_handler: function() {
					console.log('fileDialogComplete(number of files selected, number of files queued, total number of files in the queued)')
					console.log(arguments)
				},
				upload_start_handler: function() {
					console.log('uploadStart(file object)')
					console.log(arguments)
				},
				upload_progress_handler: function() {
					console.log('uploadProgress(file object, bytes complete, total bytes)')
					console.log(arguments)
				},
				upload_error_handler: function() {
					console.log('uploadError(file object, error code, message)')
					console.log(arguments)
				},
				upload_success_handler: function() {
					console.log('uploadSuccess(file object, server data, received response)')
					console.log(arguments)
				},
				upload_complete_handler: function() {
					console.log('uploadComplete(file object)')
					console.log(arguments)
				},
				debug_handler: function() {
					console.log('debug(message)');
					console.log(arguments)
				}
			});
		});
	}
};
</script>
<script type="text/javascript" src="../../require-2.1.1.js"></script>
<style type="text/css">
	body{padding: 20px;}
	.box{border: 1px solid #ccc;margin-bottom: 10px;}
	.box p{padding: 5px;}
</style>
</head>
<body>
	<h1>单文件上传</h1>
	<div class="box">
		<p>xpButton带文字</p>
		<p><span id="spanButtonPlaceHolder"></span></p>
	</div>
</body>
</html>