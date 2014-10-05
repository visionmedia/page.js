var perPage = 6
  , prev = document.querySelector('#prev')
  , next = document.querySelector('#next');

page.base('/album');
page('/', '/photos/0');
page('/photos/:page', photos)
page('*', notfound);
page();

function photos(ctx) {
  var page = ~~ctx.params.page;
  var from = page * perPage;
  var to = from + perPage;
  console.log('showing page %s : %s..%s', page, from, to);
  var photos = images.slice(from, to);
  display(photos);
  adjustPager(page);
}

function notfound() {
  document.querySelector('p')
    .textContent = 'not found';
}

function display(photos) {
  var el = document.querySelector('#photos');
  el.innerHTML = '';
  photos.forEach(function(photo){
    var img = document.createElement('img');
    img.src = photo;
    el.appendChild(img);
  });
}

function adjustPager(page) {
  if (page) {
    prev.style.display = 'inline-block';
    prev.setAttribute('href', '/album/photos/' + (page - 1));
  } else {
    prev.style.display = 'none';
  }

  next.setAttribute('href', '/album/photos/' + (page + 1));
}

var images = [
    'http://upload.wikimedia.org/wikipedia/en/7/76/Grim_Fandango_artwork.jpg'
  , 'http://www.xblafans.com/wp-content/uploads//2011/08/Grim-Fandango1.jpg'
  , 'http://media.giantbomb.com/uploads/0/1371/190604-grimfandango106_super.jpg'
  , 'http://gamejunkienz.files.wordpress.com/2012/02/grimfandango.jpg'
  , 'http://onlyhdwallpapers.com/wallpaper/video_games_grim_fandango_lucas_arts_desktop_1024x768_wallpaper-305343.jpg'
  , 'http://lparchive.org/Grim-Fandango-(Screenshot)/Update%207/02176.gif'
  , 'http://bulk2.destructoid.com/ul/128679-GrimFandangoActionFigures.jpg'
  , 'http://www.gamasutra.com/features/20061103/grimfandango02.jpg'
  , 'http://metavideogame.files.wordpress.com/2011/05/grimhof_03_1081459316.jpg'
  , 'http://3.bp.blogspot.com/_zBnIHQUy4r4/SpxdDw1Z8tI/AAAAAAAABJM/FoCWfc8imnc/s400/GrimFandango1024x768.jpg'
  , 'http://www.deviantart.com/download/184571597/grim_fandango_by_domigorgon-d31w0ct.jpg'
  , 'http://vgboxart.com/boxes/PC/29535-grim-fandango.png?t=1243105773'
  , 'http://kastatic.com/i2/games/1/3/13230/10.png'
  , 'http://www.thunderboltgames.com/s/img600/grimfandango.jpg'
  , 'http://i2.listal.com/image/1425291/936full-grim-fandango-artwork.jpg'
  , 'http://www.xblafans.com/wp-content/uploads//2011/08/Grim-Fandango1.jpg'
  , 'http://media.giantbomb.com/uploads/0/1371/190604-grimfandango106_super.jpg'
  , 'http://gamejunkienz.files.wordpress.com/2012/02/grimfandango.jpg'
  , 'http://onlyhdwallpapers.com/wallpaper/video_games_grim_fandango_lucas_arts_desktop_1024x768_wallpaper-305343.jpg'
  , 'http://lparchive.org/Grim-Fandango-(Screenshot)/Update%207/02176.gif'
  , 'http://bulk2.destructoid.com/ul/128679-GrimFandangoActionFigures.jpg'
  , 'http://www.gamasutra.com/features/20061103/grimfandango02.jpg'
  , 'http://metavideogame.files.wordpress.com/2011/05/grimhof_03_1081459316.jpg'
  , 'http://3.bp.blogspot.com/_zBnIHQUy4r4/SpxdDw1Z8tI/AAAAAAAABJM/FoCWfc8imnc/s400/GrimFandango1024x768.jpg'
  , 'http://www.deviantart.com/download/184571597/grim_fandango_by_domigorgon-d31w0ct.jpg'
  , 'http://vgboxart.com/boxes/PC/29535-grim-fandango.png?t=1243105773'
  , 'http://kastatic.com/i2/games/1/3/13230/10.png'
  , 'http://www.thunderboltgames.com/s/img600/grimfandango.jpg'
  , 'http://i2.listal.com/image/1425291/936full-grim-fandango-artwork.jpg'
  , 'http://www.xblafans.com/wp-content/uploads//2011/08/Grim-Fandango1.jpg'
  , 'http://media.giantbomb.com/uploads/0/1371/190604-grimfandango106_super.jpg'
  , 'http://gamejunkienz.files.wordpress.com/2012/02/grimfandango.jpg'
  , 'http://onlyhdwallpapers.com/wallpaper/video_games_grim_fandango_lucas_arts_desktop_1024x768_wallpaper-305343.jpg'
  , 'http://lparchive.org/Grim-Fandango-(Screenshot)/Update%207/02176.gif'
  , 'http://bulk2.destructoid.com/ul/128679-GrimFandangoActionFigures.jpg'
  , 'http://www.gamasutra.com/features/20061103/grimfandango02.jpg'
  , 'http://metavideogame.files.wordpress.com/2011/05/grimhof_03_1081459316.jpg'
  , 'http://3.bp.blogspot.com/_zBnIHQUy4r4/SpxdDw1Z8tI/AAAAAAAABJM/FoCWfc8imnc/s400/GrimFandango1024x768.jpg'
  , 'http://www.deviantart.com/download/184571597/grim_fandango_by_domigorgon-d31w0ct.jpg'
  , 'http://vgboxart.com/boxes/PC/29535-grim-fandango.png?t=1243105773'
  , 'http://kastatic.com/i2/games/1/3/13230/10.png'
  , 'http://www.thunderboltgames.com/s/img600/grimfandango.jpg'
  , 'http://i2.listal.com/image/1425291/936full-grim-fandango-artwork.jpg'
];
