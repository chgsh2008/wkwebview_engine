/**
 * list view component
 * 下拉刷新实现方式：如检测到下拉控件，假设为40px，则滚动区top: -40px;
 */
define(['jquery',
		'underscore', 'backbone', 'iscroll',
		'com.infinitus.butterfly/components/listview/ListViewTemplateItem',
		'com.infinitus.butterfly/components/listview/notification'
	],
	function($, _, Backbone, IScroll, TItem, Notification) {

		var options = ['id', 'autoLoad', 'itemTemplate', 'itemClass', 'dataSource', 'pageSize', 'isPullToRefresh', 'isLoadSuccess'];
		var isFinish = false; //刘攀
		var listview = Backbone.View.extend({
			events: {
				"click .loadmore": "onLoadMore",
				"click li": "onRowSelect"
			},
			defaults: {
				autoLoad: true,
				editing: false,
				page: 0,
				pageSize: 20,
				isPullToRefresh: true,
				isLoadSuccess: false
			},

			initialize: function() {
				var me = this;
				this.subviews = [];

				//grab params
				_.extend(this, this.defaults, _.pick(arguments[0], options));

				//convert itemTemplate to itemClass
				if (this.itemTemplate) {
					//this.itemTemplate already compiled
					this.itemClass = TItem.extend({
						template: this.itemTemplate
					});
				}
				me.IScroll = new IScroll(this.el, {
					probeType: 2,
					scrollX: false,
					scrollY: true,
					mouseWheel: true,
					click: true,
					isPullToRefresh: this.isPullToRefresh
				});

				//隐藏pulldown
				if (this.el.querySelector('.pulldown')) {
					this.el.classList.add('withpulldown');
				};

				var $wrapper = $(me.IScroll.wrapper);
				var $pullDown = this.$pullDown = this.$('.pulldown');
				var $pullUp = this.$pullUp = this.$('.pullup');
				me.IScroll.on('scroll', function() {
					if(!$pullUp.hasClass("eliteS")){
					if (this.y > 10) {
						$pullDown.addClass('flip').find('.label').html('释放更新');
						$pullUp.addClass('flip').find('.label').html('上拉加载更多');
						this.minScrollY = 0;
					} else if (this.y < 10) {
						$pullDown.removeClass('flip').find('.label').html('下拉刷新');
						this.minScrollY = -$pullDown.height();
					};
					if (this.maxScrollY - this.y > 20) { //刘攀
						if (!isFinish) {
							$pullUp.removeClass("hidden");
						}
					} else {
						$pullUp.addClass("hidden");
					};
					if (this.maxScrollY - this.y > 50) {
						$pullUp.addClass('flip').find('.label').html('释放加载更多...');
					} else {
						$pullUp.removeClass('flip').find('.label').html('上拉加载更多...');
					};
					}
				});

				me.IScroll.on('scrollEnd', function() {
					//if already flip
					if(!$pullUp.hasClass("eliteS")){
					if ($pullDown.hasClass('flip')) {
						me.onPullDown();
					};
					if ($pullUp.hasClass('flip')) {
						me.onPullUp();
					} else {
						if (!$pullUp.hasClass('loading')) {
							$pullUp.addClass("hidden");
						};
					};
					};
				});

				if (this.autoLoad) {
					var state = this.loadState();
					if (state) {
						this.restoreData(state);
					} else {
						this.reloadData();
					}
				}

			}, //initialize

			//刷新
			refresh: function() {
				var me = this;
				setTimeout(function() {
					me.IScroll.refresh();
				}, 0);
			},

			refreshByState: function(state) {
				var me = this;
				setTimeout(function() {
					me.IScroll.refresh();
					me.IScroll.scrollTo(0, state.y);
				}, 0);
			},

			//选择了某一行
			onRowSelect: function(event) {
				var li = event.currentTarget;
				var liCollection = this.el.querySelector('ul').children;
				var index = _.indexOf(liCollection, li);
				var item = this.subviews[index];
				if (!this.editing) {
					this.trigger('itemSelect', this, item, index, event);
				} else {
					item.toggleSelect();
					//监听在编辑状态下被选中的事件
					this.trigger('editItemSelect', this, item, index, event);
				}
			},

			//下拉的默认行为为重新加载数据
			//可以通过覆盖此方法，实现类似Twitter的加载更多旧数据
			onPullDown: function() {
				var me = this;
				//保存当前为刷新状态
				window.sessionStorage["refresh"] = true;
				me.reloadData();
			},

			onPullUp: function() {
				var me = this;
				if (me.$pullUp.hasClass('hidden')) {
					return;
				}
				this.$pullUp.removeClass('flip').addClass('loading').find('.label').html('加载中...');
				this.dataSource.loadData(this.page + 1, this.pageSize, function(result, finish) {

					//increase current page number when success
					me.page++;

					//stop loading animate
					// loadmoreButton.classList.remove('loading');

					//pullup
					me.$pullUp.removeClass('flip').removeClass('loading');
					//pullup
					if (finish) {
						isFinish = true;
						me.$pullUp.addClass('hidden')
							// me.$('.loadmore').removeClass('visible');
					} else {
						isFinish = false;
						me.$pullUp.removeClass('hidden').find('.label').html('上拉加载更多...');
						// me.$('.loadmore').addClass('visible');
					}

					//显示没有更多数据
					if (finish && result.length == 0) {
						me.$('.message, .message .empty').addClass('visible');
					};

					if (result && result.length > 0) {
						//append items
						result.forEach(function(data) {
							var item = new me.itemClass({
								data: data
							});
							item.setEditing(me.editing);
							me.addItem(item);
						});
					} else {
						//show no data

					}
					me.refresh();
					setTimeout(function() {
						me.trigger('load', me);
						me.setScrollerMinHeight();
					}, 0)

				}, function(error) {
					//stop loading animate
					// loadmoreButton.classList.remove('loading');
					me.$pullUp.removeClass('flip').removeClass('loading');
					me.refresh();
					me.trigger('error', me);
					// alert('数据加载失败');
				});

			},

			onLoadMore: function(event) {
				var me = this;
				var loadmoreButton = event.currentTarget;
				//show loading animate
				loadmoreButton.classList.add('loading');

				this.dataSource.loadData(this.page + 1, this.pageSize, function(result, finish) {

					//increase current page number when success
					me.page++;

					//stop loading animate
					loadmoreButton.classList.remove('loading');

					//loadmore
					if (finish) {
						me.$('.loadmore').removeClass('visible');
					} else {
						me.$('.loadmore').addClass('visible');
					}

					//显示没有更多数据
					if (finish && result.length == 0) {
						me.$('.message, .message .empty').addClass('visible');
					};

					if (result && result.length > 0) {
						//append items
						result.forEach(function(data) {
							var item = new me.itemClass({
								data: data
							});
							item.setEditing(me.editing);
							me.addItem(item);
						});
					} else {
						//show no data

					}
					me.refresh();
					setTimeout(function() {
						me.trigger('load', me);
						me.setScrollerMinHeight();
					}, 0)

				}, function(error) {
					//stop loading animate
					loadmoreButton.classList.remove('loading');
					me.refresh();
					me.trigger('error', me);
					// alert('数据加载失败');
				});

			}

		}, {
			//clear listview state by id, this API may be changed later
			clear: function(id) {
				delete window.sessionStorage['ListView:' + id];
			}
		});

		/**
		 * Cache
		 */
		_.extend(listview.prototype, {

			saveState: function() {
				var state = {
					y: this.IScroll.y,
					page: this.page,
					finish: this.dataSource.finish,
					items: this.subviews.length
				}
				window.sessionStorage['ListView:' + this.id] = JSON.stringify(state);
			},

			loadState: function() {
				var state = window.sessionStorage['ListView:' + this.id];
				return state ? JSON.parse(state) : state;
			},

			//从缓存中恢复数据
			restoreData: function(state) {
				console.log('ListView.restoreData');
				var me = this;
				this.page = state.page;
				this.finish = state.finish;

				var cache = this.dataSource.loadDataFromCache(0, state.items);
				if (cache && cache.length > 0) {

					if (cache.length < this[this.dataSource.options.pageSizeParam]) { //缓存数据小于20条的时候
						this.finish = true;
					}

					//loadmore
					// if (this.finish) {
					// 	me.$('.loadmore').removeClass('visible');
					// } else {
					// 	me.$('.loadmore').addClass('visible');
					// }

					//pullup
					if (finish) {
						isFinish = true;
						me.$pullUp.addClass('hidden')
							// me.$('.loadmore').removeClass('visible');
					} else {
						isFinish = false;
						me.$pullUp.removeClass('hidden').find('.label').html('上拉加载更多...');
						// me.$('.loadmore').addClass('visible');
					}

					//显示没有更多数据
					if (this.finish && cache.length == 0) {
						me.$('.message, .message .empty').addClass('visible');
					} else {
						me.$('.message, .message .empty').removeClass('visible');
					};

					//remove all
					me.deleteAllItems();
					//append items
					cache.forEach(function(data) {
						var item = new me.itemClass({
							data: data
						});
						item.setEditing(me.editing);
						me.addItem(item);
					});
					me.refreshByState(state);
					setTimeout(function() {
						me.trigger('load', me);
						me.setScrollerMinHeight();
					}, 0)

				} else {
					this.reloadData();
				}
			}
		});

		/**
		 * Data Mantance
		 */
		_.extend(listview.prototype, {

			setEditing: function(editing) {

				this.subviews.forEach(function(subview) {
					subview.setEditing(editing);
				});

				this.editing = editing;
			},

			reset: function() {

				//删除所有cell
				// this.deleteAllItems();

				//重置页码
				this.page = 0;

				//重置下拉刷新
				// this.el.classList.remove('pulleddown');
				// this.$pullDown.removeClass('flip loading').find('.label').html('下拉刷新...');

				//reset loadmore button
				// this.$('.loadmore').removeClass('visible');
				this.$pullUp.addClass('hidden')

				//reset message area
				this.$('.message, .message > div').removeClass('visible');

				// this.refresh();
			},

			reloadData: function() {
				console.log('ListView.reloadData');
				var me = this;
				this.reset();
				this.dataSource.clear();

				//启动下拉刷新加载中动画
				// this.el.classList.add('pulleddown');
				this.IScroll.minScrollY = 0;
				this.IScroll.isLoading = true;
				this.IScroll.scrollTo(0, 0, 600, "");
				this.$pullDown.removeClass('flip').addClass('loading').find('.label').html('加载中...'); //第一次加载也需要菊花图
				setTimeout(function() {
					me.dataSource.loadData(me.page, me.pageSize, function(result, finish) {
						if (result == null || result == "") result = [];
						//success callback
						me.IScroll.isLoading = false;
						me.isLoadSuccess = true;
						// me.el.classList.remove('pulleddown');
						me.$pullDown.removeClass('flip loading').find('.label').html('下拉刷新...');

						//loadmore
						// if (finish) {
						// 	me.$('.loadmore').removeClass('visible');
						// } else {
						// 	me.$('.loadmore').addClass('visible');
						// }
						//pullup
						if (finish) {
							isFinish = true;
							me.$pullUp.addClass('hidden')
								// me.$('.loadmore').removeClass('visible');
						} else {
							isFinish = false;
							me.$pullUp.removeClass('hidden').find('.label').html('上拉加载更多...');
							// me.$('.loadmore').addClass('visible');
						}
						//显示没有更多数据
						if (finish && result.length == 0) {
							me.$('.message, .message .empty').addClass('visible');
						};

						//remove all
						me.deleteAllItems();
						//append items
						result.forEach(function(data) {
							var item = new me.itemClass({
								data: data
							});
							item.setEditing(me.editing);
							me.addItem(item);
						});
						me.refresh();

						//若数据加载非异步，则load事件会先于用户的listenTo方法执行，使用setTimeout延迟load事件触发时机
						setTimeout(function() {
							me.trigger('load', me);
							me.setScrollerMinHeight();
						}, 0);

					}, function(error, status, isabort) {
						// me.reset();
						me.IScroll.isLoading = false;
						if (isabort != true) { //手动中断请求不提示加载数据失败
							me.$pullDown.removeClass('flip loading').find('.label').html('下拉刷新...');
							if (!me.isLoadSuccess) {
								me.$('.message, .message .error').addClass('visible');
							} else {
								Notification.show({
									type: "error",
									message: "加载数据失败"
								});
							}
						}
						me.refresh();
						setTimeout(function() {
							me.trigger('error', me);
							me.setScrollerMinHeight();
						}, 0);
					});
				}, this.isPullToRefresh ? 400 : 0);
			},

			addItem: function(item) {
				this.subviews.push(item);
				this.el.querySelector("ul").appendChild(item.el);
			},

			//删除一个或多个item
			deleteItems: function(array, refresh) {
				//invoke remove
				this.subviews = _.filter(this.subviews, function(each, index) {
					if (array.indexOf(index) >= 0) each.remove();
					return array.indexOf(index) < 0;
				});
				if (refresh) this.refresh();
			},
			//删除所有item
			deleteAllItems: function(refresh) {
				_.each(this.subviews, function(subview) {
					subview.remove();
				});
				this.subviews = [];

				if (refresh) this.refresh();
			},

			selectedItems: function() {
				var me = this;
				return _.filter(this.subviews, function(item) {
					return item.selected;
				});
			},

			selectedIndexes: function() {
				var items = this.subviews;
				return _.chain(items)
					.filter(function(item) {
						return item.selected;
					})
					.map(function(item) {
						return items.indexOf(item);
					})
					.value();
			},
			setScrollerMinHeight: function() {
				var me = this;
				var wrapperHeight = this.IScroll.wrapperHeight;
				var withpulldownHeight = $(this.IScroll.scroller).find(".pulldown").height();
				var minScrollerHeight = wrapperHeight + withpulldownHeight + 1;
				this.$el.find(".scroller").css("min-height", minScrollerHeight);
				setTimeout(function() { //延迟刷新iscroll
					me.IScroll.refresh();
				}, 400);

			}

		});

		return listview;
	});