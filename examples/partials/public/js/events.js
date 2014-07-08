
$(function () {
  var navLinks = $('#navigation li');

  $('#navigation a').on('click', function (e) {	
    changeActive(navLinks.index(this));
  });

  window.changeActive = function (index) {
    navLinks.removeClass('active').eq(index).addClass('active');
  }
});
