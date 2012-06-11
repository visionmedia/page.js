
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
