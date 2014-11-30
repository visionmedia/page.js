var isNode = false,
  $head,
  $;

if (isNode = typeof window !== 'object') {
  require('./support/jsdom');

  before(function() {

    global.chai = require('chai');
    global.expect = chai.expect;
    global.page = process.env.PAGE_COV ? require('../index-cov') : require('../index');
    $ = document.querySelector.bind(document);
    $head = $('head');

  });

} else {
  expect = chai.expect;
  $ = document.querySelector.bind(document);
  $head = $('head');
}

var called = false,
  htmlWrapper,
  html = '',
  base = '',
  baseTag,
  hashbang = false,
  /**
   * Fire an event handler to the specified node. Event handlers can detect that the event was fired programatically
   * by testing for a 'synthetic=true' property on the event object
   * @param {HTMLNode} node The node to fire the event handler on.
   * @param {String} eventName The name of the event without the "on" (e.g., "focus")
   */
  fireEvent = function(node, eventName) {

    var event = document.createEvent('MouseEvents');

    // https://developer.mozilla.org/en-US/docs/Web/API/event.initMouseEvent

    event.initEvent(
      eventName, true, true, window, 0,
      event.screenX, event.screenY, event.clientX, event.clientY,
      false, false, false, false,
      0, null);

    event.button = 1;
    event.which = null;

    node.dispatchEvent(event);

  },
  beforeTests = function(options) {
    page.callbacks = [];
    page.exits = [];
    options = options || {};

    page('/', function() {
      called = true;
    });

    if (!baseTag) {
      baseTag = document.createElement('base');
      $head.appendChild(baseTag);
    }

    baseTag.setAttribute('href', (base ? base + '/' : '/'));

    htmlWrapper = document.createElement('div');

    html += '<ul class="links">';
    html += '      <li><a class="index" href="./">/</a></li>';
    html += '      <li><a class="whoop" href="#whoop">#whoop</a></li>';
    html += '      <li><a class="about" href="./about">/about</a></li>';
    html += '      <li><a class="contact" href="./contact">/contact</a></li>';
    html += '      <li><a class="contact-me" href="./contact/me">/contact/me</a></li>';
    html += '      <li><a class="not-found" href="./not-found?foo=bar">/not-found</a></li>';
    html += '</ul>';

    htmlWrapper.innerHTML = html;
    document.body.appendChild(htmlWrapper);



    page(options);

  },
  tests = function() {
    describe('on page load', function() {
      it('should invoke the matching callback', function() {
        expect(called).to.equal(true);
      });
    });

    describe('on redirect', function() {
      it('should load destination page', function(done) {
        page.redirect('/from', '/to');
        page('/to', function() {
          done();
        });
        page('/from');
      });
      it('should work with short alias', function(done) {
        page('/one', '/two');
        page('/two', function() {
          done();
        });
        page('/one');
      });
      it('should load done within redirect', function(done) {
        page('/redirect', function() {
          page.redirect('/done');
        });
        page('/done', function() {
          done();
        });
        page('/redirect');
      });
    });

    describe('on exit', function() {
      it('should run when exiting the page', function(done) {
        page('/exit', function() {
          visited = true;
        });

        page.exit('/exit', function() {
          expect(visited).to.equal(true);
          done();
        });

        page('/exit');
        page('/');
      });

      it('should only run on matched routes', function(done) {
        page('/should-exit', function() {});
        page('/', function() {});

        page.exit('/should-not-exit', function() {
          throw new Error('This exit route should not have been called');
        });

        page.exit('/should-exit', function() {
          done();
        });

        page('/should-exit');
        page('/');
      });

      it('should use the previous context', function(done) {
        var unique;

        page('/', function() {});
        page('/bootstrap', function(ctx) {
          unique = ctx.unique = {};
        });

        page.exit('/bootstrap', function(ctx) {
          expect(ctx.unique).to.equal(unique);
          done();
        })

        page('/bootstrap');
        page('/');
      });
    });

    describe('ctx.querystring', function() {
      it('should default to ""', function(done) {
        page('/querystring-default', function(ctx) {
          expect(ctx.querystring).to.equal('');
          done();
        });

        page('/querystring-default');
      });

      it('should expose the query string', function(done) {
        page('/querystring', function(ctx) {
          expect(ctx.querystring).to.equal('hello=there');
          done();
        });

        page('/querystring?hello=there');
      });
    });

    describe('ctx.pathname', function() {
      it('should default to ctx.path', function(done) {
        page('/pathname-default', function(ctx) {
          expect(ctx.pathname).to.equal(base + (base && hashbang ? '#!' : '') + '/pathname-default');
          done();
        });

        page('/pathname-default');
      });

      it('should omit the query string', function(done) {
        page('/pathname', function(ctx) {
          expect(ctx.pathname).to.equal(base + (base && hashbang ? '#!' : '') + '/pathname');
          done();
        });

        page('/pathname?hello=there');
      });
    });

    describe('ctx.handled', function() {
      it('should skip unhandled redirect if exists', function() {
        page('/page/:page', function(ctx, next) {
          ctx.handled = true;
          next();
        });
        var ctx = page.show('/page/1');
        expect(ctx.handled).to.be.ok;
      });
    });

    describe('links dispatcher', function() {

      it('should invoke the callback', function(done) {
        page('/about', function() {
          done();
        });
        fireEvent($('.about'), 'click');
      });

      it('should invoke the callback with the right params', function(done) {
        page('/contact/:name', function(ctx) {
          expect(ctx.params.name).to.equal('me');
          done();
        });
        fireEvent($('.contact-me'), 'click');
      });

      it('should not invoke the callback', function() {
        page('/whoop', function(ctx) {
          expect(true).to.equal(false);
        });
        fireEvent($('.whoop'), 'click');
      });

    });


    describe('dispatcher', function() {
      it('should ignore query strings', function(done) {
        page('/qs', function(ctx) {
          done();
        });

        page('/qs?test=true');
      });

      it('should ignore query strings with params', function(done) {
        page('/qs/:name', function(ctx) {
          expect(ctx.params.name).to.equal('tobi');
          done();
        });

        page('/qs/tobi?test=true');
      });

      it('should invoke the matching callback', function(done) {
        page('/user/:name', function(ctx) {
          done();
        });

        page('/user/tj');
      });

      it('should populate ctx.params', function(done) {
        page('/blog/post/:name', function(ctx) {
          expect(ctx.params.name).to.equal('something');
          done();
        });

        page('/blog/post/something');
      });

      describe('when next() is invoked', function() {
        it('should invoke subsequent matching middleware', function(done) {
          page('/forum/*', function(ctx, next) {
            ctx.fullPath = ctx.params[0];
            next();
          });

          page('/user', function() {

          });

          page('/forum/:fid/thread/:tid', function(ctx) {
            expect(ctx.params.tid).to.equal('2');
            done();
          });

          page('/forum/1/thread/2');
        });
      });



      describe('not found', function() {
        it('should invoke the not found callback', function(done) {
          page(function() {
            done();
          });
          page('/whathever');
        });
      });

    });
  },
  afterTests = function() {

    document.body.removeChild(htmlWrapper);

    called = false;
    page.stop();
    page.base('');
    page('/');
    base = '';
  };

describe('Html5 history navigation', function() {

  before(function() {
    beforeTests();
  });

  tests();

  after(function() {
    afterTests();
  });

});

describe('Hashbang option enabled', function() {

  before(function() {
    hashbang = true;
    beforeTests({
      hashbang: hashbang
    });
  });

  tests();

  after(function() {
    afterTests();
  });

});

describe('Different Base', function() {

  before(function() {
    base = '/newBase';
    page.base(base);
    beforeTests();
  });

  tests();

  after(function() {
    afterTests();
  });

});