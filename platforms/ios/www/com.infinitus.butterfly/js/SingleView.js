define(['..//view'], function(View){

  //show only contain one direct subview
  return View.extend({

    initialize: function(options){
      View.prototype.initialize.apply(this, arguments);
    },

    route: function(paths, options){  
      var path = (paths === null) ? 'views/main' : paths;
      this.showLoading();//添加loading层
      require(['view!' + path + '.html'], function(ViewClass){
        var newView = new ViewClass();
        newView.render();
        this.el.innerHTML = '';
        this.el.appendChild(newView.el);
        newView.show();
        this.hideLoading();//删除loading层
      }.bind(this), function(err){
        Backbone.history.navigate('#/');
      });

    }
  });
});
