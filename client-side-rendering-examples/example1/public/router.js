const Router = (name, routes) => ({
  name,
  routes,
})

const routerInstance = Router('routerInstance', [
  {
    path: '/',
    name: 'Root',
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
])

export default routerInstance
