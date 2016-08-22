/**
 * Created by james on 15/9/10.
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
        
        function createC(){
        var name=document.getElementById("name").value;
        var phoneNumbers=document.getElementById("number").value;
        var myContact = bsl.contacts.create();
        myContact.displayName=name;
        myContact.phoneNumbers = [{type:"phone",value:phoneNumbers,preferred:true}];
        function onSaveSuccess(){
        alert("The contact name:" + myContact.displayName+",number:"+myContact.phoneNumbers.value);
        }
        function onSaveError(){
        alert("The error");
        }
        myContact.save(onSaveSuccess,onSaveError);
        }
        
        function findC(){
        var name=document.getElementById("name").value;
        var phoneNumbers=document.getElementById("number").value;
        var options = new ContactFindOptions();
        options.filter=name;
        options.multiple=true;// show all
        var fields = ["displayName", "phoneNumbers"];
        function success(contactsArray) {
        alert("length:"+contactsArray.length);
        var a="";
        for (var i=0; i<contactsArray.length; i++) {
         a = a+"Display Name = " + contactsArray[i].displayName+"phone: "+contactsArray[i].phoneNumbers[0].value;
        }
        }
        alert(a);
        function error(msg) {
        alert('onError!'+msg);
        }
        bsl.contacts.find (fields, success, error, options);
        }
        
        function findAllC(){
        var options = new ContactFindOptions();
        options.filter="";
        options.multiple=true;// show all
        var fields = ["displayName", "phoneNumbers"];
        function success(contactsArray) {
        alert("length:"+contactsArray.length);
        for (var i=0; i<contactsArray.length; i++) {
        console.log("Display Name = " + contactsArray[i].displayName+"phone: "+contactsArray[i].phoneNumbers[0].value);
        }
        }
        function error(msg) {
        alert('onError!'+msg);
        }
        bsl.contacts.find(fields, success, error, options);
        }
        function chooseContact(){
        
        function successCallback(aa){
        alert(JSON.stringify(aa));
        }
        var options=[];
        
        cordova.exec(successCallback, null, "Contacts","chooseContact", [options]);
        
        }
        
        document.getElementById("createContacts").addEventListener("click",createC,false);
        document.getElementById("findContacts").addEventListener("click",findC,false);
        document.getElementById("showAllContacts").addEventListener("click",findAllC,false);
        }
        
        
        
        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });
        
        
        document.getElementById("btnCreateFile").addEventListener('click',function () {
                                                                  var showInfo=document.getElementById("LOG");
                                                                  var LOG="";
                                                                  var now = new Date();
                                                                  var nowStr = now.getFullYear() +"" +(now.getMonth()+1) +""+now.getDate() +""+now.getHours() +""+now.getMinutes() +""+now.getSeconds() +""+now.getMilliseconds();
                                                                  nowStr = "File"+nowStr+".txt";
                                                                  
                                                                  });
        
        
        
        });


