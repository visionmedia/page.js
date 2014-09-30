/* global page */
var avatars = {
  glottis: 'http://homepage.ntlworld.com/stureek/images/glottis03.jpg',
  manny: 'http://kprojekt.net/wp-content/uploads/manny.jpg',
  sal: 'http://homepage.ntlworld.com/stureek/images/sal01.jpg'
};

page('/', function () {
    page.replace('/client/123');
});

page('/client/:id', function(ctx) {
  console.log(ctx.params.id);
})
page();
