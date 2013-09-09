
1.3.7 / 2013-09-09 
==================

 * fix removal of fragment

1.3.6 / 2013-03-12 
==================

  * fix links with target attribute

1.3.5 / 2013-02-12 
==================

  * fix ctrl/cmd/shift clicks 

1.3.4 / 2013-02-04 
==================

  * add tmp .show() dispatch argument
  * add keywords to component.json

1.3.3 / 2012-12-14 
==================

  * remove + support from path regexps

1.3.2 / 2012-11-26 
==================

  * add explicit "#" check
  * add `window` to `addEventListener` calls

1.3.1 / 2012-09-21 
==================

  * fix: onclick only when e.which == 1

1.3.0 / 2012-08-29 
==================

  * add `page(fn)` support. Closes #27
  * add component.json
  * fix tests
  * fix examples

1.2.1 / 2012-08-02 
==================

  * add transitions example
  * add exposing of `Context` and `Route` constructors
  * fix infinite loop issue unhandled paths containing query-strings

1.2.0 / 2012-07-05 
==================

  * add `ctx.pathname`
  * add `ctx.querystring`
  * add support for passing a query-string through the dispatcher [ovaillancourt]
  * add `.defaultPrevented` support, ignoring page.js handling [ovaillancourt]

1.1.3 / 2012-06-18 
==================

  * Added some basic client-side tests
  * Fixed initial dispatch in Firefox
  * Changed: no-op on subsequent `page()` calls. Closes #16

1.1.2 / 2012-06-13 
==================

  * Fixed origin portno bug preventing :80 and :443 from working properly
  * Fixed: prevent cyclic refreshes. Closes #17

1.1.1 / 2012-06-11 
==================

  * Added enterprisejs example
  * Added: join base for `.canonicalPath`. Closes #12
  * Fixed `location.origin` usage [fisch42]
  * Fixed `pushState()` when unhandled

1.1.0 / 2012-06-06 
==================

  * Added `+` support to pathtoRegexp()
  * Added `page.base(path)` support
  * Added dispatch option to `page()`. Closes #10
  * Added `Context#originalPath`
  * Fixed unhandled links when .base is present. Closes #11
  * Fixed: `Context#path` to "/"

0.0.2 / 2012-06-05 
==================

  * Added `make clean`
  * Added some mocha tests
  * Fixed: ignore fragments
  * Fixed: do not pushState on initial load
