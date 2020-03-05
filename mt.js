// if (window!=top) top.location.href =window.location.href; 

try{
  window.top.location.hostname;
    if (top.location.hostname != window.location.hostname)
    {
     top.location.href =window.location.href;
    }
}
catch(e){
   top.location.href =window.location.href;
}
//Prevent the page from being sneaked into the framework of the code 防止网站被嵌入框架代码
