import React from 'react'

import map from 'lodash.map'
import reverse from 'lodash.reverse'
import last from 'lodash.last'
import defaults from 'lodash.defaults'
import size from 'lodash.size'
import find from 'lodash.find'
import get from 'lodash.get'

import qs from 'qs'

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

var _cssTransitionDefaults = {
  classNames: 'route',
  timeout: 1000
}

function createRouteTransitionMiddleware (routingBranch) {
  var routemap = last(routingBranch)
  return function (context, next) {
    context.name = routemap.name
    context.names = []
    context.refs = {}
    next()
  }
}

export function transitionRoutingMiddlewares (routingBranch) {
  return [
    createRouteTransitionMiddleware(routingBranch)
  ].concat(
    map(reverse(routingBranch), createRouteComponentTransitionMiddleware)
  )
}

function callTransitionHook(context, routeName, hookName) {
  var callback = get(context,`refs.${routeName}.${hookName}`)
  if (callback && typeof callback === "function") {
    callback()
  }
}

function createRouteComponentTransitionMiddleware (routemap) {
  return function (context, next) {
    var element = context.component
    if (size(routemap.children) > 0 && routemap.transition) {
      var parentTransition = typeof routemap.transition === 'object'
        ? routemap.transition
        : {}

      var childTransition = get(find(routemap.children,
        ['name', context.names[0]]), "transition")

      var transition = defaults(
        {
          key: context.names[0]
        },
        childTransition,
        parentTransition,
        {
          onEnter: function () {
            callTransitionHook(context, context.names[0], "componentWillEnter")
          },
          onEntering: function () {
            callTransitionHook(context, context.names[0], "componentEntering")
          },
          onEntered: function () {
            callTransitionHook(context, context.names[0], "componentDidEnter")
          },
          onExit: function () {
            callTransitionHook(context, context.names[0], "componentWillExit")
          },
          onExiting: function () {
            callTransitionHook(context, context.names[0], "componentExiting")
          },
          onExited: function () {
            callTransitionHook(context, context.names[0], "componentDidExit")
          }
        },
        _cssTransitionDefaults
      )
      element = React.createElement(
        TransitionGroup,
        { key: routemap.name },
        React.createElement(
          CSSTransition,
          transition,
          context.component
        )
      )
    }

    context.names.unshift(routemap.name)
    context.component = React.createElement(
      routemap.component,
      {
        ref: ref => { if (ref) context.refs[routemap.name] = ref },
      }, element
    )

    next()
  }
}

export function createUrlParsingMiddleware () {
  return function (context, next) {
    var parsed = context.path.split('?')
    context.qpathname = context.pathname
    context.pathname = parsed[0]
    context.querystring = parsed[1] || ''
    context.query = qs.parse(context.querystring)

    var parsedloc = location.search.split('?')
    var querystringloc = parsedloc[1] || ''
    context.locationquery = qs.parse(querystringloc)

    next()
  }
}

export function transitionRenderingMiddleware (renderer) {
  return function (context, next) {
    renderer.render(context.component)
  }
}
