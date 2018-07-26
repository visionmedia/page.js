import map from 'lodash.map'
import trim from 'lodash.trim'
import each from 'lodash.foreach'
import size from 'lodash.size'
import concat from 'lodash.concat'
import compact from 'lodash.compact'
import defaults from 'lodash.defaults'

import pagejs from './pagejs'
import {
  transitionRenderingMiddleware,
  transitionRoutingMiddlewares,
  createUrlParsingMiddleware
} from './middleware-factory'

class PageRouter {
  static init (routesTree, middlewares, renderer, config) {
    const router = new PageRouter(routesTree, middlewares, renderer, config)
    router.start()
  }

  constructor (routesTree, middlewares, renderer, config) {
    this._routesTree  = routesTree
    this._middlewares = middlewares
    this._renderer = renderer
    this._config = this.addDefaultConfig(config || {})
  }

  addDefaultConfig (config) {
    return defaults(
      config,
      {
        base: window.location.pathname + window.location.search,
        transition_duration: 1000
      }
    )
  }

  registerRoute (routeBranch) {
    const path = '/' +
      compact(
        map(
          routeBranch,
          pmap => trim(pmap.path, '/')
        )
      ).join('/')

    const args = concat(
      transitionRoutingMiddlewares(routeBranch),
      this._middlewares,
      transitionRenderingMiddleware(
        this._renderer,
        this._config.transition_duration
      )
    )
    args.unshift(path)
    PageRouter.page.apply(PageRouter.page, args)
  }

  registerRouteBranch (routeBranch, routemap) {
    routeBranch = [...routeBranch, routemap]
    if (size(routemap.children) > 0) {
      each(
        routemap.children,
        route => this.registerRouteBranch(routeBranch, route)
      )
    } else {
      this.registerRoute(routeBranch)
    }
  }

  start () {
    PageRouter.page('*', createUrlParsingMiddleware())

    each(
      this._routesTree,
      route => this.registerRouteBranch([], route)
    )

    PageRouter.page.base(this._config.base)
    PageRouter.page.start(this._config)
  }
}

PageRouter.page = pagejs

export default PageRouter
