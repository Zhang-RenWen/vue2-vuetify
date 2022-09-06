import routerView from '@/router/routerView.vue'
import config from '@/router/config'

function createRouterTree() {
  const raw = []
  const routes = []

  require
    .context('@/views', true, /.+(vue)$/)
    .keys()
    .forEach(folderRoute => {
      const pathParts = folderRoute
        .split('/')
        .filter(x => x.length > 0)
        .map(x => x.split('%20'))
        .splice(1)
      pathParts.map((item, i) => {
        function createRouteNode(item) {
          const hasChildren = /.+(vue)$/.test(item)
          const parent = pathParts[i - 1]
          const parentName = parent ? `folder${parent[0]}` : ''
          const folder = {
            path: item,
            text: item,
            name: `folder${item}`,
            layer: i,
            parentName,
            children: [],
            component: routerView
          }
          const childNode = {
            path: item.replace('.vue', ''),
            text: item.replace('.vue', ''),
            name: `${parentName}-${item.replace('.vue', '')}`,
            layer: i,
            parentName,
            children: [],
            component: () =>
              import(
                /* webpackChunkName: "landingPage" */ `@/views/${folderRoute.replace('./', '')}`
              )
          }
          return !hasChildren ? folder : childNode
        }
        const name = item[0]
        const routeConfig = config[name.replace('.vue', '')]
        let model = createRouteNode(name)
        if (routeConfig) {
          model = Object.assign(routeConfig, model)
        }
        raw.push(model)
      })
    })
  function findContainer(el) {
    function findParentNode(el, routes) {
      for (let i = 0; i < routes.length; i++) {
        if (el.parentName === routes[i].name) {
          routes[i].children.push(el)
        } else {
          findParentNode(el, routes[i].children)
        }
      }
    }
    if (
      el.parentName === '' &&
      el.name !== '-Home' &&
      !routes.some(item => {
        return item.name === el.name
      })
    ) {
      // 新建第一層
      routes.push(el)
    } else {
      // el找爸爸
      findParentNode(el, routes)
    }
  }
  raw.map(o => {
    findContainer(o)
  })
  return routes
}

export default createRouterTree
