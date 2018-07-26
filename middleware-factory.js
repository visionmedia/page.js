import React from 'react'

import map from 'lodash.map'
import reverse from 'lodash.reverse'
import findIndex from 'lodash.findindex'
import last from 'lodash.last'
import qs from 'qs'

let prevNamesChain, elementsChain

function createRouteTransitionMiddleware (routingBranch) {
  const routemap = last(routingBranch)
    const names = map(routingBranch, 'name')
    return (context, next) => {
      if (names !== prevNamesChain) {
        context.namesChain = names
        context.prevNamesChain = prevNamesChain || false
        context.prevElementsChain = elementsChain || {}

        elementsChain = {}
        prevNamesChain = names
      }
      context.name = routemap.name
      next()
    }
}

export function transitionRoutingMiddlewares (routingBranch) {
  return [
    createRouteTransitionMiddleware(routingBranch),
    ...map(reverse(routingBranch), createRouteComponentTransitionMiddleware)
  ]
}

function createRouteComponentTransitionMiddleware (routemap) {
  return (context, next) => {
    elementsChain[routemap.name] = context.component

    const prevChain = createPrevComponent(context, routemap)
    const transitionChain = context.transition
      ? context.transition
      : context.component

    if (
      routemap.transition && prevChain ||
      context.transition
    ) {
      context.transition = React.createElement(
        routemap.component,
        null,
        React.createElement(
          'div',
          { className: 'transition-in' },
          transitionChain
        ),
        React.createElement(
          'div',
          { className: 'transition-out' },
          prevChain
        )
      )
    }

    context.component = React.createElement(
      routemap.component, null,
      context.component
    )

    next()
  }
}

export function createUrlParsingMiddleware () {
  return (context, next) => {
    const parsed = context.path.split('?')
    context.qpathname = context.pathname
    context.pathname = parsed[0]
    context.querystring = parsed[1] || ''
    context.query = qs.parse(context.querystring)

    const parsedloc = location.search.split('?')
    const querystringloc = parsedloc[1] || ''
    context.locationquery = qs.parse(querystringloc)

    next()
  }
}

function createPrevComponent(context, routemap) {
  const diffIdx = findIndex(context.namesChain,
    (name, idx) => name !== context.prevNamesChain[idx])

  if (~diffIdx) {
    const lastCommonName = context.namesChain[diffIdx - 1]
    if (lastCommonName === routemap.name) {
      return context.prevElementsChain[lastCommonName]
    }
  }
  return null
}

export function transitionRenderingMiddleware (renderer, transitionDuration) {
  return (context, next) => {
    if (context.transition) {
      renderer.render(context.transition)
      setTimeout(
        () => renderer.render(context.component),
        +transitionDuration
      )
    } else {
      renderer.render(context.component)
    }
  }
}
