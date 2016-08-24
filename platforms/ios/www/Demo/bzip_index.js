/**
 * Created by kevin on 15/9/10.
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

        //document.getElementById("btnBack").addEventListener('click',function () {
        //    window.history.back(-1);
        //});


        function compress(){
            bsl.zip.compress(function(){ alert('success')},function (){alert('error')},"test.txt","ziptest.zip");

        }
        function decompress(){
            bsl.zip.decompress(function(){ alert('success')},function (){alert('error')},"ziptest.zip","test");

        }
        function createTestFile(){
            bsl.zip.createTestFile(function(){ alert('success')},function (){alert('error')});

        }
        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });

        document.getElementById("createTestFile").addEventListener("click",createTestFile,false);
        document.getElementById("compress").addEventListener("click",compress,false);
        document.getElementById("decompress").addEventListener("click",decompress,false);


    }
});
