define(function(){
       var upload=function(){
       this.gt=new FileTransfer()
       }
       
       upload.prototype.upload=function(filePath, server, successCallback, errorCallback, options, trustAllHosts){
       this.gt.upload (filePath, server, successCallback, errorCallback, options, trustAllHosts)
       }
       //progress:function(){
       //    .onprogress
       //
       //}
       upload.prototype.progress=function(){
       this.gt.onprogress
       }
       
       
       upload.prototype.abort=function(){
       this.gt.abort();
       
       }
       
       
       
       return upload;
       //       return window;
       });