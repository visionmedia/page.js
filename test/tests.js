var isNode = false;

if (isNode = typeof window !== 'object') {
  require('./support/jsdom');

  before(function () {

    global.chai = require('chai');
    global.expect = chai.expect;
    global.page = process.env.PAGE_COV
      ? require('../index-cov')
      : require('../index');
    global.simulant = require('simulant');
  });

} else {
  expect = chai.expect;

}

var called = false,
    htmlWrapper,
    html = '',
    beforeTests = function(options) {
      page.callbacks = [];
      options = options || {};
      page('/', function(){
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
    tests = function () {
      describe('on page load', function(){
        it('should invoke the matching callback', function(){
          expect(called).to.equal(true);
        });
      });

      describe('on redirect', function () {
        it('should load destination page', function (done) {
          page.redirect('/from', '/to');
          page('/to', function () {
            done();
          });
          page('/from');
        });
        it('should work with short alias', function(done) {
          page('/one', '/two');
          page('/two', function () {
            done();
          });
          page('/two');
        });
      });

      describe('ctx.querystring', function(){
        it('should default to ""', function(done){
          page('/querystring-default', function(ctx){
            expect(ctx.querystring).to.equal('');
            done();
          });

          page('/querystring-default');
        });

        it('should expose the query string', function(done){
          page('/querystring', function(ctx){
            expect(ctx.querystring).to.equal('hello=there');
            done();
          });

          page('/querystring?hello=there');
        });
      });

      describe('ctx.pathname', function(){
        it('should default to ctx.path', function(done){
          page('/pathname-default', function(ctx){
            expect(ctx.pathname).to.equal('/pathname-default');
            done();
          });

          page('/pathname-default');
        });

        it('should omit the query string', function(done){
          page('/pathname', function(ctx){
            expect(ctx.pathname).to.equal('/pathname');
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

      describe('dispatcher', function(){
        it('should ignore query strings', function(done){
          page('/qs', function(ctx){
            done();
          });

          page('/qs?test=true');
        });

        it('should ignore query strings with params', function(done){
          page('/qs/:name', function(ctx){
            expect(ctx.params.name).to.equal('tobi');
            done();
          });

          page('/qs/tobi?test=true');
        });

        it('should invoke the matching callback', function(done){
          page('/user/:name', function(ctx){
            done();
          });

          page('/user/tj');
        });

        it('should populate ctx.params', function(done){
          page('/blog/post/:name', function(ctx){
            expect(ctx.params.name).to.equal('something');
            done();
          });

          page('/blog/post/something');
        });

        describe('when next() is invoked', function(){
          it('should invoke subsequent matching middleware', function(done){
            page('/forum/*', function(ctx, next){
              ctx.fullPath = ctx.params[0];
              next();
            });

            page('/user', function(){

            });

            page('/forum/:fid/thread/:tid', function(ctx){
              // expect(ctx.fullPath).to.equal('1/thread/2');
              expect(ctx.params.tid).to.equal('2');
              done();
            });

            page('/forum/1/thread/2');
          });
        });

        describe('not found', function(){
          it('should invoke the trigger the not found callback', function(done){
            page(function(){
              done();
            });
            page('/whathever');
          });
        });

        if (!isNode) {

        }

      });
    },
    afterTests = function() {
      if (!isNode) {
        document.body.removeChild(htmlWrapper);
      }
      called = false;
      page.stop();
      page('/');
    };

describe('Html5 history navigation', function(){

  before(function(){
    beforeTests();
  });

  tests();

  after(function(){
    afterTests();
  });

});

describe('Hashbang option enabled', function(){

  before(function(){
    beforeTests({
      hashbang:true
    });
  });

  tests();

  after(function(){
    afterTests();
  });

});
