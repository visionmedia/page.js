
var expect = chai.expect;
var called;

// XXX: super lame hack

page('/', function(){
  called = true;
})

describe('page', function(){
  describe('on page load', function(){
    it('should invoke the matching callback', function(){
      expect(called).to.equal(true);
    })
  })

  describe('when matching routes', function(){
    describe('when the path contains a query string', function(){
      it('should not consider the query string when matching', function(done){
        page('/qs', function(ctx){
          done();
        });

        page('/qs?test=true');
      })

      it('should not consider the query string when matching a route ending with a named param', function(done){
        page('/qs/:testParam', function(ctx){
          done();
        });

        page('/qs/test?test=true');
      })

      it('should not consider the query string when matching a route ending with a named wildcard param', function(done){
        page('/qs/named/wildcard/:testParam(*)', function(ctx){
          done();
        });

        page('/qs/named/wildcard/something/else?test=true');
      })

      it('should not consider the query string when matching a route ending with a wildcard', function(done){
        page('/qs/wildcard/end/*', function(ctx){
          done();
        });

        page('/qs/wildcard/end/with/something/here?test=true');
      });
    })
  })

  describe('when the route matches', function(){
    it('should invoke the callback', function(done){
      page('/user/:name', function(ctx){
        done();
      })

      page('/user/tj');
    })

    it('should populate ctx.params', function(done){
      page('/blog/post/:name', function(ctx){
        expect(ctx.params.name).to.equal('something');
        done();
      })

      page('/blog/post/something');
    })

    describe('when the match has a query string', function(){

      it('should not include the query string inside ctx.params for named param values', function(done){
        page('/query/string/:name', function(ctx){
          expect(ctx.params.name).to.equal('something');
          done();
        })

        page('/query/string/something?test=true');
      })

      it('should not include the query string inside ctx.params for named wildcard params', function(done){
        page('/query/string/wildcard/:name(*)', function(ctx){
          expect(ctx.params.name).to.equal('something');
          done();
        })

        page('/query/string/wildcard/something?test=true');
      })
    })

  })

  describe('when next() is called', function(){
    it('should invoke the next matching route', function(done){

      page('/forum/*', function(ctx, next){
        ctx.fullPath = ctx.params[0];
        next();
      });

      page('/user', function(){
        
      });

      page('/forum/:fid/thread/:tid', function(ctx){
        expect(ctx.fullPath).to.equal('1/thread/2');
        expect(ctx.params.tid).to.equal('2');
        done();
      });

      page('/forum/1/thread/2');
    })
  })
})

page();