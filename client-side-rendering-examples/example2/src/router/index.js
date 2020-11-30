import Router from './Router.js'

export default (routes) => {
  const router = new Router(routes, document.getElementById('app'))

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[route]').forEach((route) =>
      route.addEventListener('click', (e) => {
        e.preventDefault()
        router.navigate(e.target.getAttribute('route'))
      })
    )
  })
}
