
 ![page router logo](http://f.cl.ly/items/3i3n001d0s1Q031r2q1P/page.png)

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