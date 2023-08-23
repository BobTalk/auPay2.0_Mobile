import { Routes, Route } from 'react-router-dom'
import RouteList from './data'

const Routers = () => {
  // 递归循环 处理带有子级的路由
  const routerDom = (ary: any[]) => {
    return ary.map(item => {
      if (item.children && item.children.length) {
        return (
          <Route key={ item.path } { ...item }>
            { routerDom(item.children) }
          </Route>
        )
      } else {
        return <Route key={ item.path } { ...item } />
      }
    })
  }
  return (
    <Routes>
      { routerDom(RouteList) }
    </Routes>
  )
}
export default Routers