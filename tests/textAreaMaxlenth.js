//静态类的名称--ChkTextAreaMaxLen
function ChkTextAreaMaxLen() {           } 
//静态类的变量列表--ChkTextAreaMaxLen
ChkTextAreaMaxLen.maxLength=0;
ChkTextAreaMaxLen.element=null;   
//静态类的函数列表--ChkTextAreaMaxLen
ChkTextAreaMaxLen.Init=function (varMaxLenth,varID){ 
    ChkTextAreaMaxLen.maxLength=varMaxLenth;
    ChkTextAreaMaxLen.element =document.all[varID];
    if (ChkTextAreaMaxLen.element.attachEvent){
	    ChkTextAreaMaxLen.element.attachEvent("onkeypress",ChkTextAreaMaxLen.doKeypress);
	    ChkTextAreaMaxLen.element.attachEvent("onkeydown",ChkTextAreaMaxLen.doKeydown);
	    ChkTextAreaMaxLen.element.attachEvent("onbeforepaste",ChkTextAreaMaxLen.doBeforePaste);
	    ChkTextAreaMaxLen.element.attachEvent("onpaste",ChkTextAreaMaxLen.doPaste);
    }else{
    	ChkTextAreaMaxLen.element.addEventListener('onkeypress',ChkTextAreaMaxLen.doKeypress,false);
    	ChkTextAreaMaxLen.element.addEventListener('onkeydown',ChkTextAreaMaxLen.doKeydown,false);
    	ChkTextAreaMaxLen.element.addEventListener('onbeforepaste',ChkTextAreaMaxLen.doBeforePaste,false);
    	ChkTextAreaMaxLen.element.addEventListener('onpaste',ChkTextAreaMaxLen.doPaste,false);
    }
};

ChkTextAreaMaxLen.doKeypress=function ()
{
    if(!isNaN(ChkTextAreaMaxLen.maxLength))
    {
        ChkTextAreaMaxLen.maxLength = parseInt(ChkTextAreaMaxLen.maxLength);
        var oTR = ChkTextAreaMaxLen.element.document.selection.createRange();
        if(oTR.text.length >= 1)
                  event.returnValue = true;
        else if(ChkTextAreaMaxLen.element.value.length > ChkTextAreaMaxLen.maxLength-1)
                  event.returnValue = false;
    }
};

ChkTextAreaMaxLen.doKeydown=function ()
{
    setTimeout(function()
    {
        ChkTextAreaMaxLen.maxLength = parseInt(ChkTextAreaMaxLen.maxLength);
        if(!isNaN(ChkTextAreaMaxLen.maxLength))
        {
              if(ChkTextAreaMaxLen.element.value.length > ChkTextAreaMaxLen.maxLength-1)
              {//超过了指定的范围，则重新定位开始的位置，并清空。
              //比如 oTR="123456";而我们只能输入4位，则oTR.moveStart("character",-1*(6-4))--->oTR.moveStart("character",-2) 移去2位，就剩下“1234”
                  var oTR = window.document.selection.createRange();
                  oTR.moveStart("character", -1*(ChkTextAreaMaxLen.element.value.length-ChkTextAreaMaxLen.maxLength))
                  //oTR.text = "";
              }
        }
    },1)
};

ChkTextAreaMaxLen.doBeforePaste=function ()
{
    if(!isNaN(ChkTextAreaMaxLen.maxLength))//如果为真的话，就执行源对象上的操作，否则取消源对象上的操作
              event.returnValue = false;
};

ChkTextAreaMaxLen.doPaste=function ()
{
    if(!isNaN(ChkTextAreaMaxLen.maxLength))
    {
        event.returnValue = false;
        ChkTextAreaMaxLen.maxLength = parseInt(ChkTextAreaMaxLen.maxLength);
        var oTR = ChkTextAreaMaxLen.element.document.selection.createRange();
        var iInsertLength = ChkTextAreaMaxLen.maxLength - ChkTextAreaMaxLen.element.value.length + oTR.text.length;
        //截断字符
        var sData = window.clipboardData.getData("Text").substr(0, iInsertLength);
        oTR.text = sData;
    }
};