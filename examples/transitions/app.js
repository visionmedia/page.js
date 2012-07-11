
// content

var content = document.querySelector('#content');

// current page indicator

var p = document.querySelector('#page');

// "mount" it

page.base('/transitions');

// transition "middleware"

page('*', function(ctx,  next){
  if (ctx.init) {
    next();
  } else {
    content.classList.add('transition');
    setTimeout(function(){
      content.classList.remove('transition');
      next();
    }, 300);
  }
})

// regular pages

page('/', function(){
  p.textContent = '';
});

page('/contact', function(){
  p.textContent = 'contact page';
});

page('/about', function(){
  p.textContent = 'about page';
});

page()