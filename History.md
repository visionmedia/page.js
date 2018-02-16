1.8.3 / 2018-01-22
==================

This is a patch release which switches the build to rollup. Switching shaves 2k off of the gzipped size. In addition to this benefit, this also fixes a couple of small issues:

## Issues

* [#444] - Closure compiler warnings
* [#458] - unsafe-eval error

[#444]: https://github.com/visionmedia/page.js/issues/444
[#458]: https://github.com/visionmedia/page.js/issues/458

1.8.2 / 2018-01-22
==================

This is a patch release fixing an issue that was meant to be solved in 1.8.1. page.js now runs in Node.js again, when there isn't a window environment.

1.8.1 / 2018-01-22
==================

This is a patch release, fixing an issue with Node.js usage.

1.8.0 / 2018-01-17
==================

This is a minor release, adding one new (minor) feature and a few bug fixes and documentation improvements.

## Controlling other pages

The new feature of this release is that page.js can now control other pages (windows) besides the main window. This makes it possible to control an iframe's routing. You can use it by passing the window option to start:

    page('/', function(){
      // Whoa, I'm inside an iframe!
    });

page.start({ window: myiFrame.contentWindow });

Note that page is still a singleton, which means you can only have 1 page, so you can't control both an iframe and the main window at the same time.

This change was made to improve our testing, but in the future we'll make it possible to have multiple page objects so you really will be able to control multiple iframes and the main window all at the same time.

## Better hashbang support

Hashbang support has never been very good in page.js. But we're slowly improving it! In 1.8.0 we've fixed the problem where the app's full URL would show up in the hashbang upon start. http://example.com/my/page#!/my/page. Gross! No longer happens thanks to #447.

## Pull Requests

Those are the big things, but here's a list of all of the pull requests merged into 1.8.0:

* [#445] - Prevent hash from being part of the ctx.pathname
* [#447] - Prevent going to the root when setting up the initial hashchange route
* [#446] - Add a note about usage with a CDN
* [#443] - Change test infrastructure to run inside of iframes
* [#303] - page.exit callback example missing context param
* [#267] - Added clarification for decoded plus signs in urls

[#445]: https://github.com/visionmedia/page.js/pull/4445
[#447]: https://github.com/visionmedia/page.js/pull/4447
[#446]: https://github.com/visionmedia/page.js/pull/4446
[#443]: https://github.com/visionmedia/page.js/pull/4443
[#303]: https://github.com/visionmedia/page.js/pull/4303
[#267]: https://github.com/visionmedia/page.js/pull/4267

1.7.3 / 2018-01-15
==================

This is a patch release making an improvement to how page.js works on pages that use the file protocol, such as Electron and nw.js apps.

## Pull Requests

* [#441] - Set the page's base to be the current location when used under the file protocol with hashbang routing.

[#441]: https://github.com/visionmedia/page.js/pull/441

1.7.2 / 2018-01-15
==================

Our first release in almost 2 years! This is a long overdue patch release that contains various bug fixes that have taken place over the course of the last couple of years. As releases will become much more often in the future (containing only a few fixes in most cases), I will be listing the closed issues in releases, but because there are 2 years worth it is not practical to do so in this release.

While you're here, if you haven't checked out page.js in a long time now is a great time. I've recently taken over maintenance and have a plan in place to take this great small library into the future. For now I am concentrating on stabilizing 1.x by fixing as many of the backlog of issues that have built up as I can. Once that is complete we'll start thinking about 2.0.

If you've submitted a PR here in the past and seen it be ignored, please come back! Your contributions are invaluable, and I promise that as long as I'm maintaining this project I'll do my best to always at least comment on pull requests and try to get them resolved.

That's all for now! Please report any issues you find in 1.7.2.

1.7.1 / 2016-03-17
==================

* [#363] - Reinstate shadow DOM fixes which were reverted

[#363]: https://github.com/visionmedia/page.js/issues/363

1.7.0 / 2016-03-12
==================

* [#284] - Use shadow dom when available ([@mwalid])
* [#329] - Add type annotations for full closure-compiler advanced optimization support ([@chadkillingsworth])
* [#328] - Include ctx in page.after example, fixes [#290]() ([@aaronshaf])

[#284]: https://github.com/visionmedia/page.js/issues/284
[#329]: https://github.com/visionmedia/page.js/issues/329
[#328]: https://github.com/visionmedia/page.js/issues/328
[#290]: https://github.com/visionmedia/page.js/issues/290
[@mwalid]: https://github.com/mwalid
[@chadkillingsworth]: https://github.com/chadkillingsworth
[@aaronshaf]: https://github.com/aaronshaf

1.6.4 / 2015-10-09
==================

* fix wildcard route support (update path-to-regexp to v1.2.1)

1.6.3 / 2015-04-19
==================

* fix including page.js on server side
* fix including page.js if the document is already loaded
* fix bug with click-event in Firefox

1.6.2 / 2015-03-06
==================

* fix touch support #236
* fix nw.js support #238
* fix popstate issue in Safari #213

1.6.1 / 2015-02-16
==================

* added `page.js` to npm files
* back button works correct with hash links in Firefox  #218

1.6.0./ 2015-01-27
==================

* added `page.back` feature #157
* added `decodeURLComponents` option #187
* now `ctx.params` is object like in express #203
* skip route processing if another one is called #172
* docs improved
* tests improved


1.5.0 / 2014-11-29
==================

* added page.exit(path, callback[, callback...])
* added page.redirect(url)
* fix: ignore links with `download` attribute
* fix: remove URL encoding before parsing paths

1.4.1 / 2014-11-14
==================

* fixed: hashbang navigation
* added hashbang example
* added tests

1.4.0 / 2014-11-12
==================

 * add hashbang support. Closes #112
 * add page.redirect() method
 * add plugins list to readme
 * add Context#handled option
 * Fix an issue where redirects in dispatch can be overwritten by ctx.save()
 * add support HTML5-History-API polyfill
 * make sameOrigin public
 * update path-to-regexp
 * allow for missing href in anchors.
 * update examples


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
