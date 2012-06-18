
var expect = chai.expect;
var called = 0; // set to numeric to make sure call count is just 1

// XXX: super lame hack

page('/', function(){
  called++;
})

describe('page', function(){
  describe('on page load', function(){
    it('should invoke the matching callback', function(){
      expect(called).to.equal(1);
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