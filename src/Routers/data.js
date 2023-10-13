import Login from '@/Pages/Login'
import Register from '@/Pages/Register'
import Reset from '@/Pages/Reset'
import ResetUser from '@/Pages/Reset/User'
import ResetVerify from '@/Pages/Reset/Verify'
import ResetNew from '@/Pages/Reset/New'
import ResetReceipt from '@/Pages/Reset/Receipt'
import Home from '@/Pages/Home'
import Notice from '@/Pages/Notice'
import Assets from '@/Pages/Assets'
import AssetsDetail from '@/Pages/Assets/Detail'
import AssetsDetailInfo from '@/Pages/Assets/Detail/Info'
import AssetsDetailRecord from '@/Pages/Assets/Detail/Record'
import AssetsDetailRecordInfo from '@/Pages/Assets/Detail/Record/Info'
import AssetsDetailDeposit from '@/Pages/Assets/Detail/Deposit'
import DrawMoney from '@/Pages/DrawMoney'
import MyModule from '@/Pages/My/List'
import AccountInformation from '@/Pages/My/AccountInformation'
import EditorInfo from '@/Pages/My/EditorInfo'
import SecurityInfo from '@/Pages/My/SecurityInfo'
import ResetPwd from '@/Pages/My/EditorInfo/reset-pwd'
import WhiteList from '@/Pages/My/WhiteList'
import OpenOrCloseWhiteList from '@/Pages/My/WhiteList/open-close'
import AppManager from '@/Pages/My/APPManager'
import BarcodeScanner from '@/Pages/DrawMoney/scan_qr'
// import BussionRecords from '@/Pages/My/Transaction'

// import { Navigate } from 'react-router-dom'

// 如果需要重定向 咋需要把element换成 <Navigate to={ item.to } />
const RouteList = [
  { label: '', isAuth: false, path: '/', element: <Login /> },
  { label: '登陆', isAuth: false, path: 'login', element: <Login /> },
  { label: '注册', isAuth: false, path: 'register', element: <Register /> },
  {
    label: '重置密码', isAuth: false, path: 'reset', element: <Reset />,
    children: [
      { label: '重置密码_用户名', isAuth: false, path: 'user', element: <ResetUser /> },
      { label: '重置密码_安全验证', isAuth: true, path: 'verify', element: <ResetVerify /> },
      { label: '重置密码_设置新密码', isAuth: true, path: 'new', element: <ResetNew /> },
      { label: '重置密码_回执', isAuth: true, path: 'receipt', element: <ResetReceipt /> }
    ]
  },
  { label: '首页', isAuth: true, path: 'home', element: <Home /> },
  { label: '公告', isAuth: true, path: 'notice', element: <Notice /> },
  { label: '资产', isAuth: true, path: 'assets', element: <Assets /> },
  { label: '资产详情', isAuth: true, path: 'assets/detail', element: <AssetsDetail /> },
  { label: '资产详情信息', isAuth: true, path: 'assets/detail/info', element: <AssetsDetailInfo /> },
  { label: '资产交易记录', isAuth: true, path: 'assets/detail/record', element: <AssetsDetailRecord /> },
  { label: '资产交易记录详情', isAuth: true, path: 'assets/detail/record/info', element: <AssetsDetailRecordInfo /> },
  { label: '充值', isAuth: true, path: 'assets/detail/deposit', element: <AssetsDetailDeposit /> },
  {label:'扫一扫', isAuth:true, path:'scanQr', element:<BarcodeScanner/>},
  { label: '提币', isAuth: true, path: 'draw', element: <DrawMoney /> },
  { label: '我的', isAuth: true, path: 'my', element: <MyModule /> },
  { label: '账户信息', isAuth: true, path: 'my/accountInfor', element: <AccountInformation /> },
  { label: '编辑信息', isAuth: true, path: 'my/editorInfo', element: <EditorInfo /> },
  { label: '安全信息', isAuth: true, path: 'my/security-info', element: <SecurityInfo /> },
  { label: '白名单', isAuth: true, path: 'my/white-list', element: <WhiteList /> },
  { label: '开启/关闭白明白', isAuth: true, path: 'my/white-list/:flag', element: <OpenOrCloseWhiteList /> },
  { label: '重置密码', isAuth: true, path: 'resetpwd', element: <ResetPwd /> },
  { label: '应用管理', isAuth: true, path: 'my/app-manage', element: <AppManager /> },

  { label: '交易记录', isAuth: true, path: 'my/records', element: <AssetsDetailRecord /> },
  // { label: '交易记录详情', isAuth: true, path: 'my/records/records-detail', element: <AssetsDetailRecordInfo /> },
]




export default RouteList