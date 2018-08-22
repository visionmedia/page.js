/* globals before, after, chai, expect, page, describe, it */
(function() {

  'use strict';

  var isNode = typeof window !== 'object',
    global = this,
    called = false,
    baseRoute = Function.prototype, // noop
    html = '',
    base = '',
    setbase = true,
    hashbang = false,
    decodeURLComponents = true,
    chai = this.chai,
    expect = this.expect,
    page = this.page,
    baseTag,
    frame,
    $,
    jsdomSupport;

  if (isNode) {
    jsdomSupport = require('./support/jsdom');
  }

  before(function() {

    if (isNode) {
      chai = require('chai');
      expect = chai.expect;
      page = process.env.PAGE_COV ? require('../index-cov') : require('../index');
    } else {
      expect = chai.expect;
    }

    $ = function(sel) {
      return frame.contentWindow.document.querySelector(sel);
    };

  });

  var fireEvent = function(node, eventName) {
      var event;

      if(typeof testWindow().Event === 'function') {
        var MouseEvent = testWindow().MouseEvent;
        event = new MouseEvent(eventName, {
          bubbles: true,
          button: 1
        });
        Object.defineProperty(event, 'which', { value: null });
      } else {
        event = testWindow().document.createEvent('MouseEvents');

        // https://developer.mozilla.org/en-US/docs/Web/API/event.initMouseEvent
        event.initEvent(
          eventName, true, true, this, 0,
          event.screenX, event.screenY, event.clientX, event.clientY,
          false, false, false, false,
          0, null);

        event.button = 1;
        event.which = null;
      }

      node.dispatchEvent(event);
    },
    testWindow = function(){
      return frame.contentWindow;
    },
    beforeTests = function(options, done) {
      page.callbacks = [];
      page.exits = [];
      options = options || {};

      page('/', function(ctx) {
        called = true;
        baseRoute(ctx);
      });

      function onFrameLoad(){
        if(setbase) {
          var baseTag = frame.contentWindow.document.createElement('base');
          frame.contentWindow.document.head.appendChild(baseTag);

          baseTag.setAttribute('href', (base ? base + '/' : '/'));
        }

        options.window = frame.contentWindow;
        page(options);
        page(base ? base + '/' : '/');
        done();
      }

      frame = document.createElement('iframe');
      document.body.appendChild(frame);
      if(isNode) {
        var cntn = require('fs').readFileSync(__dirname + '/test-page.html', 'utf8');
        cntn = cntn.replace('<!doctype html>', '').trim();
        cntn = cntn.replace('<html lang="en">', '');
        frame.contentWindow.document.documentElement.innerHTML = cntn;
        onFrameLoad();
      } else {
        frame.src = './test-page.html';
        frame.addEventListener('load', onFrameLoad);
      }
    },
    replaceable = function(route) {
      function realCallback(ctx) {
        obj.callback(ctx);
      }

      var obj = {
        callback: Function.prototype,
        replace: function(cb){
          obj.callback = cb;
        },
        once: function(cb){
          obj.replace(function(ctx){
            obj.callback = Function.prototype;
            cb(ctx);
          });
        }
      };

      page(route, realCallback);

      return obj;
    },
    tests = function() {
      describe('on page load', function() {
        it('should invoke the matching callback', function() {
          expect(called).to.equal(true);
        });

        it('should invoke the matching async callbacks', function(done) {
          page('/async', function(ctx, next) {
            setTimeout(function() {
              next();
            }, 10);
          }, function(ctx, next) {
            setTimeout(function() {
              done();
            }, 10);
          });
          page('/async');
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
          var visited = false;
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

        it('should run async callbacks when exiting the page', function(done) {
          var visited = false;
          page('/async-exit', function() {
            visited = true;
          });

          page.exit('/async-exit', function(ctx, next) {
            setTimeout(function() {
              next();
            }, 10);
          }, function(ctx, next) {
            setTimeout(function () {
              expect(visited).to.equal(true);
              done();
            }, 10);
          });

          page('/async-exit');
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
          });

          page('/bootstrap');
          page('/');
        });
      });

      describe('no dispatch', function() {
        it('should use the previous context when not dispatching', function(done) {
          var count = 0;

          page('/', function() {});

          page.exit('*', function(context) {
            var path = context.path;
            setTimeout( function() {
              expect(path).to.equal('/');
              page.replace( '/', null, false, false);
              if ( count === 2 ) {
                done();
                return;
              }
              count++;
            }, 0);
          });

          page('/');

          page('/bootstrap');

          setTimeout( function() {
            page('/bootstrap');
          }, 0 );
        });


        after(function() {
          // remove exit handler that was added
          page.exits.pop();
        });
      });

      describe('page.back', function() {
        var first;

        before(function() {
          first = replaceable('/first', function(){});
          page('/second', function() {});
          page('/first');
          page('/second');
        });

        it('should move back to history', function(done) {
          first.once(function(){
            var path = hashbang
              ? testWindow().location.hash.replace('#!', '')
              : testWindow().location.pathname;
            path = path.replace(base, '');
            expect(path).to.be.equal('/first');
            done();
          });

          page.back('/first');

        });

        it('should decrement page.len on back()', function() {
          var lenAtFirst = page.len;
          page('/second');
          page.back('/first');
          expect(page.len).to.be.equal(lenAtFirst);
        });

        it('calling back() when there is nothing in the history should go to the given path', function(done){
          page('/fourth', function(){
            expect(page.len).to.be.equal(0);
            done();
          });
          page.len = 0;
          page.back('/fourth');
        });

        it('calling back with nothing in the history and no path should go to the base', function(done){
          baseRoute = function(){
            expect(page.len).to.be.equal(0);
            baseRoute = Function.prototype;
            done();
          };
          page.len = 0;
          page.back();
        });
        
        it('calling back() from a different app should make the page reload', function(done){
          var loc = window.location.href;
          var id  = page.id;
          page('/another-app/route', function(ctx){
            expect(loc).to.not.eql(ctx.path);
            expect(ctx.state.router).to.not.eql(id);
            done();
          });
          page.len = 0;
          page.id = 'ANOTHER_PAGE_ROUTER';
          page.back('/another-app/route');
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

        it('should accommodate URL encoding', function(done) {
          page('/whatever', function(ctx) {
            expect(ctx.querystring).to.equal(decodeURLComponents ? 'queryParam=string with whitespace' : 'queryParam=string%20with%20whitespace');
            done();
          });

          page('/whatever?queryParam=string%20with%20whitespace');
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

        it('should accommodate URL encoding', function(done) {
          page('/long path with whitespace', function(ctx) {
            expect(ctx.pathname).to.equal(base + (base && hashbang ? '#!' : '') +
              (decodeURLComponents ? '/long path with whitespace' : '/long%20path%20with%20whitespace'));
            done();
          });

          page('/long%20path%20with%20whitespace');
        });
      });

      describe('ctx.params', function() {
        it('should always be URL-decoded', function(done) {
          page('/whatever/:param', function(ctx) {
            expect(ctx.params.param).to.equal('param with whitespace');
            done();
          });

          page('/whatever/param%20with%20whitespace');
        });

        it('should be an object', function(done) {
          page('/ctxparams/:param/', function(ctx) {
            expect(ctx.params).to.not.be.an('array');
            expect(ctx.params).to.be.an('object');
            done();
          });
          page('/ctxparams/test/');
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

        it('should handle trailing slashes in URL', function(done) {
          page('/link-trailing', function() {
            expect(page.strict()).to.equal(false);
            done();
          });
          page('/link-trailing/', function() {
            expect(page.strict()).to.equal(true);
            done();
          });
          fireEvent($('.link-trailing'), 'click');
        });

        it('should handle trailing slashes in route', function(done) {
          page('/link-no-trailing/', function() {
            expect(page.strict()).to.equal(false);
            done();
          });
          page('/link-no-trailing', function() {
            expect(page.strict()).to.equal(true);
            done();
          });
          fireEvent($('.link-no-trailing'), 'click');
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

        it('should not fire when navigating to a different domain', function(done){
          page('/diff-domain', function(ctx){
            expect(true).to.equal(false);
          });

          testWindow().document.addEventListener('click', function onDocClick(ev){
            ev.preventDefault();
            testWindow().document.removeEventListener('click', onDocClick);
            done();
          });

          fireEvent($('.diff-domain'), 'click');
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

        it('should handle trailing slashes in path', function(done) {
          page('/no-trailing', function() {
            expect(page.strict()).to.equal(false);
            done();
          });
          page('/no-trailing/', function() {
            expect(page.strict()).to.equal(true);
            done();
          });
          page('/no-trailing/');
        });

        it('should handle trailing slashes in route', function(done) {
          page('/trailing/', function() {
            expect(page.strict()).to.equal(false);
            done();
          });
          page('/trailing', function() {
            expect(page.strict()).to.equal(true);
            done();
          });
          page('/trailing');
        });

        it('should populate ctx.params', function(done) {
          page('/blog/post/:name', function(ctx) {
            expect(ctx.params.name).to.equal('something');
            done();
          });

          page('/blog/post/something');
        });

        it('should not include hash in ctx.pathname', function(done){
          page('/contact', function(ctx){
            expect(ctx.pathname).to.equal('/contact');
            done();
          });

          page(hashbang ? '/contact' : '/contact#bang');
        });

        describe('when next() is invoked', function() {
          it('should invoke subsequent matching middleware', function(done) {

            var visistedFirst = false;
            page('/forum/*', function(ctx, next) {
              visistedFirst = true;
              next();
            });

            page('/forum/:fid/thread/:tid', function(ctx) {
              expect(visistedFirst).to.equal(true);
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
      called = false;
      page.stop();
      page.base('');
      page.strict(false);
      //page('/');
      base = '';
      baseRoute = Function.prototype; // noop
      setbase = true;
      document.body.removeChild(frame);
    };

  describe('Html5 history navigation', function() {

    before(function(done) {
      beforeTests(null, done);
    });

    tests();

    it('Should dispatch when going to a hash on same path', function(done){
      var cnt = 0;
      page('/query', function(){
        cnt++;
        if(cnt === 2) {
          done();
        }
      });

      fireEvent($('.query'), 'click');
      fireEvent($('.query-hash'), 'click');
    });

    after(function() {
      afterTests();
    });

  });

  describe('Hashbang option enabled', function() {

    before(function(done) {
      hashbang = true;
      beforeTests({
        hashbang: hashbang
      }, done);
    });

    tests();

    it('Using hashbang, url\'s pathname not included in path', function(done){
      page.stop();
      baseRoute = function(ctx){
        expect(ctx.path).to.equal('/');
        done();
      };
      page({ hashbang: true, window: frame.contentWindow });
    });

    after(function() {
      hashbang = false;
      afterTests();
    });

  });

  describe('Different Base', function() {

    before(function(done) {
      base = '/newBase';
      page.base(base);
      beforeTests(null, done);
    });

    tests();

    after(function() {
      afterTests();
    });

  });

  describe('URL path component decoding disabled', function() {
    before(function(done) {
      decodeURLComponents = false;
      beforeTests({
        decodeURLComponents: decodeURLComponents
      }, done);
    });

    tests();

    after(function() {
      afterTests();
    });
  });

  describe('Strict path matching enabled', function() {
    before(function(done) {
      page.strict(true);
      beforeTests(null, done);
    });

    tests();

    after(function() {
      afterTests();
    });
  });

  var describei = jsdomSupport ? describe : describe.skip;

  describei('File protocol', function() {
    before(function(done){
      jsdomSupport.setup({
        url: 'file:///var/html/index.html'
      }, Function.prototype);

      setbase = false;
      hashbang = true;
      beforeTests({
        hashbang: hashbang
      }, done);
    });

    after(function(){
      hashbang = false;
    });

    it('test', function(){
      page('/about', function(ctx){
        expect(ctx.path).to.equal('/about');
      });
      page('/about');
    });
  });

}).call(this);
