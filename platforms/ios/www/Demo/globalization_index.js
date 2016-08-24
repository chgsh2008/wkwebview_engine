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
    //document.addEventListener('deviceready', onDeviceready, false);
    //function onDeviceready() {

        var element = document.getElementById('LOG');
        var Log = "";
        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });


        document.getElementById("btnLanguage").addEventListener('click',function () {
            alert("get language");
            bsl.globl.getPreferredLanguage(
                function (language) {
                    Log+='language: ' + language.value + '<br/>';
                    element.innerHTML = Log;
                },
                function () {
                    alert('Error getting language\n');
                });
        });

        document.getElementById("btnLocaleName").addEventListener('click',function () {
            bsl.globl.getLocaleName(
                function (locale) {
                    Log+='locale: ' + locale.value + '<br/>';
                    element.innerHTML = Log;
                },
                function () {
                    alert('Error getting locale\n');
                });
        });

        document.getElementById("btnDateToString").addEventListener('click',function () {
            bsl.globl.dateToString(
                new Date(),
                function (date) {
                    Log+='date: ' + date.value + '<br/>';
                    element.innerHTML = Log;
                },
                function () {
                    alert('Error getting dateString\n');
                },
                { formatLength: 'short', selector: 'date and time' }
            );
        });

        document.getElementById("btnStringToDate").addEventListener('click',function () {
            bsl.globl.stringToDate(
                '9/9/2015',
                function (date) {
                    Log+='month:' + date.month +
                    ' day:'  + date.day   +
                    ' year:' + date.year  + '<br/>';
                    element.innerHTML = Log;
                },
                function () {
                    alert('Error getting date\n');
                },
                {selector: 'date'}
            );
        });

        document.getElementById("btnDatePattern").addEventListener('click',function () {
            bsl.globl.getDatePattern(
                function (date) {
                    Log+='pattern: ' + date.pattern + '<br/>';
                    element.innerHTML = Log;
                },
                function () {
                    alert('Error getting pattern\n');
                },
                { formatLength: 'short', selector: 'date and time' }
            );
        });

        document.getElementById("btnDateNames").addEventListener('click',function () {
            bsl.globl.getDateNames(
                function (names) {
                    for (var i = 0; i < names.value.length; i++) {
                        Log+='month: ' + names.value[i] + '<br/>';
                    }
                    element.innerHTML = Log;
                },
                function () { alert('Error getting names\n'); },
                { type: 'wide', item: 'months' }
            );
        });

        document.getElementById("btnIsDayLightSavingsTime").addEventListener('click',function () {
            bsl.globl.isDayLightSavingsTime(
                new Date(),
                function (date) {
                    Log+='dst: ' + date.dst + '<br/>';
                    element.innerHTML = Log;
                },
                function () {alert('Error getting names\n');}
            );
        });

        document.getElementById("btnFirstDayOfWeek").addEventListener('click',function () {
            bsl.globl.getFirstDayOfWeek(
                function (day) {
                    Log+='day: ' + day.value + '<br/>';
                    element.innerHTML = Log;
                },
                function () {alert('Error getting day\n');}
            );
        });

        document.getElementById("btnNumberToString").addEventListener('click',function () {
            bsl.globl.numberToString(
                3.1415926,
                function (number) {
                    Log+='number: ' + number.value + '<br/>';
                    element.innerHTML = Log;
                },
                function () {
                    alert('Error getting number\n');
                },
                {type:'decimal'}
            );
        });

        document.getElementById("btnStringToNumber").addEventListener('click',function () {
            bsl.globl.stringToNumber(
                '1234.56',
                function (number) {
                    Log+='number: ' + number.value + '<br/>';
                    element.innerHTML = Log;
                },
                function () {
                    alert('Error getting number\n');
                },
                {type:'decimal'}
            );
        });

        document.getElementById("btnNumberPattern").addEventListener('click',function () {
            bsl.globl.getNumberPattern(
                function (pattern) {
                    Log+='pattern: '  + pattern.pattern  + '<br/>' +
                    'symbol: '   + pattern.symbol   + '<br/>' +
                    'fraction: ' + pattern.fraction + '<br/>' +
                    'rounding: ' + pattern.rounding + '<br/>' +
                    'positive: ' + pattern.positive + '<br/>' +
                    'negative: ' + pattern.negative + '<br/>' +
                    'decimal: '  + pattern.decimal  + '<br/>' +
                    'grouping: ' + pattern.grouping;
                    element.innerHTML = Log;
                },
                function () {alert('Error getting pattern\n');},
                {type:'decimal'}
            );
        });

        document.getElementById("btnCurrencyPattern").addEventListener('click',function () {
            bsl.globl.getCurrencyPattern(
                'USD',
                function (pattern) {
                    Log+='pattern: '  + pattern.pattern  + '<br/>' +
                        'code: '     + pattern.code     + '<br/>' +
                        'fraction: ' + pattern.fraction + '<br/>' +
                        'rounding: ' + pattern.rounding + '<br/>' +
                        'decimal: '  + pattern.decimal  + '<br/>' +
                        'grouping: ' + pattern.grouping;
                    element.innerHTML = Log;
                },
                function () { alert('Error getting pattern\n'); }
            );
        });


    //}
});