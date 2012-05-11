
var page = require('../lib/page');

// stubs

document = {};

history = {
  pushState: function(state, title, path){
    this.calls.push({
      type: 'push',
      state: state,
      title: title,
      path: path
    });
  },

  replaceState: function(state, title, path){
    this.calls.push({
      type: 'replace',
      state: state,
      title: title,
      path: path
    });
  }
};

describe('page(path, callback)', function(){
  beforeEach(function(){
    history.calls = [];
    page.callbacks = [];
  })

  it('should define a route', function(){
    page('/', index);
    page('/user/:id', user);

    function index(ctx) {
      ctx.path.should.equal('/');
      ctx.state.path.should.equal('/');
      ctx.params.should.eql([]);
    }

    function user(ctx) {
      ctx.path.should.equal('/user/12');
      ctx.state.path.should.equal('/user/12');
      ctx.params.id.should.equal('12');
    }

    page('/');
    page('/user/12');
    history.calls.should.have.length(2);
  })

  it('should pass control when next() is invoked', function(){

    function load(ctx, next) {
      ctx.user = { name: 'tj', id: ctx.params.id };
      next();
    }

    function show(ctx, next) {
      ctx.user.should.eql({ name: 'tj', id: '12' });
    }

    page('/user/:id', load);
    page('/user/:id', show);

    page('/user/12');
    history.calls.should.have.length(1);
  })

  it('should replace state when ctx.save() is invoked', function(){
    page('/', function(ctx){
      ctx.state.html = '<p>stuff</p>';
      ctx.save();
    })

    page('/');
    history.calls.should.have.length(2);
    history.calls[0].type.should.equal('replace');
  })
})