import Login from '@/Pages/Login'
import ResetLogin from '@/Pages/ResetLogin'
import { Navigate } from 'react-router-dom'

// 如果需要重定向 咋需要把element换成 <Navigate to={ item.to } />
const RouteList = [
  { label: '登陆', path: 'login', element: <Login/> },
  { label: '重置密码', path: 'resetLogin', element: <ResetLogin/> },
]

export default RouteList