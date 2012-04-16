
page('*', parse)
page('/', show)
page()

function parse(e, next) {
  e.query = qs.parse(location.search.slice(1));
  next();
}

function show(e) {
  if (Object.keys(e.query).length) {
    document
      .querySelector('pre')
      .textContent = JSON.stringify(e.query, null, 2);
  }
}