import Login from '@/Pages/Login'
import Register from '@/Pages/Register'
import Reset from '@/Pages/Reset'
import ResetUser from '@/Pages/Reset/User'
import ResetVerify from '@/Pages/Reset/Verify'
import ResetNew from '@/Pages/Reset/New'
import ResetReceipt from '@/Pages/Reset/Receipt'
import Home from '@/Pages/Home'
import Notice from '@/Pages/Notice'
import { Navigate } from 'react-router-dom'

// 如果需要重定向 咋需要把element换成 <Navigate to={ item.to } />
const RouteList = [
  { label: '登陆', path: 'login', element: <Login/> },
  { label: '注册', path: 'register', element: <Register/> },
  { label: '重置密码', path: 'reset', element: <Reset/>, children: [
    { label: '重置密码_用户名', path: 'user', element: <ResetUser/> },
    { label: '重置密码_安全验证', path: 'verify', element: <ResetVerify/> },
    { label: '重置密码_设置新密码', path: 'new', element: <ResetNew/> },
    { label: '重置密码_回执', path: 'receipt', element: <ResetReceipt/> }
  ] },
  { label: '首页', path: '/', element: <Home/> },
  { label: '公告', path: 'notice', element: <Notice/> },

]
export default RouteList