import _http from '../Https'
const PublicPrefix = '/user'
// 获取登录加密key
export const GetAccessKey = () => {
  return _http.getReq({
    url: `${PublicPrefix}/getAccessKey`
  })
}
// 登陆
export const Login = () => {
  return _http.postReq({
    url: `${PublicPrefix}/login`,
    data: {
      username: "",
      password: ``,
      emailCode: ``
    }
  })
}
// 注册
export const Register = () => {
  return _http.postReq({
    url: `${PublicPrefix}/register`,
    data: {
      username: "",
      password: ``,
      emailCode: ``,
      email: ""
    }
  })
}
// 注册验证码
export const GetRegionCode = (email: string) => {
  return _http.getReq({
    url: `${PublicPrefix}/sendRegisterEmailCode?email=${email}`,
  })
}
// 登录验证码
export const GetCode = () => {
  return _http.getReq({
    url: `${PublicPrefix}/sendLoginEmailCode?username=USERNAM`,
  })
}
// 退出
export const Logout = () => {
  return _http.getReq({
    url: `${PublicPrefix}/logout`,
  })
}

// 用户获取个人信息 GET user/getUserInfo
export const GetUserInfo = () => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/getUserInfo`
    }
  )
}
// 8.获取白名单地址 GET user/getUserWithdrawAddress
export const GetUserWithdrawAddress = () => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/getUserWithdrawAddress`
    }
  )
}

// 9.删除白名单地址 DELETE user/deleteWithdrawAddress?id=ID
export const DeleteWithdrawAddress = () => {
  return _http.deleteReq(
    {
      url: `${PublicPrefix}/deleteWithdrawAddress`
    }
  )
}

// 10.开关提币白名单 PUT user/switchWhiteAddress
export const SwitchWhiteAddress = () => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/switchWhiteAddress`
    }
  )
}
// 11.获取授权应用 GET user/getUserApplyApplication
export const GetUserApplyApplication = () => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/getUserApplyApplication`
    }
  )
}
// 12.解绑授权应用 PUT user/unbindUserApplyApplication?id=ID
export const UnbindUserApplyApplication = () => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/unbindUserApplyApplication?id=ID`
    }
  )
}
// 13.获取用户模糊邮箱(重置密码) GET user/getUserBlurEmail?username=USERNAME
export const GetUserBlurEmail = () => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/getUserBlurEmail?username=USERNAME`
    }
  )
}
// 14.发送重置密码邮箱验证码 GET user/sendResetPasswordEmailCode?username=USERNAME
export const SendResetPasswordEmailCode = () => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/sendResetPasswordEmailCode?username=USERNAME`
    }
  )
}
// 15.重置密码 PUT  user/resetPassword  {username password  emailCode  googleCode}
export const ResetPassword = () => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/resetPassword`,
      data: {
        username: "",
        password: "",
        emailCode: "",
        googleCode: ''
      }
    }
  )
}
// 16.修改密码 PUT  user / updatePassword {oldPassword newPassword }
export const UpdatePassword = () => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/updatePassword`,
      data: {
        oldPassword: "",
        newPassword: "",
      }
    }
  )
}
// 17.重置资金密码 PUT user / resetAssetsPassword(验证: 谷歌 邮箱) 请求头
export const ResetAssetsPassword = () => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/resetAssetsPassword`,
      headers: {
        "Google-Auth-Token": '',
        "Email-Token": ''
      }
    }
  )
}
// 18.重置谷歌验证 PUT user / resetGoogleAuth(验证: 谷歌 邮箱) 请求头
export const ResetGoogleAuth = () => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/resetGoogleAuth`,
      headers: {
        "Google-Auth-Token": '',
        "Email-Token": ''
      }
    }
  )
}
// 19.获取资产信息 GET user / getAssetsInfo
export const GetAssetsInfo = () => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/getAssetsInfo`,
    }
  )
}
// 20.获取交易记录  POST user / findTradeRecordList  {pageNo pageSize conditions }
export const FindTradeRecordList = () => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/findTradeRecordList`,
      data: {
        pageNo: '',
        pageSize: '',
        conditions: ''
      }
    }
  )
}
// 21.获取充币记录  POST user / findRechargeRecordList {pageNo pageSize conditions }
export const FindRechargeRecordList = () => {
  return _http.postReq(
    {
      url: `${PublicPrefix}/findRechargeRecordList`,
      data: {
        pageNo: '',
        pageSize: '',
        conditions: ''
      }
    }
  )
}
// 22.获取提币记录  POST user / findWithdrawRecordList {pageNo pageSize conditions }
export const FindWithdrawRecordList = () => {
  return _http.postReq(
    {
      url: `${PublicPrefix}/findRechargeRecordList`,
      data: {
        pageNo: '',
        pageSize: '',
        conditions: ''
      }
    }
  )
}

// 23.获取帐变记录  POST user / findAssetsChangeRecord {pageNo pageSize conditions }
export const FindAssetsChangeRecord = () => {
  return _http.postReq(
    {
      url: `${PublicPrefix}/findAssetsChangeRecord`,
      data: {
        pageNo: '',
        pageSize: '',
        conditions: ''
      }
    }
  )
}
// 24.公告列表  POST operate / operation / viewAnnouncement {pageNo pageSize conditions }
export const ViewAnnouncement = () => {
  return _http.postReq(
    {
      url: `/operate/operation/viewAnnouncement`,
      data: {
        pageNo: '',
        pageSize: '',
        conditions: ''
      }
    }
  )
}



