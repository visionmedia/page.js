
 ![page router logo](http://f.cl.ly/items/3i3n001d0s1Q031r2q1P/page.png)

  The ~1200 byte Express inspired client-side router.

```js
page('/', index)
page('/user/:user', show)
page('/user/:user/edit', edit)
page('/user/:user/album', album)
page('/user/:user/album/sort', sort)
page('*', notfound)
page()
```

## Running examples

  To run examples do the following:

    $ npm install -g serve
    $ serve examples/profile
    $ open http://localhost:3000

 Currently we have examples for:
 
   - `basic` minimal application showing basic routing
   - `notfound` similar to `basic` with single-page 404 support
   - `album` showing pagination and external links
   - `profile` simple user profiles
   - `query-string` shows how you can integrate plugins using the router
   - `selective-binding` shows how you can bind to specific links only
   - `state` illustrates how the history state may be used to cache data

  __NOTE__: keep in mind these examples do not use jQuery or similar, so
  portions of the examples may be relatively verbose, though they're not
  directly related to page.js in any way.

## API

### page(path, callback)

  Defines a route mapping `path` to the given `callback`.

```js
page('/', user.list)
page('/user/:id', user.show)
page('/user/:id/edit', user.edit)
page('*', notfound)
```

### page(path)

  Navigate to the given `path`.

```js
$('.view').click(function(e){
  page('/user/12')
  e.preventDefault()
})
```

### page.show(path)

  Identical to `page(path)` above.

### page([options])

  Register page's `popstate` / `click` bindings. If you're
  doing selective binding you'll like want to pass `{ click: false }`
  to specify this yourself. The following options are available:

    - `click` bind to click events [__true__]
    - `popstate` bind to popstate [__true__]

### page.start([options])

  Identical to `page([options])` above.

### page.stop()

  Unbind both the `popstate` and `click` handlers.

  