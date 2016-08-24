define(function(require) {
  var v1 = require('com.infinitus.butterfly/components/cache');
  var v2 = require('com.infinitus.butterfly/components/dialog');
  var v3 = require('com.infinitus.butterfly/components/loader');
  var v4 = require('com.infinitus.butterfly/components/i18n');
  var v5 = require('com.infinitus.butterfly/components/list');
  var v6 = require('com.infinitus.butterfly/components/session');
  var v7 = require('com.infinitus.butterfly/components/store');
  var v8 = require('com.infinitus.butterfly/components/toast');
  var v9 = require('com.infinitus.butterfly/components/parseJSON');
  

  return {
    'Cache': v1,
    'Dialog': v2,
    'Loader': v3,
    'I18n': v4,
    'List': v5,
    'Session': v6,
    'Store': v7,
    'Toast': v8,
    'parseJSON': v9
  };
});