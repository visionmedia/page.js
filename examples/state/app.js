
var avatars = {
  glottis: 'http://homepage.ntlworld.com/stureek/images/glottis03.jpg',
  manny: 'http://kprojekt.net/wp-content/uploads/manny.jpg',
  sal: 'http://homepage.ntlworld.com/stureek/images/sal01.jpg'
};

page('/', index);
page('/user/:name', load, show);
page('*', notfound);
page();

// everything below is not part of page.js
// just callbacks etc..

function text(str) {
  document.querySelector('p').textContent = str;
}

function index() {
  text('Click a user below to load their avatar');
  document.querySelector('img')
    .style.display = 'none';
}

function load(e, next) {
  // check if we have .state.avatar already available
  // this could for example be a cached html fragment.
  if (e.state.avatar) {
    e.avatar = e.state.avatar;
    next();
    return;
  }

  // pretend we're querying some database etc
  setTimeout(function(){
    // you can assign properties to the context
    // for use between these functions. The .state
    // property is what's saved in history.
    e.state.avatar = e.avatar = avatars[e.params.name];
    e.save();
    next();
  }, 600);
}

function show(e) {
  var img = document.querySelector('img');
  img.src = e.avatar;
  img.style.display = 'block';
  text('Showing ' + e.params.name);
}

function notfound() {
  document.querySelector('p')
    .textContent = 'not found';
}