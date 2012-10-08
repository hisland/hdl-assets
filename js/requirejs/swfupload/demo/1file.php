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
				require(['swfupload/main'], function(SWFUpload) {
					window.up1 = SWFUpload.initOld({
						url: '../upload.php',
						upload_name: 'god',
						placeholder_id: 'spanButtonPlaceHolder'
					});
					window.up2 = SWFUpload.initOld({
						url: '../upload.php',
						upload_name: 'god',
						placeholder_id: 'spanButtonPlaceHolder2',
						button: 'xpNoText'
					});
					window.up3 = SWFUpload.initOld({
						url: '../upload.php',
						upload_name: 'god',
						filter: '*.xls',
						multi: true,
						filte_desc: 'Excel Document',
						placeholder_id: 'spanButtonPlaceHolder3'
					});
				});
			}
		};
</script>
<script type="text/javascript" src="../../require.js"></script>
</head>
<body>
	<h2>单文件上传</h2>
	<p>xpButton带文字      <span id="spanButtonPlaceHolder"></span></p>
	<p>xpButton自定义文字 <span id="spanButtonPlaceHolder2"></span></p>	

	<hr />
	<h2>多文件上传</h2>
	<p>可选多个文件 <span id="spanButtonPlaceHolder3"></span></p>
</body>
</html>