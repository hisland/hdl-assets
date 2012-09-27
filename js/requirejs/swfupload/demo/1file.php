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
					SWFUpload.initOld({
						url: '../upload.php',
						upload_name: 'god',
						placeholder_id: 'spanButtonPlaceHolder'
					});
					SWFUpload.initOld({
						url: '../upload.php',
						upload_name: 'god',
						placeholder_id: 'spanButtonPlaceHolder2',
						button: 'xpNoText'
					});
				});
			}
		};
</script>
<script type="text/javascript" src="../../require.js"></script>
</head>
<body>
	<span id="spanButtonPlaceHolder"></span>
	<span id="spanButtonPlaceHolder2"></span>
</body>
</html>