/* global define,console,require,$ */

define(['backbone', 'spin', 'underscore',
    'com.infinitus.butterfly/components/list',
    'com.infinitus.butterfly/components/segment',
    'com.infinitus.butterfly/components/extendable-list',
    'com.infinitus.butterfly/components/session',
    'com.infinitus.butterfly/components/base64Img',
    'com.infinitus.butterfly/components/datepicker'],
    function(Backbone, Spinner, _, List, Segment, ExtendableList, Session, Base64Img, Datepicker) {

        // Butterfly View
        // ==============
        var delegateEventSplitter = /^(\S+)\s*(.*)$/;
        var View = Backbone.View.extend({

            components: {},
            compile: function() {
                var me = this;
                var datepicker = Datepicker.compile(this.el);
                var lists = List.compile(this.el);
                var segments = Segment.compile(this.el);
                var extendableLists = ExtendableList.compile(this.el);
                var base64img = Base64Img.compile(this.el);
                var result = _.union(lists, segments, extendableLists);
                _.each(result, function(component) {
                    var id = component.id || component.el.getAttribute('id');
                    me.components[id] = component;
                });
            },
            //binding events for cube components
            bindEvents: function() {
                if (!this.bindings) return;

                for (var key in this.bindings) {
                    var method = this.bindings[key];
                    if (!_.isFunction(method)) method = this[method];
                    if (!method) throw new Error('Method "' + this.bindings[key] + '" does not exist');
                    var match = key.match(delegateEventSplitter);
                    var eventName = match[1],
                        componentId = match[2];
                    method = _.bind(method, this);
                    var comp = this.component(componentId);
                    if (comp) comp.on(eventName, method, this);
                }
            },
            unbindEvents: function() {
                for (var key in this.bindings) {
                    var match = key.match(delegateEventSplitter);
                    var eventName = match[1],
                        componentId = match[2];
                    var comp = this.component(componentId);
                    if (comp) comp.off(eventName);
                }
            },

            //get component instance
            component: function(id) {
                return this.components[id];
            },
            initialize: function() {
                Backbone.View.prototype.initialize.call(this);
            },

            //add superview & subviews property
            constructor: function(options) {
                if (options) this.superview = options.superview;
                this.subviews = [];

                Backbone.View.apply(this, arguments);
            },

            //remove superview & subviews reference
            remove: function() {
                Backbone.View.prototype.remove.call(this);

                this.superview = null;
                _.each(this.subviews, function(subview) {
                    subview.remove();
                });
            },

            //find a subview
            //Breadth First Search
            find: function(id) {
                var result = _.find(this.subviews, function(subview) {
                    return String(subview.el.id) === String(id);
                });

                if (!result) {
                    var container = _.find(this.subviews, function(subview) {
                        return subview.find(id);
                    });
                    result = container.find(id);
                }

                return result;
            },

            addSubview: function(view) {
                this.subviews.push(view);
            },

            render: function() {
                Backbone.View.prototype.render.apply(this, arguments);
                return this;
            },

            /* show this view */
            show: function(options) {
                this.onShow(options);
            },
            /* hide this view */
            hide: function() {
                this.onHide();
            },

            //events
            onShow: function() {
                $(window).on('orientationchange', this.onOrientationchange);
                $(window).on('resize', this.onWindowResize);
                $(window).on('scroll', this.onWindowScroll);
            },
            onHide: function() {
                $(window).off('orientationchange', this.onOrientationchange);
                $(window).off('resize', this.onWindowResize);
                $(window).off('scroll', this.onWindowScroll);
            },

            onOrientationchange: function() {
                this.$('input').blur();
            },

            onWindowScroll: function() {},

            onWindowResize: function() {},

            route: function() {}
        });


        // View Animation Extentions
        // =========================

        var animations = ['slideInLeft', 'slideInRight', 'slideOutLeft', 'slideOutRight', 'slideInUp', 'slideInDown', 'slideOutUp', 'slideOutDown'];

        //animate
        var animationExtentions = {
            animate: function(name, onFinish) {
                var me = this;

                this.$el.addClass('animated ' + name);
                this.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    me.$el.removeClass('animated ' + name);
                    if (onFinish) onFinish();
                });
            }
        };

        //transform animation name array to <name: fn> mapping json object
        animationExtentions = _.foldl(animations, function(memo, animation) {
            memo['animate' + animation[0].charAt(0).toUpperCase() + animation.substring(1)] = function(onFinish) {
                this.animate(animation, onFinish);
            };
            return memo;
        }, animationExtentions);

        //add to View prototype
        _.extend(View.prototype, animationExtentions);


        // View Modal Support
        // ==================
        _.extend(View.prototype, {

            $loadingMask: $('#loadingMask'),
            $Modal: $('#Modal'),

            spinner: new Spinner({
                lines: 8
            }),

            doModal: function() {
                this.$el.addClass('butterfly-modal');
                this.$el.appendTo(document.body);
                this.animateSlideInUp();
            },

            dismiss: function() {
                var me = this;
                this.animateSlideOutDown(function() {
                    me.$el.removeClass('butterfly-modal');
                    me.remove();
                });
            },

            showModal: function() {
                this.$Modal.show();
                return this.$Modal;
            },

            hideModal: function() {
                this.$Modal.hide();
            },

            showLoading: function() {
                this.$loadingMask.show();
                this.spinner.spin(this.$loadingMask[0]);
            },

            hideLoading: function() {
                this.spinner.stop();
                this.$loadingMask.hide();
            },

            showDialog: function(options) {
                var defaultOptions = {
                    text: 'Hello',
                    type: 'alert', //只有 alert 和 confirm
                    success: function() {
                        console.log('callback nofound');
                    }
                };
                var $Modal = this.showModal();
                var opts = _.extend(defaultOptions, options);
                require(['text!emcsButterfly/components/dialog.html'], function(ViewClass) {
                    var dialogContainer = document.createElement('div');
                    dialogContainer.innerHTML = ViewClass;
                    var dialogTmpl = $(dialogContainer).children()[0].innerHTML;
                    var dialogTemplate = _.template(dialogTmpl);
                    $Modal.html(dialogTemplate({
                        options: opts
                    }));
                    $('#confirm').on('click', function() {
                        opts.success();
                        this.hideDialog($Modal);
                    }.bind(this));
                    if (opts.type === 'confirm') {
                        $('#cancel').on('click', function() {
                            this.hideDialog($Modal);
                        }.bind(this));
                    }
                }.bind(this), function() {});
            },

            hideDialog: function($Modal) {
                $Modal.html('').hide();
            }
        });

        return View;
    });
