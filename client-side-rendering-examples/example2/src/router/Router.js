export default class Router {
  constructor(routes = [], renderNode) {
    this.routes = routes
    this.renderNode = renderNode
    this.navigate(location.pathname + location.hash)
  }

  match(route, requestPath) {
    const paramNames = []
    const regexPath =
      route.path.replace(/([:*])(\w+)/g, (full, colon, name) => {
        paramNames.push(name)
        return '([^/]+)'
      }) + '(?:/|$)'

    let params = {}
    const routeMatch = requestPath.match(new RegExp(regexPath))
    if (routeMatch !== null) {
      params = routeMatch.slice(1).reduce((params, value, index) => {
        if (params === null) params = {}
        params[paramNames[index]] = value
        return params
      }, null)
    }

    route.setProps(params)

    return routeMatch
  }

  navigate(path) {
    const route = this.routes.filter((r) => this.match(r, path))[0]
    if (!route) this.renderNode.innerHTML = 'Page not found'
    else {
      location.href = path.search('/#') === -1 ? '#' + path : path
      this.renderNode.innerHTML = route.renderView()
    }
  }

  addRoutes(routes) {
    this.routes = [...this.routes, ...routes]
  }
}
