import routerInstance from './router.js'

const root = document.getElementById('app')

const currentPath = location.pathname

if (currentPath === '/') {
  root.innerHTML = 'You are on Home page'
} else {
  const route = routerInstance.routes.find((r) => r.path === currentPath)
  if (route) {
    root.innerHTML = `You are on the ${route.name} path`
  } else {
    root.innerHTML = `This route is not defined`
  }
}

const definedRoutes = [...document.querySelectorAll('[router-link]')]
console.log(routerInstance)
const navigate = ({ target }) => {
  const route = target.attributes[0].value
  const routeInfo = routerInstance.routes.find((r) => r.path === route)
  if (!routeInfo) {
    history.pushState(null, null, 'error')
    root.innerHTML = `This route is not defined`
  } else {
    history.pushState(null, null, routeInfo.path)
    root.innerHTML = `You are on the ${routeInfo.name} path`
  }
}

definedRoutes.forEach((route) => {
  route.addEventListener('click', navigate)
})
