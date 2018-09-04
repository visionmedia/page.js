
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }

  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('index.js', [3,9,10,17,18,19,20,21,22,28,29,30,31,36,43,49,56,62,68,74,80,87,92,137,138,144,155,164,176,194,233,254,273,299,329,347,405,469,477,491,527,538,556,580,744,115,120,122,126,129,166,178,195,197,198,205,211,224,203,207,213,216,218,220,235,236,237,238,239,240,255,257,258,261,277,278,280,281,284,285,302,303,304,311,312,330,332,333,334,335,337,348,352,354,358,365,361,362,369,371,385,394,395,396,388,390,410,407,412,425,424,439,441,443,444,447,448,449,450,451,452,455,458,459,460,461,478,480,493,514,515,516,517,518,539,540,542,557,572,565,566,568,581,594,583,586,588,589,590,597,598,600,602,603,620,621,640,648,666,668,676,677,687,688,629,630,672,680,696,697,705,707,708,709,719,721,722,729,730,740,741], {"36_58_12":0,"36_73_7":0,"36_19_11":0,"36_34_21":0,"43_19_9":0,"43_32_46":0,"43_35_23":0,"43_62_15":0,"114_8_26":0,"119_8_24":0,"125_15_24":0,"126_36_10":0,"126_49_6":0,"165_8_22":0,"177_8_22":0,"195_14_7":0,"195_25_2":0,"196_8_7":0,"198_17_14":0,"198_35_21":0,"198_36_9":0,"198_49_6":0,"199_8_26":0,"200_8_37":0,"201_8_39":0,"201_8_26":0,"201_38_9":0,"202_8_38":0,"202_8_23":0,"202_35_11":0,"206_7_36":0,"206_7_21":0,"206_32_11":0,"206_7_8":0,"206_19_9":0,"209_8_9":0,"212_7_10":0,"215_9_35":0,"215_9_8":0,"215_21_23":0,"217_17_8":0,"234_8_8":0,"238_4_11":0,"238_19_67":0,"239_4_9":0,"239_17_61":0,"240_4_9":0,"240_17_63":0,"259_8_18":0,"260_8_39":0,"260_8_21":0,"260_33_14":0,"274_8_12":0,"277_6_10":0,"277_20_25":0,"279_15_4":0,"301_8_50":0,"301_8_24":0,"301_36_22":0,"310_8_53":0,"310_8_24":0,"310_36_25":0,"336_8_18":0,"353_10_3":0,"360_10_25":0,"364_10_3":0,"368_8_4":0,"384_8_11":0,"387_8_8":0,"388_16_10":0,"388_30_54":0,"390_16_10":0,"390_30_57":0,"393_8_29":0,"396_4_10":0,"396_18_46":0,"406_8_26":0,"424_8_23":0,"425_33_43":0,"425_79_3":0,"440_8_47":0,"440_8_15":0,"440_27_28":0,"440_87_4":0,"440_94_2":0,"444_16_26":0,"445_8_8":0,"445_30_27":0,"447_18_11":0,"447_33_25":0,"448_17_5":0,"448_26_2":0,"450_28_47":0,"450_78_2":0,"451_54_16":0,"451_73_4":0,"456_8_9":0,"457_10_24":0,"460_18_38":0,"479_8_10":0,"481_42_16":0,"481_61_18":0,"481_10_8":0,"481_22_17":0,"492_8_54":0,"492_8_10":0,"492_22_40":0,"494_42_16":0,"494_61_18":0,"494_10_8":0,"494_22_17":0,"514_14_7":0,"514_25_2":0,"515_21_14":0,"515_39_6":0,"516_33_6":0,"516_42_4":0,"541_10_32":0,"559_28_22":0,"559_53_4":0,"562_8_2":0,"567_10_61":0,"567_10_17":0,"567_31_40":0,"582_9_11":0,"585_8_49":0,"585_8_11":0,"585_23_34":0,"595_10_7":0,"596_10_7":0,"599_17_22":0,"599_17_10":0,"599_31_8":0,"601_17_10":0,"613_8_14":0,"615_8_36":0,"615_8_22":0,"615_34_10":0,"615_8_9":0,"615_21_9":0,"616_8_18":0,"621_20_6":0,"621_30_42":0,"621_48_16":0,"621_67_4":0,"623_7_9":0,"625_12_22":0,"626_12_43":0,"627_12_18":0,"635_11_2":0,"635_17_33":0,"636_8_40":0,"636_8_3":0,"636_15_33":0,"640_14_29":0,"640_47_48":0,"645_8_68":0,"645_8_27":0,"645_39_37":0,"649_7_54":0,"649_7_25":0,"649_36_25":0,"649_7_9":0,"649_20_12":0,"649_37_7":0,"649_48_12":0,"652_8_36":0,"652_8_4":0,"652_16_28":0,"656_8_35":0,"656_14_17":0,"656_34_9":0,"661_8_28":0,"661_8_4":0,"661_16_20":0,"666_21_15":0,"666_39_43":0,"666_67_7":0,"668_29_10":0,"668_42_4":0,"671_8_42":0,"671_8_10":0,"671_22_28":0,"679_8_28":0,"683_8_8":0,"685_8_25":0,"685_8_8":0,"685_20_13":0,"696_8_1":0,"696_13_27":0,"696_14_9":0,"696_27_12":0,"697_29_8":0,"697_40_7":0,"704_7_39":0,"704_7_25":0,"704_36_10":0,"706_15_11":0,"718_7_20":0,"718_7_5":0,"718_16_11":0,"722_11_68":0,"724_6_21":0,"722_11_29":0,"723_6_29":0,"728_7_11":0,"730_11_29":0,"731_6_25":0,"739_7_6":0,"740_14_23":0,"740_41_19":0,"740_14_9":0,"740_27_10":0,"741_72_12":0,"741_87_4":0,"741_12_28":0,"741_44_24":0,"741_12_21":0,"741_37_3":0,"741_12_9":0,"741_25_8":0}, ["  /* globals require, module */","","  'use strict';","","  /**","   * Module dependencies.","   */","","  var pathtoRegexp = require('path-to-regexp');","  var reactTransition = require('./react-transition');","","","  /**","   * Module exports.","   */","","  module.exports = page;","  page.default = page;","  page.Context = Context;","  page.Route = Route;","  page.sameOrigin = sameOrigin;","  page.reactTransition = reactTransition","","  /**","   * Short-cuts for global-object checks","   */","","  var hasDocument = ('undefined' !== typeof document);","  var hasWindow = ('undefined' !== typeof window);","  var hasHistory = ('undefined' !== typeof history);","  var hasProcess = typeof process !== 'undefined';","","  /**","   * Detect click event","   */","  var clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';","","  /**","   * To work properly with the URL","   * history.location generated polyfill in https://github.com/devote/HTML5-History-API","   */","","  var isLocation = hasWindow && !!(window.history.location || window.location);","","  /**","   * Perform initial dispatch.","   */","","  var dispatch = true;","","","  /**","   * Decode URL components (query string, pathname, hash).","   * Accommodates both regular percent encoding and x-www-form-urlencoded format.","   */","  var decodeURLComponents = true;","","  /**","   * Base path.","   */","","  var base = '';","","  /**","   * Strict path matching.","   */","","  var strict = false;","","  /**","   * Running flag.","   */","","  var running;","","  /**","   * HashBang option","   */","","  var hashbang = false;","","  /**","   * Previous context, for capturing","   * page exit events.","   */","","  var prevContext;","","  /**","   * The window for which this `page` is running","   */","  var pageWindow;","","  /**","   * Register `path` with callback `fn()`,","   * or route `path`, or redirection,","   * or `page.start()`.","   *","   *   page(fn);","   *   page('*', fn);","   *   page('/user/:id', load, user);","   *   page('/user/' + user.id, { some: 'thing' });","   *   page('/user/' + user.id);","   *   page('/from', '/to')","   *   page();","   *","   * @param {string|!Function|!Object} path","   * @param {Function=} fn","   * @api public","   */","","  function page(path, fn) {","    // <callback>","    if ('function' === typeof path) {","      return page('*', path);","    }","","    // route <path> to <callback ...>","    if ('function' === typeof fn) {","      var route = new Route(/** @type {string} */ (path));","      for (var i = 1; i < arguments.length; ++i) {","        page.callbacks.push(route.middleware(arguments[i]));","      }","      // show <path> with [state]","    } else if ('string' === typeof path) {","      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);","      // start [options]","    } else {","      page.start(path);","    }","  }","","  /**","   * Callback functions.","   */","","  page.callbacks = [];","  page.exits = [];","","  /**","   * Current path being processed","   * @type {string}","   */","  page.current = '';","","  /**","   * Number of pages navigated to.","   * @type {number}","   *","   *     page.len == 0;","   *     page('/login');","   *     page.len == 1;","   */","","  page.len = 0;","","  /**","   * Get or set basepath to `path`.","   *","   * @param {string} path","   * @api public","   */","","  page.base = function(path) {","    if (0 === arguments.length) return base;","    base = path;","  };","","  /**","   * Get or set strict path matching to `enable`","   *","   * @param {boolean} enable","   * @api public","   */","","  page.strict = function(enable) {","    if (0 === arguments.length) return strict;","    strict = enable;","  };","","  /**","   * Bind with the given `options`.","   *","   * Options:","   *","   *    - `click` bind to click events [true]","   *    - `popstate` bind to popstate [true]","   *    - `dispatch` perform initial dispatch [true]","   *","   * @param {Object} options","   * @api public","   */","","  page.start = function(options) {","    options = options || {};","    if (running) return;","    running = true;","    pageWindow = options.window || (hasWindow && window);","    if (false === options.dispatch) dispatch = false;","    if (false === options.decodeURLComponents) decodeURLComponents = false;","    if (false !== options.popstate && hasWindow) pageWindow.addEventListener('popstate', onpopstate, false);","    if (false !== options.click && hasDocument) {","      pageWindow.document.addEventListener(clickEvent, onclick, false);","    }","    hashbang = !!options.hashbang;","    if(hashbang && hasWindow && !hasHistory) {","      pageWindow.addEventListener('hashchange', onpopstate, false);","    }","    if (!dispatch) return;","","    var url;","    if(isLocation) {","      var loc = pageWindow.location;","","      if(hashbang && ~loc.hash.indexOf('#!')) {","        url = loc.hash.substr(2);","      } else if (hashbang) {","        url = loc.hash;","      } else {","        url = loc.pathname + loc.search + loc.hash;","      }","    }","","    page.replace(url, null, true, dispatch);","  };","","  /**","   * Unbind click and popstate event handlers.","   *","   * @api public","   */","","  page.stop = function() {","    if (!running) return;","    page.current = '';","    page.len = 0;","    running = false;","    hasDocument && pageWindow.document.removeEventListener(clickEvent, onclick, false);","    hasWindow && pageWindow.removeEventListener('popstate', onpopstate, false);","    hasWindow && pageWindow.removeEventListener('hashchange', onpopstate, false);","  };","","  /**","   * Show `path` with optional `state` object.","   *","   * @param {string} path","   * @param {Object=} state","   * @param {boolean=} dispatch","   * @param {boolean=} push","   * @return {!Context}","   * @api public","   */","","  page.show = function(path, state, dispatch, push) {","    var ctx = new Context(path, state),","      prev = prevContext;","    prevContext = ctx;","    page.current = ctx.path;","    if (false !== dispatch) page.dispatch(ctx, prev);","    if (false !== ctx.handled && false !== push) ctx.pushState();","    return ctx;","  };","","  /**","   * Goes back in the history","   * Back should always let the current route push state and then go back.","   *","   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base","   * @param {Object=} state","   * @api public","   */","","  page.back = function(path, state) {","    if (page.len > 0) {","      // this may need more testing to see if all browsers","      // wait for the next tick to go back in history","      hasHistory && pageWindow.history.back();","      page.len--;","    } else if (path) {","      setTimeout(function() {","        page.show(path, state);","      });","    }else{","      setTimeout(function() {","        page.show(getBase(), state);","      });","    }","  };","","","  /**","   * Register route to redirect from one path to other","   * or just redirect to another route","   *","   * @param {string} from - if param 'to' is undefined redirects to 'from'","   * @param {string=} to","   * @api public","   */","  page.redirect = function(from, to) {","    // Define route from a path to another","    if ('string' === typeof from && 'string' === typeof to) {","      page(from, function(e) {","        setTimeout(function() {","          page.replace(/** @type {!string} */ (to));","        }, 0);","      });","    }","","    // Wait for the push state and replace it with another","    if ('string' === typeof from && 'undefined' === typeof to) {","      setTimeout(function() {","        page.replace(from);","      }, 0);","    }","  };","","  /**","   * Replace `path` with optional `state` object.","   *","   * @param {string} path","   * @param {Object=} state","   * @param {boolean=} init","   * @param {boolean=} dispatch","   * @return {!Context}","   * @api public","   */","","","  page.replace = function(path, state, init, dispatch) {","    var ctx = new Context(path, state),","      prev = prevContext;","    prevContext = ctx;","    page.current = ctx.path;","    ctx.init = init;","    ctx.save(); // save before dispatching, which may redirect","    if (false !== dispatch) page.dispatch(ctx, prev);","    return ctx;","  };","","  /**","   * Dispatch the given `ctx`.","   *","   * @param {Context} ctx","   * @api private","   */","","  page.dispatch = function(ctx, prev) {","    var i = 0,","      j = 0;","","    function nextExit() {","      var fn = page.exits[j++];","      if (!fn) return nextEnter();","      fn(prev, nextExit);","    }","","    function nextEnter() {","      var fn = page.callbacks[i++];","","      if (ctx.path !== page.current) {","        ctx.handled = false;","        return;","      }","      if (!fn) return unhandled(ctx);","      fn(ctx, nextEnter);","    }","","    if (prev) {","      nextExit();","    } else {","      nextEnter();","    }","  };","","  /**","   * Unhandled `ctx`. When it's not the initial","   * popstate then redirect. If you wish to handle","   * 404s on your own use `page('*', callback)`.","   *","   * @param {Context} ctx","   * @api private","   */","  function unhandled(ctx) {","    if (ctx.handled) return;","    var current;","","    if (hashbang) {","      current = isLocation && getBase() + pageWindow.location.hash.replace('#!', '');","    } else {","      current = isLocation && pageWindow.location.pathname + pageWindow.location.search;","    }","","    if (current === ctx.canonicalPath) return;","    page.stop();","    ctx.handled = false;","    isLocation && (pageWindow.location.href = ctx.canonicalPath);","  }","","  /**","   * Register an exit route on `path` with","   * callback `fn()`, which will be called","   * on the previous context when a new","   * page is visited.","   */","  page.exit = function(path, fn) {","    if (typeof path === 'function') {","      return page.exit('*', path);","    }","","    var route = new Route(path);","    for (var i = 1; i < arguments.length; ++i) {","      page.exits.push(route.middleware(arguments[i]));","    }","  };","","  /**","   * Remove URL encoding from the given `str`.","   * Accommodates whitespace in both x-www-form-urlencoded","   * and regular percent-encoded form.","   *","   * @param {string} val - URL component to decode","   */","  function decodeURLEncodedURIComponent(val) {","    if (typeof val !== 'string') { return val; }","    return decodeURLComponents ? decodeURIComponent(val.replace(/\\+/g, ' ')) : val;","  }","","  /**","   * Initialize a new \"request\" `Context`","   * with the given `path` and optional initial `state`.","   *","   * @constructor","   * @param {string} path","   * @param {Object=} state","   * @api public","   */","","  function Context(path, state) {","    var pageBase = getBase();","    if ('/' === path[0] && 0 !== path.indexOf(pageBase)) path = pageBase + (hashbang ? '#!' : '') + path;","    var i = path.indexOf('?');","","    this.canonicalPath = path;","    this.path = path.replace(pageBase, '') || '/';","    if (hashbang) this.path = this.path.replace('#!', '') || '/';","","    this.title = (hasDocument && pageWindow.document.title);","    this.state = state || {};","    this.state.path = path;","    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';","    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);","    this.params = {};","","    // fragment","    this.hash = '';","    if (!hashbang) {","      if (!~this.path.indexOf('#')) return;","      var parts = this.path.split('#');","      this.path = this.pathname = parts[0];","      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';","      this.querystring = this.querystring.split('#')[0];","    }","  }","","  /**","   * Expose `Context`.","   */","","  page.Context = Context;","","  /**","   * Push state.","   *","   * @api private","   */","","  Context.prototype.pushState = function() {","    page.len++;","    if (hasHistory) {","        pageWindow.history.pushState(this.state, this.title,","          hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);","    }","  };","","  /**","   * Save the context state.","   *","   * @api public","   */","","  Context.prototype.save = function() {","    if (hasHistory && pageWindow.location.protocol !== 'file:') {","        pageWindow.history.replaceState(this.state, this.title,","          hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);","    }","  };","","  /**","   * Initialize `Route` with the given HTTP `path`,","   * and an array of `callbacks` and `options`.","   *","   * Options:","   *","   *   - `sensitive`    enable case-sensitive routes","   *   - `strict`       enable strict matching for trailing slashes","   *","   * @constructor","   * @param {string} path","   * @param {Object=} options","   * @api private","   */","","  function Route(path, options) {","    options = options || {};","    options.strict = options.strict || strict;","    this.path = (path === '*') ? '(.*)' : path;","    this.method = 'GET';","    this.regexp = pathtoRegexp(this.path,","      this.keys = [],","      options);","  }","","  /**","   * Expose `Route`.","   */","","  page.Route = Route;","","  /**","   * Return route middleware with","   * the given callback `fn()`.","   *","   * @param {Function} fn","   * @return {Function}","   * @api public","   */","","  Route.prototype.middleware = function(fn) {","    var self = this;","    return function(ctx, next) {","      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);","      next();","    };","  };","","  /**","   * Check if this route matches `path`, if so","   * populate `params`.","   *","   * @param {string} path","   * @param {Object} params","   * @return {boolean}","   * @api private","   */","","  Route.prototype.match = function(path, params) {","    var keys = this.keys,","      qsIndex = path.indexOf('?'),","      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,","      m = this.regexp.exec(decodeURIComponent(pathname));","","    if (!m) return false;","","    for (var i = 1, len = m.length; i < len; ++i) {","      var key = keys[i - 1];","      var val = decodeURLEncodedURIComponent(m[i]);","      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {","        params[key.name] = val;","      }","    }","","    return true;","  };","","","  /**","   * Handle \"populate\" events.","   */","","  var onpopstate = (function () {","    var loaded = false;","    if ( ! hasWindow ) {","      return;","    }","    if (hasDocument && document.readyState === 'complete') {","      loaded = true;","    } else {","      window.addEventListener('load', function() {","        setTimeout(function() {","          loaded = true;","        }, 0);","      });","    }","    return function onpopstate(e) {","      if (!loaded) return;","      if (e.state) {","        var path = e.state.path;","        page.replace(path, e.state);","      } else if (isLocation && hashbang) {","        page.show(pageWindow.location.hash, undefined, undefined, false);","      } else if (isLocation) {","        var loc = pageWindow.location;","        page.show(loc.pathname + loc.hash, undefined, undefined, false);","      }","    };","  })();","  /**","   * Handle \"click\" events.","   */","","  /* jshint +W054 */","  function onclick(e) {","    if (1 !== which(e)) return;","","    if (e.metaKey || e.ctrlKey || e.shiftKey) return;","    if (e.defaultPrevented) return;","","    // ensure link","    // use shadow dom when available if not, fall back to composedPath() for browsers that only have shady","    var el = e.target;","    var eventPath = e.path || (e.composedPath ? e.composedPath() : null);","","    if(eventPath) {","      for (var i = 0; i < eventPath.length; i++) {","        if (!eventPath[i].nodeName) continue;","        if (eventPath[i].nodeName.toUpperCase() !== 'A') continue;","        if (!eventPath[i].href) continue;","","        el = eventPath[i];","        break;","      }","    }","    // continue ensure link","    // el.nodeName for svg links are 'a' instead of 'A'","    while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;","    if (!el || 'A' !== el.nodeName.toUpperCase()) return;","","    // check if link is inside an svg","    // in this case, both href and target are always inside an object","    var svg = (typeof el.href === 'object') && el.href.constructor.name === 'SVGAnimatedString';","","    // Ignore if tag has","    // 1. \"download\" attribute","    // 2. rel=\"external\" attribute","    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;","","    // ensure non-hash for the same path","    var link = el.getAttribute('href');","    if(!hashbang && samePath(el) && (el.hash || '#' === link)) return;","","    // Check for mailto: in the href","    if (link && link.indexOf('mailto:') > -1) return;","","    // check target","    // svg target is an object and its desired value is in .baseVal property","    if (svg ? el.target.baseVal : el.target) return;","","    // x-origin","    // note: svg links that are not relative don't call click events (and skip page.js)","    // consequently, all svg links tested inside page.js are relative and in the same origin","    if (!svg && !sameOrigin(el.href)) return;","","    // rebuild path","    // There aren't .pathname and .search properties in svg links, so we use href","    // Also, svg href is an object and its desired value is in .baseVal property","    var path = svg ? el.href.baseVal : (el.pathname + el.search + (el.hash || ''));","","    path = path[0] !== '/' ? '/' + path : path;","","    // strip leading \"/[drive letter]:\" on NW.js on Windows","    if (hasProcess && path.match(/^\\/[a-zA-Z]:\\//)) {","      path = path.replace(/^\\/[a-zA-Z]:\\//, '/');","    }","","    // same page","    var orig = path;","    var pageBase = getBase();","","    if (path.indexOf(pageBase) === 0) {","      path = path.substr(base.length);","    }","","    if (hashbang) path = path.replace('#!', '');","","    if (pageBase && orig === path) return;","","    e.preventDefault();","    page.show(orig);","  }","","  /**","   * Event button.","   */","","  function which(e) {","    e = e || (hasWindow && window.event);","    return null == e.which ? e.button : e.which;","  }","","  /**","   * Convert to a URL object","   */","  function toURL(href) {","    if(typeof URL === 'function' && isLocation) {","      return new URL(href, location.toString());","    } else if (hasDocument) {","      var anc = document.createElement('a');","      anc.href = href;","      return anc;","    }","  }","","  /**","   * Check if `href` is the same origin.","   */","","  function sameOrigin(href) {","    if(!href || !isLocation) return false;","    var url = toURL(href);","","    var loc = pageWindow.location;","    return loc.protocol === url.protocol &&","      loc.hostname === url.hostname &&","      loc.port === url.port;","  }","","  function samePath(url) {","    if(!isLocation) return false;","    var loc = pageWindow.location;","    return url.pathname === loc.pathname &&","      url.search === loc.search;","  }","","  /**","   * Gets the `base`, which depends on whether we are using History or","   * hashbang routing.","   */","  function getBase() {","    if(!!base) return base;","    var loc = hasWindow && pageWindow && pageWindow.location;","    return (hasWindow && hashbang && loc && loc.protocol === 'file:') ? loc.pathname : base;","  }","","  page.sameOrigin = sameOrigin;",""]);
/* globals require, module */
_$jscmd("index.js", "line", 3);

"use strict";

_$jscmd("index.js", "line", 9);

/**
   * Module dependencies.
   */
var pathtoRegexp = require("path-to-regexp");

_$jscmd("index.js", "line", 10);

var reactTransition = require("./react-transition");

_$jscmd("index.js", "line", 17);

/**
   * Module exports.
   */
module.exports = page;

_$jscmd("index.js", "line", 18);

page.default = page;

_$jscmd("index.js", "line", 19);

page.Context = Context;

_$jscmd("index.js", "line", 20);

page.Route = Route;

_$jscmd("index.js", "line", 21);

page.sameOrigin = sameOrigin;

_$jscmd("index.js", "line", 22);

page.reactTransition = reactTransition;

_$jscmd("index.js", "line", 28);

/**
   * Short-cuts for global-object checks
   */
var hasDocument = "undefined" !== typeof document;

_$jscmd("index.js", "line", 29);

var hasWindow = "undefined" !== typeof window;

_$jscmd("index.js", "line", 30);

var hasHistory = "undefined" !== typeof history;

_$jscmd("index.js", "line", 31);

var hasProcess = typeof process !== "undefined";

_$jscmd("index.js", "line", 36);

/**
   * Detect click event
   */
var clickEvent = _$jscmd("index.js", "cond", "36_19_11", hasDocument) && _$jscmd("index.js", "cond", "36_34_21", document.ontouchstart) ? _$jscmd("index.js", "cond", "36_58_12", "touchstart") : _$jscmd("index.js", "cond", "36_73_7", "click");

_$jscmd("index.js", "line", 43);

/**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */
var isLocation = _$jscmd("index.js", "cond", "43_19_9", hasWindow) && _$jscmd("index.js", "cond", "43_32_46", !!(_$jscmd("index.js", "cond", "43_35_23", window.history.location) || _$jscmd("index.js", "cond", "43_62_15", window.location)));

_$jscmd("index.js", "line", 49);

/**
   * Perform initial dispatch.
   */
var dispatch = true;

_$jscmd("index.js", "line", 56);

/**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
var decodeURLComponents = true;

_$jscmd("index.js", "line", 62);

/**
   * Base path.
   */
var base = "";

_$jscmd("index.js", "line", 68);

/**
   * Strict path matching.
   */
var strict = false;

_$jscmd("index.js", "line", 74);

/**
   * Running flag.
   */
var running;

_$jscmd("index.js", "line", 80);

/**
   * HashBang option
   */
var hashbang = false;

_$jscmd("index.js", "line", 87);

/**
   * Previous context, for capturing
   * page exit events.
   */
var prevContext;

_$jscmd("index.js", "line", 92);

/**
   * The window for which this `page` is running
   */
var pageWindow;

/**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */
function page(path, fn) {
    // <callback>
    if (_$jscmd("index.js", "cond", "114_8_26", "function" === typeof path)) {
        _$jscmd("index.js", "line", 115);
        return page("*", path);
    }
    // route <path> to <callback ...>
    if (_$jscmd("index.js", "cond", "119_8_24", "function" === typeof fn)) {
        _$jscmd("index.js", "line", 120);
        var route = new Route(/** @type {string} */ path);
        for (var i = 1; i < arguments.length; ++i) {
            _$jscmd("index.js", "line", 122);
            page.callbacks.push(route.middleware(arguments[i]));
        }
    } else if (_$jscmd("index.js", "cond", "125_15_24", "string" === typeof path)) {
        _$jscmd("index.js", "line", 126);
        page["string" === typeof fn ? _$jscmd("index.js", "cond", "126_36_10", "redirect") : _$jscmd("index.js", "cond", "126_49_6", "show")](path, fn);
    } else {
        _$jscmd("index.js", "line", 129);
        page.start(path);
    }
}

_$jscmd("index.js", "line", 137);

/**
   * Callback functions.
   */
page.callbacks = [];

_$jscmd("index.js", "line", 138);

page.exits = [];

_$jscmd("index.js", "line", 144);

/**
   * Current path being processed
   * @type {string}
   */
page.current = "";

_$jscmd("index.js", "line", 155);

/**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */
page.len = 0;

_$jscmd("index.js", "line", 164);

/**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */
page.base = function(path) {
    if (_$jscmd("index.js", "cond", "165_8_22", 0 === arguments.length)) return base;
    _$jscmd("index.js", "line", 166);
    base = path;
};

_$jscmd("index.js", "line", 176);

/**
   * Get or set strict path matching to `enable`
   *
   * @param {boolean} enable
   * @api public
   */
page.strict = function(enable) {
    if (_$jscmd("index.js", "cond", "177_8_22", 0 === arguments.length)) return strict;
    _$jscmd("index.js", "line", 178);
    strict = enable;
};

_$jscmd("index.js", "line", 194);

/**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */
page.start = function(options) {
    _$jscmd("index.js", "line", 195);
    options = _$jscmd("index.js", "cond", "195_14_7", options) || _$jscmd("index.js", "cond", "195_25_2", {});
    if (_$jscmd("index.js", "cond", "196_8_7", running)) return;
    _$jscmd("index.js", "line", 197);
    running = true;
    _$jscmd("index.js", "line", 198);
    pageWindow = _$jscmd("index.js", "cond", "198_17_14", options.window) || _$jscmd("index.js", "cond", "198_35_21", _$jscmd("index.js", "cond", "198_36_9", hasWindow) && _$jscmd("index.js", "cond", "198_49_6", window));
    if (_$jscmd("index.js", "cond", "199_8_26", false === options.dispatch)) dispatch = false;
    if (_$jscmd("index.js", "cond", "200_8_37", false === options.decodeURLComponents)) decodeURLComponents = false;
    if (_$jscmd("index.js", "cond", "201_8_39", _$jscmd("index.js", "cond", "201_8_26", false !== options.popstate) && _$jscmd("index.js", "cond", "201_38_9", hasWindow))) pageWindow.addEventListener("popstate", onpopstate, false);
    if (_$jscmd("index.js", "cond", "202_8_38", _$jscmd("index.js", "cond", "202_8_23", false !== options.click) && _$jscmd("index.js", "cond", "202_35_11", hasDocument))) {
        _$jscmd("index.js", "line", 203);
        pageWindow.document.addEventListener(clickEvent, onclick, false);
    }
    _$jscmd("index.js", "line", 205);
    hashbang = !!options.hashbang;
    if (_$jscmd("index.js", "cond", "206_7_36", _$jscmd("index.js", "cond", "206_7_21", _$jscmd("index.js", "cond", "206_7_8", hashbang) && _$jscmd("index.js", "cond", "206_19_9", hasWindow)) && _$jscmd("index.js", "cond", "206_32_11", !hasHistory))) {
        _$jscmd("index.js", "line", 207);
        pageWindow.addEventListener("hashchange", onpopstate, false);
    }
    if (_$jscmd("index.js", "cond", "209_8_9", !dispatch)) return;
    _$jscmd("index.js", "line", 211);
    var url;
    if (_$jscmd("index.js", "cond", "212_7_10", isLocation)) {
        _$jscmd("index.js", "line", 213);
        var loc = pageWindow.location;
        if (_$jscmd("index.js", "cond", "215_9_35", _$jscmd("index.js", "cond", "215_9_8", hashbang) && _$jscmd("index.js", "cond", "215_21_23", ~loc.hash.indexOf("#!")))) {
            _$jscmd("index.js", "line", 216);
            url = loc.hash.substr(2);
        } else if (_$jscmd("index.js", "cond", "217_17_8", hashbang)) {
            _$jscmd("index.js", "line", 218);
            url = loc.hash;
        } else {
            _$jscmd("index.js", "line", 220);
            url = loc.pathname + loc.search + loc.hash;
        }
    }
    _$jscmd("index.js", "line", 224);
    page.replace(url, null, true, dispatch);
};

_$jscmd("index.js", "line", 233);

/**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */
page.stop = function() {
    if (_$jscmd("index.js", "cond", "234_8_8", !running)) return;
    _$jscmd("index.js", "line", 235);
    page.current = "";
    _$jscmd("index.js", "line", 236);
    page.len = 0;
    _$jscmd("index.js", "line", 237);
    running = false;
    _$jscmd("index.js", "line", 238);
    _$jscmd("index.js", "cond", "238_4_11", hasDocument) && _$jscmd("index.js", "cond", "238_19_67", pageWindow.document.removeEventListener(clickEvent, onclick, false));
    _$jscmd("index.js", "line", 239);
    _$jscmd("index.js", "cond", "239_4_9", hasWindow) && _$jscmd("index.js", "cond", "239_17_61", pageWindow.removeEventListener("popstate", onpopstate, false));
    _$jscmd("index.js", "line", 240);
    _$jscmd("index.js", "cond", "240_4_9", hasWindow) && _$jscmd("index.js", "cond", "240_17_63", pageWindow.removeEventListener("hashchange", onpopstate, false));
};

_$jscmd("index.js", "line", 254);

/**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */
page.show = function(path, state, dispatch, push) {
    _$jscmd("index.js", "line", 255);
    var ctx = new Context(path, state), prev = prevContext;
    _$jscmd("index.js", "line", 257);
    prevContext = ctx;
    _$jscmd("index.js", "line", 258);
    page.current = ctx.path;
    if (_$jscmd("index.js", "cond", "259_8_18", false !== dispatch)) page.dispatch(ctx, prev);
    if (_$jscmd("index.js", "cond", "260_8_39", _$jscmd("index.js", "cond", "260_8_21", false !== ctx.handled) && _$jscmd("index.js", "cond", "260_33_14", false !== push))) ctx.pushState();
    _$jscmd("index.js", "line", 261);
    return ctx;
};

_$jscmd("index.js", "line", 273);

/**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */
page.back = function(path, state) {
    if (_$jscmd("index.js", "cond", "274_8_12", page.len > 0)) {
        _$jscmd("index.js", "line", 277);
        // this may need more testing to see if all browsers
        // wait for the next tick to go back in history
        _$jscmd("index.js", "cond", "277_6_10", hasHistory) && _$jscmd("index.js", "cond", "277_20_25", pageWindow.history.back());
        _$jscmd("index.js", "line", 278);
        page.len--;
    } else if (_$jscmd("index.js", "cond", "279_15_4", path)) {
        _$jscmd("index.js", "line", 280);
        setTimeout(function() {
            _$jscmd("index.js", "line", 281);
            page.show(path, state);
        });
    } else {
        _$jscmd("index.js", "line", 284);
        setTimeout(function() {
            _$jscmd("index.js", "line", 285);
            page.show(getBase(), state);
        });
    }
};

_$jscmd("index.js", "line", 299);

/**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
page.redirect = function(from, to) {
    // Define route from a path to another
    if (_$jscmd("index.js", "cond", "301_8_50", _$jscmd("index.js", "cond", "301_8_24", "string" === typeof from) && _$jscmd("index.js", "cond", "301_36_22", "string" === typeof to))) {
        _$jscmd("index.js", "line", 302);
        page(from, function(e) {
            _$jscmd("index.js", "line", 303);
            setTimeout(function() {
                _$jscmd("index.js", "line", 304);
                page.replace(/** @type {!string} */ to);
            }, 0);
        });
    }
    // Wait for the push state and replace it with another
    if (_$jscmd("index.js", "cond", "310_8_53", _$jscmd("index.js", "cond", "310_8_24", "string" === typeof from) && _$jscmd("index.js", "cond", "310_36_25", "undefined" === typeof to))) {
        _$jscmd("index.js", "line", 311);
        setTimeout(function() {
            _$jscmd("index.js", "line", 312);
            page.replace(from);
        }, 0);
    }
};

_$jscmd("index.js", "line", 329);

/**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */
page.replace = function(path, state, init, dispatch) {
    _$jscmd("index.js", "line", 330);
    var ctx = new Context(path, state), prev = prevContext;
    _$jscmd("index.js", "line", 332);
    prevContext = ctx;
    _$jscmd("index.js", "line", 333);
    page.current = ctx.path;
    _$jscmd("index.js", "line", 334);
    ctx.init = init;
    _$jscmd("index.js", "line", 335);
    ctx.save();
    // save before dispatching, which may redirect
    if (_$jscmd("index.js", "cond", "336_8_18", false !== dispatch)) page.dispatch(ctx, prev);
    _$jscmd("index.js", "line", 337);
    return ctx;
};

_$jscmd("index.js", "line", 347);

/**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
page.dispatch = function(ctx, prev) {
    _$jscmd("index.js", "line", 348);
    var i = 0, j = 0;
    function nextExit() {
        _$jscmd("index.js", "line", 352);
        var fn = page.exits[j++];
        if (_$jscmd("index.js", "cond", "353_10_3", !fn)) return nextEnter();
        _$jscmd("index.js", "line", 354);
        fn(prev, nextExit);
    }
    function nextEnter() {
        _$jscmd("index.js", "line", 358);
        var fn = page.callbacks[i++];
        if (_$jscmd("index.js", "cond", "360_10_25", ctx.path !== page.current)) {
            _$jscmd("index.js", "line", 361);
            ctx.handled = false;
            _$jscmd("index.js", "line", 362);
            return;
        }
        if (_$jscmd("index.js", "cond", "364_10_3", !fn)) return unhandled(ctx);
        _$jscmd("index.js", "line", 365);
        fn(ctx, nextEnter);
    }
    if (_$jscmd("index.js", "cond", "368_8_4", prev)) {
        _$jscmd("index.js", "line", 369);
        nextExit();
    } else {
        _$jscmd("index.js", "line", 371);
        nextEnter();
    }
};

/**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
function unhandled(ctx) {
    if (_$jscmd("index.js", "cond", "384_8_11", ctx.handled)) return;
    _$jscmd("index.js", "line", 385);
    var current;
    if (_$jscmd("index.js", "cond", "387_8_8", hashbang)) {
        _$jscmd("index.js", "line", 388);
        current = _$jscmd("index.js", "cond", "388_16_10", isLocation) && _$jscmd("index.js", "cond", "388_30_54", getBase() + pageWindow.location.hash.replace("#!", ""));
    } else {
        _$jscmd("index.js", "line", 390);
        current = _$jscmd("index.js", "cond", "390_16_10", isLocation) && _$jscmd("index.js", "cond", "390_30_57", pageWindow.location.pathname + pageWindow.location.search);
    }
    if (_$jscmd("index.js", "cond", "393_8_29", current === ctx.canonicalPath)) return;
    _$jscmd("index.js", "line", 394);
    page.stop();
    _$jscmd("index.js", "line", 395);
    ctx.handled = false;
    _$jscmd("index.js", "line", 396);
    _$jscmd("index.js", "cond", "396_4_10", isLocation) && _$jscmd("index.js", "cond", "396_18_46", pageWindow.location.href = ctx.canonicalPath);
}

_$jscmd("index.js", "line", 405);

/**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
page.exit = function(path, fn) {
    if (_$jscmd("index.js", "cond", "406_8_26", typeof path === "function")) {
        _$jscmd("index.js", "line", 407);
        return page.exit("*", path);
    }
    _$jscmd("index.js", "line", 410);
    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
        _$jscmd("index.js", "line", 412);
        page.exits.push(route.middleware(arguments[i]));
    }
};

/**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
function decodeURLEncodedURIComponent(val) {
    if (_$jscmd("index.js", "cond", "424_8_23", typeof val !== "string")) {
        _$jscmd("index.js", "line", 424);
        return val;
    }
    _$jscmd("index.js", "line", 425);
    return decodeURLComponents ? _$jscmd("index.js", "cond", "425_33_43", decodeURIComponent(val.replace(/\+/g, " "))) : _$jscmd("index.js", "cond", "425_79_3", val);
}

/**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */
function Context(path, state) {
    _$jscmd("index.js", "line", 439);
    var pageBase = getBase();
    if (_$jscmd("index.js", "cond", "440_8_47", _$jscmd("index.js", "cond", "440_8_15", "/" === path[0]) && _$jscmd("index.js", "cond", "440_27_28", 0 !== path.indexOf(pageBase)))) path = pageBase + (hashbang ? _$jscmd("index.js", "cond", "440_87_4", "#!") : _$jscmd("index.js", "cond", "440_94_2", "")) + path;
    _$jscmd("index.js", "line", 441);
    var i = path.indexOf("?");
    _$jscmd("index.js", "line", 443);
    this.canonicalPath = path;
    _$jscmd("index.js", "line", 444);
    this.path = _$jscmd("index.js", "cond", "444_16_26", path.replace(pageBase, "")) || "/";
    if (_$jscmd("index.js", "cond", "445_8_8", hashbang)) this.path = _$jscmd("index.js", "cond", "445_30_27", this.path.replace("#!", "")) || "/";
    _$jscmd("index.js", "line", 447);
    this.title = _$jscmd("index.js", "cond", "447_18_11", hasDocument) && _$jscmd("index.js", "cond", "447_33_25", pageWindow.document.title);
    _$jscmd("index.js", "line", 448);
    this.state = _$jscmd("index.js", "cond", "448_17_5", state) || _$jscmd("index.js", "cond", "448_26_2", {});
    _$jscmd("index.js", "line", 449);
    this.state.path = path;
    _$jscmd("index.js", "line", 450);
    this.querystring = ~i ? _$jscmd("index.js", "cond", "450_28_47", decodeURLEncodedURIComponent(path.slice(i + 1))) : _$jscmd("index.js", "cond", "450_78_2", "");
    _$jscmd("index.js", "line", 451);
    this.pathname = decodeURLEncodedURIComponent(~i ? _$jscmd("index.js", "cond", "451_54_16", path.slice(0, i)) : _$jscmd("index.js", "cond", "451_73_4", path));
    _$jscmd("index.js", "line", 452);
    this.params = {};
    _$jscmd("index.js", "line", 455);
    // fragment
    this.hash = "";
    if (_$jscmd("index.js", "cond", "456_8_9", !hashbang)) {
        if (_$jscmd("index.js", "cond", "457_10_24", !~this.path.indexOf("#"))) return;
        _$jscmd("index.js", "line", 458);
        var parts = this.path.split("#");
        _$jscmd("index.js", "line", 459);
        this.path = this.pathname = parts[0];
        _$jscmd("index.js", "line", 460);
        this.hash = _$jscmd("index.js", "cond", "460_18_38", decodeURLEncodedURIComponent(parts[1])) || "";
        _$jscmd("index.js", "line", 461);
        this.querystring = this.querystring.split("#")[0];
    }
}

_$jscmd("index.js", "line", 469);

/**
   * Expose `Context`.
   */
page.Context = Context;

_$jscmd("index.js", "line", 477);

/**
   * Push state.
   *
   * @api private
   */
Context.prototype.pushState = function() {
    _$jscmd("index.js", "line", 478);
    page.len++;
    if (_$jscmd("index.js", "cond", "479_8_10", hasHistory)) {
        _$jscmd("index.js", "line", 480);
        pageWindow.history.pushState(this.state, this.title, _$jscmd("index.js", "cond", "481_10_8", hashbang) && _$jscmd("index.js", "cond", "481_22_17", this.path !== "/") ? _$jscmd("index.js", "cond", "481_42_16", "#!" + this.path) : _$jscmd("index.js", "cond", "481_61_18", this.canonicalPath));
    }
};

_$jscmd("index.js", "line", 491);

/**
   * Save the context state.
   *
   * @api public
   */
Context.prototype.save = function() {
    if (_$jscmd("index.js", "cond", "492_8_54", _$jscmd("index.js", "cond", "492_8_10", hasHistory) && _$jscmd("index.js", "cond", "492_22_40", pageWindow.location.protocol !== "file:"))) {
        _$jscmd("index.js", "line", 493);
        pageWindow.history.replaceState(this.state, this.title, _$jscmd("index.js", "cond", "494_10_8", hashbang) && _$jscmd("index.js", "cond", "494_22_17", this.path !== "/") ? _$jscmd("index.js", "cond", "494_42_16", "#!" + this.path) : _$jscmd("index.js", "cond", "494_61_18", this.canonicalPath));
    }
};

/**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */
function Route(path, options) {
    _$jscmd("index.js", "line", 514);
    options = _$jscmd("index.js", "cond", "514_14_7", options) || _$jscmd("index.js", "cond", "514_25_2", {});
    _$jscmd("index.js", "line", 515);
    options.strict = _$jscmd("index.js", "cond", "515_21_14", options.strict) || _$jscmd("index.js", "cond", "515_39_6", strict);
    _$jscmd("index.js", "line", 516);
    this.path = path === "*" ? _$jscmd("index.js", "cond", "516_33_6", "(.*)") : _$jscmd("index.js", "cond", "516_42_4", path);
    _$jscmd("index.js", "line", 517);
    this.method = "GET";
    _$jscmd("index.js", "line", 518);
    this.regexp = pathtoRegexp(this.path, this.keys = [], options);
}

_$jscmd("index.js", "line", 527);

/**
   * Expose `Route`.
   */
page.Route = Route;

_$jscmd("index.js", "line", 538);

/**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */
Route.prototype.middleware = function(fn) {
    _$jscmd("index.js", "line", 539);
    var self = this;
    _$jscmd("index.js", "line", 540);
    return function(ctx, next) {
        if (_$jscmd("index.js", "cond", "541_10_32", self.match(ctx.path, ctx.params))) return fn(ctx, next);
        _$jscmd("index.js", "line", 542);
        next();
    };
};

_$jscmd("index.js", "line", 556);

/**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */
Route.prototype.match = function(path, params) {
    _$jscmd("index.js", "line", 557);
    var keys = this.keys, qsIndex = path.indexOf("?"), pathname = ~qsIndex ? _$jscmd("index.js", "cond", "559_28_22", path.slice(0, qsIndex)) : _$jscmd("index.js", "cond", "559_53_4", path), m = this.regexp.exec(decodeURIComponent(pathname));
    if (_$jscmd("index.js", "cond", "562_8_2", !m)) return false;
    for (var i = 1, len = m.length; i < len; ++i) {
        _$jscmd("index.js", "line", 565);
        var key = keys[i - 1];
        _$jscmd("index.js", "line", 566);
        var val = decodeURLEncodedURIComponent(m[i]);
        if (_$jscmd("index.js", "cond", "567_10_61", _$jscmd("index.js", "cond", "567_10_17", val !== undefined) || _$jscmd("index.js", "cond", "567_31_40", !hasOwnProperty.call(params, key.name)))) {
            _$jscmd("index.js", "line", 568);
            params[key.name] = val;
        }
    }
    _$jscmd("index.js", "line", 572);
    return true;
};

_$jscmd("index.js", "line", 580);

/**
   * Handle "populate" events.
   */
var onpopstate = function() {
    _$jscmd("index.js", "line", 581);
    var loaded = false;
    if (_$jscmd("index.js", "cond", "582_9_11", !hasWindow)) {
        _$jscmd("index.js", "line", 583);
        return;
    }
    if (_$jscmd("index.js", "cond", "585_8_49", _$jscmd("index.js", "cond", "585_8_11", hasDocument) && _$jscmd("index.js", "cond", "585_23_34", document.readyState === "complete"))) {
        _$jscmd("index.js", "line", 586);
        loaded = true;
    } else {
        _$jscmd("index.js", "line", 588);
        window.addEventListener("load", function() {
            _$jscmd("index.js", "line", 589);
            setTimeout(function() {
                _$jscmd("index.js", "line", 590);
                loaded = true;
            }, 0);
        });
    }
    _$jscmd("index.js", "line", 594);
    return function onpopstate(e) {
        if (_$jscmd("index.js", "cond", "595_10_7", !loaded)) return;
        if (_$jscmd("index.js", "cond", "596_10_7", e.state)) {
            _$jscmd("index.js", "line", 597);
            var path = e.state.path;
            _$jscmd("index.js", "line", 598);
            page.replace(path, e.state);
        } else if (_$jscmd("index.js", "cond", "599_17_22", _$jscmd("index.js", "cond", "599_17_10", isLocation) && _$jscmd("index.js", "cond", "599_31_8", hashbang))) {
            _$jscmd("index.js", "line", 600);
            page.show(pageWindow.location.hash, undefined, undefined, false);
        } else if (_$jscmd("index.js", "cond", "601_17_10", isLocation)) {
            _$jscmd("index.js", "line", 602);
            var loc = pageWindow.location;
            _$jscmd("index.js", "line", 603);
            page.show(loc.pathname + loc.hash, undefined, undefined, false);
        }
    };
}();

/**
   * Handle "click" events.
   */
/* jshint +W054 */
function onclick(e) {
    if (_$jscmd("index.js", "cond", "613_8_14", 1 !== which(e))) return;
    if (_$jscmd("index.js", "cond", "615_8_36", _$jscmd("index.js", "cond", "615_8_22", _$jscmd("index.js", "cond", "615_8_9", e.metaKey) || _$jscmd("index.js", "cond", "615_21_9", e.ctrlKey)) || _$jscmd("index.js", "cond", "615_34_10", e.shiftKey))) return;
    if (_$jscmd("index.js", "cond", "616_8_18", e.defaultPrevented)) return;
    _$jscmd("index.js", "line", 620);
    // ensure link
    // use shadow dom when available if not, fall back to composedPath() for browsers that only have shady
    var el = e.target;
    _$jscmd("index.js", "line", 621);
    var eventPath = _$jscmd("index.js", "cond", "621_20_6", e.path) || _$jscmd("index.js", "cond", "621_30_42", e.composedPath ? _$jscmd("index.js", "cond", "621_48_16", e.composedPath()) : _$jscmd("index.js", "cond", "621_67_4", null));
    if (_$jscmd("index.js", "cond", "623_7_9", eventPath)) {
        for (var i = 0; i < eventPath.length; i++) {
            if (_$jscmd("index.js", "cond", "625_12_22", !eventPath[i].nodeName)) continue;
            if (_$jscmd("index.js", "cond", "626_12_43", eventPath[i].nodeName.toUpperCase() !== "A")) continue;
            if (_$jscmd("index.js", "cond", "627_12_18", !eventPath[i].href)) continue;
            _$jscmd("index.js", "line", 629);
            el = eventPath[i];
            _$jscmd("index.js", "line", 630);
            break;
        }
    }
    // continue ensure link
    // el.nodeName for svg links are 'a' instead of 'A'
    while (_$jscmd("index.js", "cond", "635_11_2", el) && _$jscmd("index.js", "cond", "635_17_33", "A" !== el.nodeName.toUpperCase())) el = el.parentNode;
    if (_$jscmd("index.js", "cond", "636_8_40", _$jscmd("index.js", "cond", "636_8_3", !el) || _$jscmd("index.js", "cond", "636_15_33", "A" !== el.nodeName.toUpperCase()))) return;
    _$jscmd("index.js", "line", 640);
    // check if link is inside an svg
    // in this case, both href and target are always inside an object
    var svg = _$jscmd("index.js", "cond", "640_14_29", typeof el.href === "object") && _$jscmd("index.js", "cond", "640_47_48", el.href.constructor.name === "SVGAnimatedString");
    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (_$jscmd("index.js", "cond", "645_8_68", _$jscmd("index.js", "cond", "645_8_27", el.hasAttribute("download")) || _$jscmd("index.js", "cond", "645_39_37", el.getAttribute("rel") === "external"))) return;
    _$jscmd("index.js", "line", 648);
    // ensure non-hash for the same path
    var link = el.getAttribute("href");
    if (_$jscmd("index.js", "cond", "649_7_54", _$jscmd("index.js", "cond", "649_7_25", _$jscmd("index.js", "cond", "649_7_9", !hashbang) && _$jscmd("index.js", "cond", "649_20_12", samePath(el))) && _$jscmd("index.js", "cond", "649_36_25", _$jscmd("index.js", "cond", "649_37_7", el.hash) || _$jscmd("index.js", "cond", "649_48_12", "#" === link)))) return;
    // Check for mailto: in the href
    if (_$jscmd("index.js", "cond", "652_8_36", _$jscmd("index.js", "cond", "652_8_4", link) && _$jscmd("index.js", "cond", "652_16_28", link.indexOf("mailto:") > -1))) return;
    // check target
    // svg target is an object and its desired value is in .baseVal property
    if (_$jscmd("index.js", "cond", "656_8_35", svg ? _$jscmd("index.js", "cond", "656_14_17", el.target.baseVal) : _$jscmd("index.js", "cond", "656_34_9", el.target))) return;
    // x-origin
    // note: svg links that are not relative don't call click events (and skip page.js)
    // consequently, all svg links tested inside page.js are relative and in the same origin
    if (_$jscmd("index.js", "cond", "661_8_28", _$jscmd("index.js", "cond", "661_8_4", !svg) && _$jscmd("index.js", "cond", "661_16_20", !sameOrigin(el.href)))) return;
    _$jscmd("index.js", "line", 666);
    // rebuild path
    // There aren't .pathname and .search properties in svg links, so we use href
    // Also, svg href is an object and its desired value is in .baseVal property
    var path = svg ? _$jscmd("index.js", "cond", "666_21_15", el.href.baseVal) : _$jscmd("index.js", "cond", "666_39_43", el.pathname + el.search + (_$jscmd("index.js", "cond", "666_67_7", el.hash) || ""));
    _$jscmd("index.js", "line", 668);
    path = path[0] !== "/" ? _$jscmd("index.js", "cond", "668_29_10", "/" + path) : _$jscmd("index.js", "cond", "668_42_4", path);
    // strip leading "/[drive letter]:" on NW.js on Windows
    if (_$jscmd("index.js", "cond", "671_8_42", _$jscmd("index.js", "cond", "671_8_10", hasProcess) && _$jscmd("index.js", "cond", "671_22_28", path.match(/^\/[a-zA-Z]:\//)))) {
        _$jscmd("index.js", "line", 672);
        path = path.replace(/^\/[a-zA-Z]:\//, "/");
    }
    _$jscmd("index.js", "line", 676);
    // same page
    var orig = path;
    _$jscmd("index.js", "line", 677);
    var pageBase = getBase();
    if (_$jscmd("index.js", "cond", "679_8_28", path.indexOf(pageBase) === 0)) {
        _$jscmd("index.js", "line", 680);
        path = path.substr(base.length);
    }
    if (_$jscmd("index.js", "cond", "683_8_8", hashbang)) path = path.replace("#!", "");
    if (_$jscmd("index.js", "cond", "685_8_25", _$jscmd("index.js", "cond", "685_8_8", pageBase) && _$jscmd("index.js", "cond", "685_20_13", orig === path))) return;
    _$jscmd("index.js", "line", 687);
    e.preventDefault();
    _$jscmd("index.js", "line", 688);
    page.show(orig);
}

/**
   * Event button.
   */
function which(e) {
    _$jscmd("index.js", "line", 696);
    e = _$jscmd("index.js", "cond", "696_8_1", e) || _$jscmd("index.js", "cond", "696_13_27", _$jscmd("index.js", "cond", "696_14_9", hasWindow) && _$jscmd("index.js", "cond", "696_27_12", window.event));
    _$jscmd("index.js", "line", 697);
    return null == e.which ? _$jscmd("index.js", "cond", "697_29_8", e.button) : _$jscmd("index.js", "cond", "697_40_7", e.which);
}

/**
   * Convert to a URL object
   */
function toURL(href) {
    if (_$jscmd("index.js", "cond", "704_7_39", _$jscmd("index.js", "cond", "704_7_25", typeof URL === "function") && _$jscmd("index.js", "cond", "704_36_10", isLocation))) {
        _$jscmd("index.js", "line", 705);
        return new URL(href, location.toString());
    } else if (_$jscmd("index.js", "cond", "706_15_11", hasDocument)) {
        _$jscmd("index.js", "line", 707);
        var anc = document.createElement("a");
        _$jscmd("index.js", "line", 708);
        anc.href = href;
        _$jscmd("index.js", "line", 709);
        return anc;
    }
}

/**
   * Check if `href` is the same origin.
   */
function sameOrigin(href) {
    if (_$jscmd("index.js", "cond", "718_7_20", _$jscmd("index.js", "cond", "718_7_5", !href) || _$jscmd("index.js", "cond", "718_16_11", !isLocation))) return false;
    _$jscmd("index.js", "line", 719);
    var url = toURL(href);
    _$jscmd("index.js", "line", 721);
    var loc = pageWindow.location;
    _$jscmd("index.js", "line", 722);
    return _$jscmd("index.js", "cond", "722_11_68", _$jscmd("index.js", "cond", "722_11_29", loc.protocol === url.protocol) && _$jscmd("index.js", "cond", "723_6_29", loc.hostname === url.hostname)) && _$jscmd("index.js", "cond", "724_6_21", loc.port === url.port);
}

function samePath(url) {
    if (_$jscmd("index.js", "cond", "728_7_11", !isLocation)) return false;
    _$jscmd("index.js", "line", 729);
    var loc = pageWindow.location;
    _$jscmd("index.js", "line", 730);
    return _$jscmd("index.js", "cond", "730_11_29", url.pathname === loc.pathname) && _$jscmd("index.js", "cond", "731_6_25", url.search === loc.search);
}

/**
   * Gets the `base`, which depends on whether we are using History or
   * hashbang routing.
   */
function getBase() {
    if (_$jscmd("index.js", "cond", "739_7_6", !!base)) return base;
    _$jscmd("index.js", "line", 740);
    var loc = _$jscmd("index.js", "cond", "740_14_23", _$jscmd("index.js", "cond", "740_14_9", hasWindow) && _$jscmd("index.js", "cond", "740_27_10", pageWindow)) && _$jscmd("index.js", "cond", "740_41_19", pageWindow.location);
    _$jscmd("index.js", "line", 741);
    return _$jscmd("index.js", "cond", "741_12_28", _$jscmd("index.js", "cond", "741_12_21", _$jscmd("index.js", "cond", "741_12_9", hasWindow) && _$jscmd("index.js", "cond", "741_25_8", hashbang)) && _$jscmd("index.js", "cond", "741_37_3", loc)) && _$jscmd("index.js", "cond", "741_44_24", loc.protocol === "file:") ? _$jscmd("index.js", "cond", "741_72_12", loc.pathname) : _$jscmd("index.js", "cond", "741_87_4", base);
}

_$jscmd("index.js", "line", 744);

page.sameOrigin = sameOrigin;