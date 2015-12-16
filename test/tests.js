/* globals before, after, chai, expect, page, describe, it */
(function() {

  'use strict';

  var isNode = typeof window !== 'object',
    global = this,
    called = false,
    html = '',
    base = '',
    hashbang = false,
    decodeURLComponents = true,
    chai = this.chai,
    expect = this.expect,
    page = this.page,
    baseTag,
    htmlWrapper,
    $;

  if (isNode) {
    require('./support/jsdom');
  }

  before(function() {

    if (isNode) {
      chai = require('chai');
      expect = chai.expect;
      page = process.env.PAGE_COV ? require('../index-cov') : require('../index');
    } else {
      expect = chai.expect;
    }

    $ = document.querySelector.bind(document);

  });

  var fireEvent = function(node, eventName) {

      var event = document.createEvent('MouseEvents');

      // https://developer.mozilla.org/en-US/docs/Web/API/event.initMouseEvent
      event.initEvent(
        eventName, true, true, this, 0,
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
        $('head').appendChild(baseTag);
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

      describe('page.back', function() {
        before(function() {
          page('/first', function() {});
          page('/second', function() {});
          page('/first');
          page('/second');
        });
        it('should move back to history', function() {
          page.back('/first');
          var path = hashbang
            ? location.hash.replace('#!', '')
            : location.pathname;
          expect(path).to.be.equal('/first');
        });
        it('should decrement page.len on back()', function() {
          var lenAtFirst = page.len;
          page('/second');
          page.back('/first');
          expect(page.len).to.be.equal(lenAtFirst);
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
          page('/ctxparams/test');
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

  describe('URL path component decoding disabled', function() {
    before(function() {
      decodeURLComponents = false;
      beforeTests({
        decodeURLComponents: decodeURLComponents
      });
    });

    tests();

    after(function() {
      afterTests();
    });
  });

}).call(this);
