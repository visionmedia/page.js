
var expect = chai.expect;
mocha.setup({
  ui: 'bdd',
  globals: ['']
});

var site = null;
window.addEventListener('load', function (e) {
  site = document.getElementById('site');
  mocha.run();
});

describe('site', function () {
  function expected (index, idx, header) {
    expect(index).to.equal(idx);
    var h = site.contentDocument.querySelector('#content h1');
    expect(h.innerHTML).to.equal(header);
    var p = site.contentDocument.querySelector('#content p');
    expect(p.innerHTML).to.equal('page '+index);
  }
  
  it('should load home page', function (done) {
    site.contentWindow.done = function (index) {
      expected(index, 0, 'Home');
      done();
    }
    site.contentWindow.page('/partials/home');
  });
  it('should load portfolio page', function (done) {
    site.contentWindow.done = function (index) {
      expected(index, 1, 'Portfolio');
      done();
    }
    site.contentWindow.page('/partials/portfolio');
  });
  it('should load about page', function (done) {
    site.contentWindow.done = function (index) {
      expected(index, 2, 'About');
      done();
    }
    site.contentWindow.page('/partials/about');
  });

  after(function (done) {
    site.contentWindow.done = null;
    done();
  });
});
