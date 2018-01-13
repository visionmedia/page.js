before(function(next) {
  var jsdom = require('jsdom');
  var html = '<!doctype html><html><head></head><body></body></html>';

  function setupGlobals(window) {
    window.console = console;
    window.history.replaceState(null, '', '/');
    global.window = window;
    global.location = window.location;
    global.document = window.document;
    global.history = window.history;
    window._$jscoverage = global._$jscoverage;
  }

  if(jsdom.env) {
    jsdom.env({
      html: html,
      done: function(errors, window) {
        setupGlobals(window);
        if (errors) {
          errors.forEach(console.log);
          throw new Error(errors[0].data.error);
        }
        next();
      }
    });
  } else {
    var dom = new jsdom.JSDOM(html, {
      url: 'http://example.com'
    });
    setupGlobals(dom.window);
    next();
  }
});
