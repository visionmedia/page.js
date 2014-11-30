var isNode = false;

if (isNode = typeof window !== 'object') {
  require('./support/jsdom');

  before(function() {

    global.chai = require('chai');
    global.expect = chai.expect;
    global.page = process.env.PAGE_COV ? require('../index-cov') : require('../index');
    global.simulant = require('simulant');
  });

} else {
  expect = chai.expect;

}

var called = false,
  htmlWrapper,
  html = '',
  base = '',
  hashbang = false,
  beforeTests = function(options) {
    page.callbacks = [];
    page.exits = [];
    options = options || {};
    page.base(base);
    page(base + '/', function() {
      called = true;
    });

    if (!isNode) {

      htmlWrapper = document.createElement('div');
      html += '<ul class="links">';
      html += '      <li><a href="./">/</a></li>';
      html += '      <li><a href="#whoop">#whoop</a></li>';
      html += '      <li><a href="./about">/about</a></li>';
      html += '      <li><a href="./contact">/contact</a></li>';
      html += '      <li><a href="./contact/me">/contact/me</a></li>';
      html += '      <li><a href="./not-found?foo=bar">/not-found</a></li>';
      html += '</ul>';

      htmlWrapper.innerHTML = html;
      document.body.appendChild(htmlWrapper);
    }


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
        page.redirect(base + '/from', base + '/to');
        page(base + '/to', function() {
          done();
        });
        page(base + '/from');
      });
      it('should work with short alias', function(done) {
        page(base + '/one', base + '/two');
        page(base + '/two', function() {
          done();
        });
        page(base + '/one');
      });
      it('should load done within redirect', function(done) {
        page(base + '/redirect', function(){
          page.redirect(base + '/done');
        });
        page(base + '/done', function() {
          done();
        });
        page(base + '/redirect');
      });
    });

    describe('on exit', function() {
      it('should run when exiting the page', function(done) {
        page(base + '/exit', function() {
          visited = true;
        });

        page.exit(base + '/exit', function() {
          expect(visited).to.equal(true);
          done();
        });

        page(base + '/exit');
        page('/');
      });

      it('should only run on matched routes', function(done) {
        page(base + '/should-exit', function(){});
        page(base + '/', function(){});

        page.exit(base + '/should-not-exit', function() {
          throw new Error('This exit route should not have been called');
        });

        page.exit(base + '/should-exit', function() {
          done();
        });

        page(base + '/should-exit');
        page(base + '/');
      });

      it('should use the previous context', function(done) {
        var unique;

        page(base + '/', function(){});
        page(base + '/bootstrap', function(ctx) {
          unique = ctx.unique = {};
        });

        page.exit(base + '/bootstrap', function(ctx) {
          expect(ctx.unique).to.equal(unique);
          done();
        })

        page(base + '/bootstrap');
        page(base + '/');
      });
    });

    describe('ctx.querystring', function() {
      it('should default to ""', function(done) {
        page(base + '/querystring-default', function(ctx) {
          expect(ctx.querystring).to.equal('');
          done();
        });

        page(base + '/querystring-default');
      });

      it('should expose the query string', function(done) {
        page(base + '/querystring', function(ctx) {
          expect(ctx.querystring).to.equal('hello=there');
          done();
        });

        page(base + '/querystring?hello=there');
      });
    });

    describe('ctx.pathname', function() {
      it('should default to ctx.path', function(done) {
        page(base + '/pathname-default', function(ctx) {
          expect(ctx.pathname).to.equal(base + (base && hashbang ? '#!' : '') + '/pathname-default');
          done();
        });

        page(base + '/pathname-default');
      });

      it('should omit the query string', function(done) {
        page(base + '/pathname', function(ctx) {
          expect(ctx.pathname).to.equal(base + (base && hashbang ? '#!' : '') + '/pathname');
          done();
        });

        page(base + '/pathname?hello=there');
      });
    });

    describe('ctx.handled', function() {
      it('should skip unhandled redirect if exists', function() {
        page(base +'/page/:page', function(ctx, next) {
          ctx.handled = true;
          next();
        });
        var ctx = page.show(base + '/page/1');
        expect(ctx.handled).to.be.ok;
      });
    });

    describe('dispatcher', function() {
      it('should ignore query strings', function(done) {
        page(base + '/qs', function(ctx) {
          done();
        });

        page(base + '/qs?test=true');
      });

      it('should ignore query strings with params', function(done) {
        page(base + '/qs/:name', function(ctx) {
          expect(ctx.params.name).to.equal('tobi');
          done();
        });

        page(base + '/qs/tobi?test=true');
      });

      it('should invoke the matching callback', function(done) {
        page(base + '/user/:name', function(ctx) {
          done();
        });

        page(base + '/user/tj');
      });

      it('should populate ctx.params', function(done) {
        page(base + '/blog/post/:name', function(ctx) {
          expect(ctx.params.name).to.equal('something');
          done();
        });

        page(base + '/blog/post/something');
      });

      describe('when next() is invoked', function() {
        it('should invoke subsequent matching middleware', function(done) {
          page(base + '/forum/*', function(ctx, next) {
            ctx.fullPath = ctx.params[0];
            next();
          });

          page(base + '/user', function() {

          });

          page(base + '/forum/:fid/thread/:tid', function(ctx) {
            // expect(ctx.fullPath).to.equal('1/thread/2');
            expect(ctx.params.tid).to.equal('2');
            done();
          });

          page(base + '/forum/1/thread/2');
        });
      });

      describe('not found', function() {
        it('should invoke the not found callback', function(done) {
          page(function() {
            done();
          });
          page(base + '/whathever');
        });
      });

    });
  },
  afterTests = function() {
    if (!isNode) {
      document.body.removeChild(htmlWrapper);
    }
    called = false;
    page.stop();
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
    hashbang = true
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
    beforeTests();
  });

  tests();

  after(function() {
    afterTests();
  });

});
