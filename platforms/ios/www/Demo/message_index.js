/**
 * Created by kevin on 15/9/9.
 */

require.config({
               baseUrl: '../',
               paths: {
               bsl: 'bsl',
               }
               });
require(['bsl'],function(bsl) {
    document.addEventListener('deviceready', onDeviceready, false);
    function onDeviceready() {

        document.getElementById("host").value="smtp.mxhichina.com" ;
        document.getElementById("port").value="25";
        document.getElementById("account").value="zhuzhipeng@foreveross.com";
        document.getElementById("password").value="abc123!!";
        document.getElementById("to").value="651289808@qq.com;zhuzhipeng10000@163.com";
        document.getElementById("cc").value="";
        document.getElementById("bcc").value="";
        document.getElementById("title").value="测试";
        document.getElementById("attach").value=cordova.file.applicationDirectory+"cc.xlsx;"+cordova.file.applicationDirectory+"gg.txt;"+cordova.file.applicationDirectory+"jj.png";
        document.getElementById("content").value="测试的1234";
        document.getElementById("messageTo").value="10086;10010";
        document.getElementById("messageContent").value="测试测试看下";
        
        alert("Message");
        function setEmailSenderInfo() {
        alert("setEmailSendInfo");
        
        bsl.message.setEmailSenderInfo(function(){
                                       alert("set successful")
                                       }, function(amessage){
                                       alert(amessage)
                                       },
                                       {senderEmailAcount: document.getElementById("host").value,
                                       senderEmailPassword:document.getElementById("port").value,
                                       senderEmailServer:document.getElementById("account").value,
                                       senderEmailPort:document.getElementById("password").value
                                       });
        
        
        }
        
        function sendMessage() {
        alert("senMessage");
        
        bsl.message.sendMessage(function(amessage){
                                alert(amessage)
                                }, function(amessage){
                                alert(amessage)
                                },
                                
                                {to:document.getElementById("messageTo").value,
                                body:document.getElementById("messageContent").value});
        
        
        }
        
        function sendEmail() {
        alert("senEmail");
        
        bsl.message.sendEmail(function(amessage){
                              
                              alert(amessage)}, function(amessage){
                              alert(amessage)
                              
                              },
                              {subject: document.getElementById("title").value,
                              bodyType:"text/plain",
                              body: document.getElementById("content").value,
                              to: document.getElementById("to").value,
                              cc: document.getElementById("cc").value,
                              bcc: document.getElementById("bcc").value,
                              attach: document.getElementById("attach").value
                              });
        //        message.sendMessage();
        
        }
        
        document.getElementById("sendEmail").addEventListener("click", sendEmail, false);
        document.getElementById("sendMessage").addEventListener("click", sendMessage, false);
        document.getElementById("setEmailSenderInfo").addEventListener("click", setEmailSenderInfo, false);
        
        
       
        
        }});
