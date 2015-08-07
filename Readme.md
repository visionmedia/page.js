 ![page router logo](http://f.cl.ly/items/3i3n001d0s1Q031r2q1P/page.png)

Tiny Express-inspired client-side router.

 [![Build Status](https://travis-ci.org/visionmedia/page.js.svg?branch=master)](https://travis-ci.org/visionmedia/page.js)
[![Coverage Status](https://coveralls.io/repos/visionmedia/page.js/badge.png?branch=master)](https://coveralls.io/r/visionmedia/page.js?branch=master)
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/visionmedia/page.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

```js
page('/', index)
page('/user/:user', show)
page('/user/:user/edit', edit)
page('/user/:user/album', album)
page('/user/:user/album/sort', sort)
page('*', notfound)
page()
```

## Installation

  There are multiple ways to install `page.js`.
  With package managers:

  ```bash
  $ npm install page # for browserify
  $ component install visionmedia/page.js
  $ bower install visionmedia/page.js
  ```

## Running examples

  To run examples do the following to install dev dependencies and run the example server:

    $ git clone git://github.com/visionmedia/page.js
    $ cd page.js
    $ npm install
    $ node examples
    $ open http://localhost:4000

 Currently we have examples for:

   - `basic` minimal application showing basic routing
   - `notfound` similar to `basic` with single-page 404 support
   - `album` showing pagination and external links
   - `profile` simple user profiles
   - `query-string` shows how you can integrate plugins using the router
   - `state` illustrates how the history state may be used to cache data
   - `server` illustrates how to use the dispatch option to server initial content
   - `chrome` Google Chrome style administration interface
   - `transitions` Shows off a simple technique for adding transitions between "pages"
   - `partials` using hogan.js to render mustache partials client side

  __NOTE__: keep in mind these examples do not use jQuery or similar, so
  portions of the examples may be relatively verbose, though they're not
  directly related to page.js in any way.

## API

### page(path, callback[, callback ...])

  Defines a route mapping `path` to the given `callback(s)`.
  Each callback is invoked with two arguments, [context](#context) and `next`. Much like Express invoking next will call the next registered callback with the given path.

```js
page('/', user.list)
page('/user/:id', user.load, user.show)
page('/user/:id/edit', user.load, user.edit)
page('*', notfound)
```

  Under certain conditions, links will be disregarded
  and will not be dispatched, such as:

  - Links that are not of the same origin
  - Links with the `download` attribute
  - Links with the `target` attribute
  - Links with the `rel="external"` attribute

### page(callback)

  This is equivalent to `page('*', callback)` for generic "middleware".

### page(path)

  Navigate to the given `path`.

```js
$('.view').click(function(e){
  page('/user/12')
  e.preventDefault()
})
```

### page(fromPath, toPath)

  Setup redirect from one path to another.

### page.redirect(fromPath, toPath)

  Identical to `page(fromPath, toPath)`

### page.redirect(path)
  Calling page.redirect with only a string as the first parameter
  redirects to another route.
  Waits for the current route to push state and after replaces it
  with the new one leaving the browser history clean.

```js
page('/default', function(){
  // some logic to decide which route to redirect to
  if(admin) {
    page.redirect('/admin');
  } else {
    page.redirect('/guest');
  }
});

page('/default');
```

### page.show(path)

  Identical to `page(path)` above.

### page([options])

  Register page's `popstate` / `click` bindings. If you're
  doing selective binding you'll like want to pass `{ click: false }`
  to specify this yourself. The following options are available:

  - `click` bind to click events [__true__]
  - `popstate` bind to popstate [__true__]
  - `dispatch` perform initial dispatch [__true__]
  - `hashbang` add `#!` before urls [__false__]
  - `decodeURLComponents` remove URL encoding from path components (query string, pathname, hash) [__true__]

  If you wish to load serve initial content
  from the server you likely will want to
  set `dispatch` to __false__.

### page.start([options])

  Identical to `page([options])` above.

### page.stop()

  Unbind both the `popstate` and `click` handlers.

### page.base([path])

  Get or set the base `path`. For example if page.js
  is operating within `/blog/*` set the base path to "/blog".

### page.exit(path, callback[, callback ...])

  Defines an exit route mapping `path` to the given `callback(s)`.

  Exit routes are called when a page changes, using the context
  from the previous change. For example:

```js
page('/sidebar', function(ctx, next) {
  sidebar.open = true
  next()
})

page.exit('/sidebar', function(ctx, next) {
  sidebar.open = false
  next()
})
```

### page.exit(callback)

Equivalent to `page.exit('*', callback)`.

### Context

  Routes are passed `Context` objects, these may
  be used to share state, for example `ctx.user =`,
  as well as the history "state" `ctx.state` that
  the `pushState` API provides.

#### Context#save()

  Saves the context using `replaceState()`. For example
  this is useful for caching HTML or other resources
  that were loaded for when a user presses "back".

#### Context#handled

  If `true`, marks the context as handled to prevent [default 404 behaviour][404].
  For example this is useful for the routes with interminate quantity of the
  callbacks.

[404]: https://github.com/visionmedia/page.js#default-404-behaviour

#### Context#canonicalPath

  Pathname including the "base" (if any) and query string "/admin/login?foo=bar".

#### Context#path

  Pathname and query string "/login?foo=bar".

#### Context#querystring

  Query string void of leading `?` such as "foo=bar", defaults to "".

#### Context#pathname

  The pathname void of query string "/login".

#### Context#state

  The `pushState` state object.

#### Context#title

  The `pushState` title.

## Routing

  The router uses the same string-to-regexp conversion
  that Express does, so things like ":id", ":id?", and "*" work
  as you might expect.

  Another aspect that is much like Express is the ability to
  pass multiple callbacks. You can use this to your advantage
  to flatten nested callbacks, or simply to abstract components.

### Separating concerns

  For example suppose you have a route to _edit_ users, and a
  route to _view_ users. In both cases you need to load the user.
  One way to achieve this is with several callbacks as shown here:

```js
page('/user/:user', load, show)
page('/user/:user/edit', load, edit)
```

  Using the `*` character we can alter this to match all
  routes prefixed with "/user" to achieve the same result:

```js
page('/user/*', load)
page('/user/:user', show)
page('/user/:user/edit', edit)
```

  Likewise `*` can be used as catch-alls after all routes
  acting as a 404 handler, before all routes, in-between and
  so on. For example:

```js
page('/user/:user', load, show)
page('*', function(){
  $('body').text('Not found!')
})
```

### Default 404 behaviour

  By default when a route is not matched,
  page.js invokes `page.stop()` to unbind
  itself, and proceed with redirecting to the
  location requested. This means you may use
  page.js with a multi-page application _without_
  explicitly binding to certain links.

### Working with parameters and contexts

  Much like `request` and `response` objects are
  passed around in Express, page.js has a single
  "Context" object. Using the previous examples
  of `load` and `show` for a user, we can assign
  arbitrary properties to `ctx` to maintain state
  between callbacks.

  To build a `load` function that will load
  the user for subsequent routes you'll need to
  access the ":id" passed. You can do this with
  `ctx.params.NAME` much like Express:

```js
function load(ctx, next){
  var id = ctx.params.id
}
```

  Then perform some kind of action against the server,
  assigning the user to `ctx.user` for other routes to
  utilize. `next()` is then invoked to pass control to
  the following matching route in sequence, if any.

```js
function load(ctx, next){
  var id = ctx.params.id
  $.getJSON('/user/' + id + '.json', function(user){
    ctx.user = user
    next()
  })
}
```

  The "show" function might look something like this,
  however you may render templates or do anything you
  want. Note that here `next()` is _not_ invoked, because
  this is considered the "end point", and no routes
  will be matched until another link is clicked or
  `page(path)` is called.

```js
function show(ctx){
  $('body')
    .empty()
    .append('<h1>' + ctx.user.name + '<h1>');
}
```

  Finally using them like so:

```js
page('/user/:id', load, show)
```

### Working with state

  When working with the `pushState` API,
  and page.js you may optionally provide
  state objects available when the user navigates
  the history.

  For example if you had a photo application
  and you performed a relatively expensive
  search to populate a list of images,
  normally when a user clicks "back" in
  the browser the route would be invoked
  and the query would be made yet-again.

  An example implemenation might look as follows:

```js
function show(ctx){
  $.getJSON('/photos', function(images){
    displayImages(images)
  })
}
```

   You may utilize the history's state
   object to cache this result, or any
   other values you wish. This makes it
   possible to completely omit the query
   when a user presses back, providing
   a much nicer experience.

```js
function show(ctx){
  if (ctx.state.images) {
    displayImages(ctx.state.images)
  } else {
    $.getJSON('/photos', function(images){
      ctx.state.images = images
      ctx.save()
      displayImages(images)
    })
  }
}
```

  __NOTE__: `ctx.save()` must be used
  if the state changes _after_ the first
  tick (xhr, setTimeout, etc), otherwise
  it is optional and the state will be
  saved after dispatching.

### Matching paths

  Here are some examples of what's possible
  with the string to `RegExp` conversion.

  Match an explicit path:

```js
page('/about', callback)
```

  Match with required parameter accessed via `ctx.params.name`:

```js
page('/user/:name', callback)
```

  Match with several params, for example `/user/tj/edit` or
  `/user/tj/view`.

```js
page('/user/:name/:operation', callback)
```

  Match with one optional and one required, now `/user/tj`
  will match the same route as `/user/tj/show` etc:

```js
page('/user/:name/:operation?', callback)
```

  Use the wildcard char `*` to match across segments,
  available via `ctx.params[N]` where __N__ is the
  index of `*` since you may use several. For example
  the following will match `/user/12/edit`, `/user/12/albums/2/admin`
  and so on.

```js
page('/user/*', loadUser)
```

  Named wildcard accessed, for example `/file/javascripts/jquery.js`
  would provide "/javascripts/jquery.js" as `ctx.params.file`:

```js
page('/file/:file(*)', loadUser)
```

  And of course `RegExp` literals, where the capture
  groups are available via `ctx.params[N]` where __N__
  is the index of the capture group.

```js
page(/^\/commits\/(\d+)\.\.(\d+)/, loadUser)
```

## Plugins

  An example plugin _examples/query-string/query.js_
  demonstrates how to make plugins. It will provide a parsed `ctx.query` object
  derived from [node-querystring](https://github.com/visionmedia/node-querystring).

  Usage by using "*" to match any path
  in order to parse the query-string:

```js
page('*', parse)
page('/', show)
page()

function parse(ctx, next) {
  ctx.query = qs.parse(location.search.slice(1));
  next();
}

function show(ctx) {
  if (Object.keys(ctx.query).length) {
    document
      .querySelector('pre')
      .textContent = JSON.stringify(ctx.query, null, 2);
  }
}
```

### Available plugins

- [querystring](https://github.com/visionmedia/page.js/blob/master/examples/query-string/query.js): provides a parsed `ctx.query` object derived from [node-querystring](https://github.com/visionmedia/node-querystring).
- [body-parser](https://github.com/kethinov/page.js-body-parser.js): provides a `req.body` object for routes derived from [body-parser](https://github.com/expressjs/body-parser).
- [express-mapper](https://github.com/kethinov/page.js-express-mapper.js): provides a direct imitation of the [Express](http://expressjs.com/) API so you can share controller code on the client and the server with your Express application without modification.

Please submit pull requests to add more to this list.

### Running tests

In the console:

```
$ npm install
$ npm test
```

In the browser:

```
$ npm install
$ npm run serve
$ open http://localhost:3000/
```

### Support in IE8+

If you want the router to work in older version of Internet Explorer that don't support pushState, you can use the [HTML5-History-API](https://github.com/devote/HTML5-History-API) polyfill:
```bash
  npm install html5-history-api
```

##### How to use a Polyfill together with router (OPTIONAL):
If your web app is located within a nested basepath, you will need to specify the `basepath` for the HTML5-History-API polyfill.
Before calling `page.base()` use: `history.redirect([prefixType], [basepath])` - Translation link if required.
  * `prefixType`: `[string|null]` - Substitute the string after the anchor (#) by default "/".
  * `basepath`: `[string|null]` - Set the base path. See `page.base()` by default "/". (Note: Slash after `pathname` required)

### Pull Requests

  * Break commits into a single objective.
  * An objective should be a chunk of code that is related but requires explaination.
  * Commits should be in the form of what-it-is: how-it-does-it and or why-it's-needed or what-it-is for trivial changes
  * Pull requests and commits should be a guide to the code.

## License

(The MIT License)

Copyright (c) 2012 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
