
page('*', init.ctx);
page('/partials/home', route.home);
page('/partials/portfolio', route.portfolio);
page('/partials/about', route.about);
page('/partials/test', route.test);
page('/partials/examples', route.examples);
page('*', render.content);
page();
