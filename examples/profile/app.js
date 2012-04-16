
var avatars = {
  glottis: 'http://homepage.ntlworld.com/stureek/images/glottis03.jpg',
  manny: 'http://kprojekt.net/wp-content/uploads/manny.jpg',
  sal: 'http://homepage.ntlworld.com/stureek/images/sal01.jpg'
};

page('/', index);
// display the index page again after 5s
// only for user related pages
page('/user/*', displayIndexAfter(5000));
// you dont need to use two,
// but this demonstrates how
// you can "filter" requests
// then move on to the next callback
// to separate concerns
page('/user/:name', load);
page('/user/:name', show);
// or:
// page('/user/:name', load, show);
page('*', notfound);
page();

// everything below is not part of page.js
// just callbacks etc..

document.querySelector('#cycle').onclick = function(){
  var i = 0;
  var names = Object.keys(avatars);
  setInterval(function(){
    var name = names[i++ % names.length];
    page('/user/' + name);
  }, 1500);
};

function text(str) {
  document.querySelector('p').textContent = str;
}

function displayIndexAfter(ms) {
  var id;
  return function(e, next){
    id && clearTimeout(id);

    if ('/' != e.path) {
      id = setTimeout(function(){
        page('/');
      }, ms);
    }
    next();
  }
}

function index() {
  text('Click a user below to load their avatar');
  document.querySelector('img')
    .style.display = 'none';
}

function load(e, next) {
  e.avatar = avatars[e.params.name];
  next();
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