// 听云源码（已把写死的 key 改成变量 global.tingyunKey）
window._ty_rum || function(t) {
    function e(t) {
        switch (typeof t) {
            case "object":
                if (!t) return "null";
                if (t instanceof Array) {
                    for (var r = "[", n = 0; n < t.length; n++) r += (n > 0 ? "," : "") + e(t[n]);
                    return r + "]"
                }
                var r = "{",
                    n = 0;
                for (var a in t)
                    if ("function" != typeof t[a]) {
                        var o = e(t[a]);
                        r += (n > 0 ? "," : "") + e(a) + ":" + o, n++
                    }
                return r + "}";
            case "string":
                return '"' + t.replace(/([\"\\])/g, "\\$1") + '"';
            case "number":
                return t.toString();
            case "boolean":
                return t ? "true" : "false";
            case "function":
                return "[function]";
            case "undefined":
            default:
                return "undefined"
        }
    }

    function r(e) {
        return t.encodeURIComponent ? encodeURIComponent(e) : e
    }

    function n() {
        return Date.now ? Date.now() : (new Date).valueOf()
    }

    function a(t) {
        return function(t, e) {}
    }

    function o() {
        w.initend()
    }

    function i() {
        "complete" === y.readyState && w.initend()
    }

    function s(t) {
        function e() {
            w.send()
        }
        return v.load_time ? !0 : (w.initend(), v.load_time = n(), void(9 === t ? e() : setTimeout(e, 0)))
    }

    function u() {
        b || s(9), b = 1
    }

    function c() {
        w.touch || (w.touch = n())
    }

    function f(t) {
        var e = arguments,
            r = "unknown",
            a = [n()];
        if (0 != e.length) {
            if ("string" == typeof t) {
                var o = e.length < 4 ? e.length : 4;
                a[1] = e[0], o > 2 && (a[2] = e[2], a[3] = 0, a[4] = e[1]), o > 3 && e[3] && (a[3] = e[3])
            } else if (t instanceof Event && (a[1] = t.message || (t.error && t.error.constructor.name) + (t.error && t.error.message) || "", a[2] = t.lineno ? t.lineno : 0, a[3] = t.colno ? t.colno : 0, a[4] = t.filename || t.error && t.error.fileName || t.target && t.target.baseURI || "", a[4] == y.URL && (a[4] = "#"), a[1] === r && a[4] === r)) return;
            w.errors.push(a)
        }
    }

    function d(t, e, r) {
        for (var n = "o." + e + "(", a = 0; a < r.length; a++) n += (a > 0 ? "," : "") + "a[" + a + "]";
        return n += ");", new Function(n)()
    }

    function l(t) {
        return function() {
            var e = arguments;
            if (!this._ty_wrap) {
                var r = S.args.apply(this, e);
                this._ty_rum = {
                    method: r[0],
                    url: r[1],
                    start: n()
                }
            }
            try {
                return t.apply(this, e)
            } catch (a) {
                return this.open = t, d(this, "open", e)
            }
        }
    }

    function h(e) {
        return "string" == typeof e ? e.length : t.ArrayBuffer && e instanceof ArrayBuffer ? e.byteLength : t.Blob && e instanceof Blob ? e.size : e && e.length ? e.length : 0
    }

    function p(e) {
        return function() {
            function r(t) {
                var e, r, a = c._ty_rum;
                if (a) {
                    if (4 !== a.readyState && (a.end = n()), a.s = c.status, "" == c.responseType || "text" == c.responseType) a.res = h(c.responseText);
                    else if (c.response) a.res = h(c.response);
                    else try {
                        a.res = h(c.responseText)
                    } catch (i) {
                        a.res = 0
                    }
                    if (a.readyState = c.readyState, a.cb_time = f, e = [a.method + " " + a.url, a.s > 0 ? a.end - a.start : 0, f, a.s, a.s > 0 ? 0 : t, a.res, a.req], a.r && (r = o(c), r && (r = r.xData) && (e.push(r.id), e.push(r.action), e.push(r.time && r.time.duration), e.push(r.time && r.time.qu))), v.aa.push(e), v.server.custom_urls && v.server.custom_urls.length && !w.ct) {
                        if (!v.pattern) {
                            v.pattern = [];
                            for (var s = 0; s < v.server.custom_urls.length; s++) v.pattern.push(new RegExp(v.server.custom_urls[s]))
                        }
                        for (var s = 0; s < v.pattern.length; s++)
                            if (a.url.match(v.pattern[s])) {
                                w.ct = a.end + f;
                                break
                            }
                    }
                    w.sa(), c._ty_rum = null
                }
            }

            function a() {
                4 == c.readyState && r(0)
            }

            function o(e) {
                var r;
                if (e.getResponseHeader) {
                    var n = S.parseJSON(e.getResponseHeader("X-Tingyun-Tx-Data"));
                    n && n.r && e._ty_rum && n.r + "" == e._ty_rum.r + "" && (r = {
                        name: e._ty_rum.url,
                        xData: n
                    }, T && t._ty_rum.c_ra.push(r))
                }
                return r
            }

            function i(t) {
                return function() {
                    var e;
                    4 == c.readyState && c._ty_rum && (c._ty_rum.end = e = n(), c._ty_rum.readyState = 4);
                    var r = t.apply(this, arguments);
                    return 4 == c.readyState && (f = n() - e), a(), r
                }
            }

            function s(t) {
                return function() {
                    var e = c._ty_rum;
                    return e ? "progress" == t ? !0 : ("abort" == t ? r(905) : "loadstart" == t ? e.start = n() : "error" == t ? r(990) : "timeout" == t && r(903), !0) : !0
                }
            }

            function u(t, e) {
                e instanceof Array || (e = [e]);
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    S.sh(t, n, s(n), !1)
                }
            }
            if (!this._ty_wrap) {
                this._ty_rum.start = n(), this._ty_rum.req = arguments[0] ? h(arguments[0]) : 0;
                var c = this,
                    f = 0,
                    l = S.wrap(!1, this, "onreadystatechange", i);
                l || S.sh(this, "readystatechange", a, !1), u(this, ["error", "progress", "abort", "load", "loadstart", "loadend", "timeout"]), l || setTimeout(function() {
                    S.wrap(!1, c, "onreadystatechange", i)
                }, 0)
            }
            var p = function() {
                    function t(t) {
                        var e = {},
                            r = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?/.exec(t);
                        return r && (e.protocol = r[1] ? r[1] + ":" : "http:", e.hostname = r[3], e.port = r[4] || ""), e
                    }
                    return function(e) {
                        var r = location;
                        if (e = S.trim(e)) {
                            if (e = e.toLowerCase(), e.startsWith("//") && (e = r.protocol + e), !e.startsWith("http")) return !0;
                            var n = t(e),
                                a = n.protocol === r.protocol && n.hostname === r.hostname;
                            return a && (a = n.port === r.port ? !0 : !r.port && ("http:" === r.protocol && "80" === n.port || "https:" === r.protocol && "443" === n.port)), a
                        }
                        return !1
                    }
                }(),
                m = arguments;
            try {
                try {
                    var y = v.server;
                    y && y.id && this._ty_rum && p(this._ty_rum.url) && (this._ty_rum.r = (new Date).getTime() % 1e8, this.setRequestHeader && this.setRequestHeader("X-Tingyun-Id", y.id + ";r=" + this._ty_rum.r))
                } catch (g) {}
                return e.apply(this, m)
            } catch (g) {
                return this.send = e, d(this, "send", m)
            }
        }
    }
    var m = t.XMLHttpRequest,
        y = document,
        v = t._ty_rum = {
            st: n(),
            ra: [],
            c_ra: [],
            aa: [],
            snd_du: function() {
                return this.server.adu ? 1e3 * this.server.adu : 1e4
            },
            cc: function() {
                return this.server.ac ? this.server.ac : 10
            }
        };
    var ty_rum = v;
    ty_rum.server = {
        id: 'LW_1cdijdFI',
        beacon: 'beacon.tingyun.com',
        beacon_err: 'beacon-err.tingyun.com',
        key: global.tingyunKey, // 根据当前环境赋值
        trace_threshold: 40000,
        custom_urls: [],
        sr: 1.0
    };
    if (v.server && !(v.server.sr && Math.random() >= v.server.sr)) {
        var g = String.prototype.trim;
        String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
            return e = e || 0, this.indexOf(t, e) === e
        });
        var _ = /^http/i,
            S = {
                wrap: function(t, e, r, n, a) {
                    try {
                        var o = e[r]
                    } catch (i) {
                        if (!t) return !1
                    }
                    if (!o && !t) return !1;
                    if (o && o._ty_wrap) return !1;
                    try {
                        e[r] = n(o, a)
                    } catch (i) {
                        return !1
                    }
                    return e[r]._ty_wrap = [o], !0
                },
                mkurl: function(t, e) {
                    var a = arguments,
                        o = /^https/i.test(y.URL) ? "https" : "http";
                    if (o = o + "://" + t + "/" + e + "?av=1.0.0&v=1.3.0&key=" + r(v.server.key) + "&ref=" + r(y.URL) + "&rand=" + n(), a.length > 2) {
                        var i = a[2];
                        for (var s in i) o += "&" + s + "=" + i[s]
                    }
                    return o
                },
                GET: function(t, e) {
                    function r() {
                        e && e.apply(this, arguments), n.parentNode && n.parentNode.removeChild(n)
                    }
                    if (navigator && navigator.sendBeacon && _.test(t)) return navigator.sendBeacon(t, null);
                    var n = y.createElement("img");
                    return n.setAttribute("src", t), n.setAttribute("style", "display:none"), this.sh(n, "readystatechange", function() {
                        ("loaded" == n.readyState || 4 == n.readyState) && r("loaded")
                    }, !1), this.sh(n, "load", function() {
                        return r("load"), !0
                    }, !1), this.sh(n, "error", function() {
                        return r("error"), !0
                    }, !1), y.body.appendChild(n)
                },
                fpt: function(t, e, r) {
                    function n(t, e, r) {
                        var n = y.createElement(t);
                        try {
                            for (var a in e) n[a] = e[a]
                        } catch (o) {
                            var i = "<" + t;
                            for (var a in e) i += " " + a + '="' + e[a] + '"';
                            i += ">", r || (i += "</" + t + ">"), n = y.createElement(i)
                        }
                        return n
                    }
                    var a = n("div", {
                            style: "display:none"
                        }, !1),
                        o = n("iframe", {
                            name: "_ty_rum_frm",
                            width: 0,
                            height: 0,
                            style: "display:none"
                        }, !1),
                        i = n("form", {
                            style: "display:none",
                            action: t,
                            enctype: "application/x-www-form-urlencoded",
                            method: "post",
                            target: "_ty_rum_frm"
                        }, !1),
                        s = n("input", {
                            name: "data",
                            type: "hidden"
                        }, !0);
                    return s.value = e, i.appendChild(s), a.appendChild(o), a.appendChild(i), y.body.appendChild(a), i.submit(), o.onreadystatechange = function() {
                        ("complete" === o.readyState || 4 === o.readyState) && (r(null, o.innerHTML), y.body.removeChild(a))
                    }, !0
                },
                POST: function(e, r, n, a) {
                    if (this.ie) return this.fpt(e, r, a);
                    if (navigator && navigator.sendBeacon && _.test(e)) return navigator.sendBeacon(e, r);
                    var o;
                    if (t.XDomainRequest) return o = new XDomainRequest, o.open("POST", e), o.onload = function() {
                        a(null, o.responseText)
                    }, this.sh(o, "load", function() {
                        a(null, o.responseText)
                    }, !1), this.sh(o, "error", function() {
                        a("POST(" + e + ")error")
                    }, !1), this.wrap(!0, o, "onerror", function(t) {
                        return function() {
                            return a && a("post error", o.responseText), !0
                        }
                    }), o.send(r), !0;
                    if (!m) return !1;
                    o = new m, o.overrideMimeType && o.overrideMimeType("text/html");
                    try {
                        o._ty_wrap = 1
                    } catch (i) {}
                    var s = 0;
                    o.onreadystatechange = function() {
                        4 == o.readyState && 200 == o.status && (0 == s && a(null, o.responseText), s++)
                    }, o.onerror && this.wrap(!0, o, "onerror", function(t) {
                        return function() {
                            return a("post error", o.responseText), "function" == typeof t ? t.apply(this, arguments) : !0
                        }
                    });
                    try {
                        o.open("POST", e, !0)
                    } catch (i) {
                        return this.fpt(e, r, a)
                    }
                    for (var u in n) o.setRequestHeader(u, n[u]);
                    return o.send(r), !0
                },
                sh: function(t, e, r, n) {
                    return t.addEventListener ? t.addEventListener(e, r, n) : t.attachEvent ? t.attachEvent("on" + e, r) : !1
                },
                args: function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t.push(arguments[e]);
                    return t
                },
                stringify: e,
                parseJSON: function(e) {
                    if (e && "string" == typeof e) {
                        var r = t.JSON ? t.JSON.parse : function(t) {
                            return new Function("return " + t)()
                        };
                        return r(e)
                    }
                    return null
                },
                trim: g ? function(t) {
                    return null == t ? "" : g.call(t)
                } : function(t) {
                    return null == t ? "" : t.toString().replace(/^\s+/, "").replace(/\s+$/, "")
                }
            },
            T = t.performance ? t.performance : t.Performance;
        T && (S.sh(T, "resourcetimingbufferfull", function() {
            var t = T.getEntriesByType("resource");
            t && (v.ra = v.ra.concat(t), T.clearResourceTimings())
        }, !1), S.sh(T, "webkitresourcetimingbufferfull", function() {
            var t = T.getEntriesByType("resource");
            t && (v.ra = v.ra.concat(t), T.webkitClearResourceTimings())
        }, !1));
        for (var w = v.metric = {
                ready: function() {
                    return v.load_time
                },
                initend: function() {
                    function t() {
                        w.sa()
                    }
                    v.end_time || (v.end_time = n(), this._h = setInterval(t, 2e3))
                },
                send: function() {
                    function n() {
                        function e(t) {
                            return a[t] > 0 ? a[t] - s : 0
                        }
                        var n = {};
                        if (T && T.timing) {
                            var a = T.timing;
                            s = a.navigationStart;
                            var o = e("domainLookupStart"),
                                i = e("domainLookupEnd"),
                                u = e("redirectStart"),
                                c = e("redirectEnd"),
                                f = e("connectStart"),
                                d = e("connectEnd");
                            n = {
                                f: e("fetchStart"),
                                qs: e("requestStart"),
                                rs: e("responseStart"),
                                re: e("responseEnd"),
                                os: e("domContentLoadedEventStart"),
                                oe: e("domContentLoadedEventEnd"),
                                oi: e("domInteractive"),
                                oc: e("domComplete"),
                                ls: e("loadEventStart"),
                                le: e("loadEventEnd")
                            }, d - f > 0 && (n.cs = f, n.ce = d), i - o > 0 && (n.ds = o, n.de = i), (c - u > 0 || c > 0) && (n.es = u, n.ee = c), 0 == n.le && (n.ue = v.load_time - s);
                            var l;
                            if (a.msFirstPaint) l = a.msFirstPaint;
                            else if (t.chrome && chrome.loadTimes) {
                                var h = chrome.loadTimes();
                                h && h.firstPaintTime && (l = 1e3 * h.firstPaintTime)
                            } else v.firstPaint && (l = v.firstPaint);
                            l && (n.fp = Math.round(l - s)), a.secureConnectionStart && (n.sl = e("secureConnectionStart"))
                        } else n = {
                            t: s,
                            os: v.end_time - s,
                            ls: v.load_time - s
                        };
                        n.je = w.errors.length, w.ct && (n.ct = w.ct - s), w.touch && (n.fi = w.touch - s);
                        var p = v.agent;
                        return p && (n.id = r(p.id), n.a = p.a, n.q = p.q, n.tid = r(p.tid), n.n = r(p.n)), n
                    }

                    function o(e) {
                        var r = t._ty_rum.c_ra;
                        if (e)
                            for (var n = r.length - 1; n >= 0; n--)
                                if (e.indexOf(r[n].name) > -1) return r[n].xData;
                        return null
                    }

                    function i(t) {
                        function e(t) {
                            return f[t] > 0 ? f[t] : 0
                        }
                        if (t < v.server.trace_threshold) return null;
                        var n = T;
                        if (n && n.getEntriesByType) {
                            var a = {
                                    tr: !0,
                                    tt: r(y.title),
                                    charset: y.characterSet
                                },
                                i = v.ra,
                                u = n.getEntriesByType("resource");
                            u && (i = i.concat(u), n.webkitClearResourceTimings && n.webkitClearResourceTimings(), n.clearResourceTimings && n.clearResourceTimings()), a.res = [];
                            for (var c = 0; c < i.length; c++) {
                                var f = i[c],
                                    d = {
                                        o: e("startTime"),
                                        rt: f.initiatorType,
                                        n: f.name,
                                        f: e("fetchStart"),
                                        ds: e("domainLookupStart"),
                                        de: e("domainLookupEnd"),
                                        cs: e("connectStart"),
                                        ce: e("connectEnd"),
                                        sl: e("secureConnectionStart"),
                                        qs: e("requestStart"),
                                        rs: e("responseStart"),
                                        re: e("responseEnd")
                                    },
                                    l = o(f.name);
                                l && (d.aid = l.id, d.atd = l.trId, d.an = l.action, d.aq = l.time && l.time.qu, d.as = l.time && l.time.duration), a.res.push(d)
                            }
                            if (w.errors.length) {
                                a.err = [];
                                for (var c = 0, h = w.errors; c < h.length; c++) a.err.push({
                                    o: Math.round(h[c][0] - s),
                                    e: h[c][1],
                                    l: h[c][2],
                                    c: h[c][3],
                                    r: h[c][4]
                                })
                            }
                            return a
                        }
                        return null
                    }
                    if (this.sended) return !1;
                    if (!this.ready()) return !1;
                    var s = v.st,
                        u = {};
                    try {
                        pf = n(), u = i(pf.ls > 0 ? pf.ls : v.load_time - s)
                    } catch (c) {}
                    u = u ? S.stringify(u) : "";
                    var f = S.mkurl(v.server.beacon, "pf", pf);
                    if (0 != u.length && S.POST(f, u, {}, a("POST")) || S.GET(f), this.errors.length > 0) {
                        var c = w.errors[0];
                        S.GET(S.mkurl(v.server.beacon_err, "err", {
                            data: r(e([c[1], c[2], c[3], "#" == c[4] ? y.URL : c[4], w.errors.length]))
                        }), a("GET err"))
                    }
                    return this.sended = !0, this.sa(1), !0
                },
                sa: function(t) {
                    (this.ready() || t) && (t || (t = !this._last_send || n() - this._last_send > v.snd_du() || v.aa.length >= v.cc()), v.aa.length > 0 && t && (this._last_send = n(), S.POST(S.mkurl(v.server.beacon, "xhr"), S.stringify({
                        xhr: v.aa
                    }), {}, a("POST")), v.aa = []))
                },
                errors: []
            }, b = null, E = [
                ["load", s],
                ["beforeunload", u],
                ["pagehide", u],
                ["unload", u],
                ["error", f]
            ], R = 0; R < E.length; R++) S.sh(t, E[R][0], E[R][1], !1);
        for (var x = [
                ["scroll", c],
                ["keypress", c],
                ["click", c],
                ["DOMContentLoaded", o],
                ["readystatechange", i]
            ], R = 0; R < x.length; R++) S.sh(y, x[R][0], x[R][1], !1);
        if (S.wrap(!1, t, "requestAnimationFrame", function(e) {
                return function() {
                    return v.firstPaint = n(), t.requestAnimationFrame = e, e.apply(this, arguments)
                }
            }), m)
            if (m.prototype) S.wrap(!1, m.prototype, "open", l), S.wrap(!1, m.prototype, "send", p);
            else {
                S.ie = 7;
                var q = m;
                t.XMLHttpRequest = function() {
                    var t = new q;
                    return S.wrap(!1, t, "open", l), S.wrap(!1, t, "send", p), t
                }
            } else t.ActiveXObject && (S.ie = 6);
    }
}(window);
