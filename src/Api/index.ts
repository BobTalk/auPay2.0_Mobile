import _http from '../Https'
const PublicPrefix = '/user'
// 获取登录加密key
export const GetAccessKey = () => {
  return _http.getReq({
    url: `${PublicPrefix}/getAccessKey`
  })
}
// 登陆
export const LoginI = (obj: {
  username: string,
  password: string,
  code: string
}) => {
  return _http.postReq({
    url: `${PublicPrefix}/login`,
    data: {
      username: obj.username,
      password: obj.password,
      emailCode: obj.code
    }
  })
}
// 注册
export const RegisterI = (obj: {
  username: string,
  password: string,
  code: string,
  email: string,
}) => {
  return _http.postReq({
    url: `${PublicPrefix}/register`,
    data: {
      username: obj.username,
      password: obj.password,
      emailCode: obj.code,
      email: obj.email
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
export const GetCode = (name: string) => {
  return _http.getReq({
    url: `${PublicPrefix}/sendLoginEmailCode?username=${name}`,
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
export const DeleteWithdrawAddress = (id: string) => {
  return _http.deleteReq(
    {
      url: `${PublicPrefix}/deleteWithdrawAddress?id=${id}`
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
export const UnbindUserApplyApplication = (id: string|number, headers:{ "Google-Auth-Token": string,
"Email-Token": string}) => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/unbindUserApplyApplication?id=${id}`,
      headers
    }
  )
}
// 13.获取用户模糊邮箱(重置密码) GET user/getUserBlurEmail?username=USERNAME
export const GetUserBlurEmail = (username: string) => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/getUserBlurEmail?username=${username}`
    }
  )
}
// 14.发送重置密码邮箱验证码 GET user/sendResetPasswordEmailCode?username=USERNAME
export const SendResetPasswordEmailCode = (username: string) => {
  return _http.getReq(
    {
      url: `${PublicPrefix}/sendResetPasswordEmailCode?username=${username}`
    }
  )
}
// 15.重置密码 PUT  user/resetPassword  {username password  emailCode  googleCode}
export const ResetPassword = ({ username = '', password = '', emailCode = '', googleCode = '', }) => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/resetPassword`,
      data: {
        username,
        password,
        emailCode,
        googleCode
      }
    }
  )
}
// 16.修改密码 PUT  user / updatePassword {oldPassword newPassword }
export const UpdatePassword = ({ oldPassword = '', newPassword = '' }) => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/updatePassword`,
      data: {
        oldPassword,
        newPassword,
      }
    }
  )
}
// 17.重置资金密码 PUT user / resetAssetsPassword(验证: 谷歌 邮箱) 请求头
export const ResetAssetsPassword = ({ googleToken = '', emailToken = "" }) => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/resetAssetsPassword`,
      headers: {
        "Google-Auth-Token": googleToken,
        "Email-Token": emailToken
      }
    }
  )
}
// 18.重置谷歌验证 PUT user / resetGoogleAuth(验证: 谷歌 邮箱) 请求头
export const ResetGoogleAuth = ({ AssetsToken = '', emailToken = '' }) => {
  return _http.putReq(
    {
      url: `${PublicPrefix}/resetGoogleAuth`,
      headers: {
        "Assets-Password-Token": AssetsToken,
        "Email-Token": emailToken
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
export const FindTradeRecordList = (obj: {
  pageNo: number | undefined;
  pageSize: number | undefined;
  conditions?: object | undefined;
}) => {
  return _http.postReq(
    {
      url: `${PublicPrefix}/findTradeRecordList`,
      data: {
        pageNo: obj.pageNo,
        pageSize: obj.pageSize,
        conditions: obj.conditions,
      }
    }
  )
}
// 21.获取充币记录  POST user / findRechargeRecordList {pageNo pageSize conditions } conditions筛选条件字段
export const FindRechargeRecordList = (obj: {
  pageNo: number | undefined;
  pageSize: number | undefined;
  conditions?: object | undefined;
}) => {
  return _http.postReq(
    {
      url: `${PublicPrefix}/findRechargeRecordList`,
      data: {
        pageNo: obj.pageNo,
        pageSize: obj.pageSize,
        conditions: obj.conditions,
      }
    }
  )
}
// 22.获取提币记录  POST user / findWithdrawRecordList {pageNo pageSize conditions }
export const FindWithdrawRecordList = (obj: {
  pageNo: number | undefined;
  pageSize: number | undefined;
  conditions?: object | undefined;
}) => {
  return _http.postReq(
    {
      url: `${PublicPrefix}/findWithdrawRecordList`,
      data: {
        pageNo: obj.pageNo,
        pageSize: obj.pageSize,
        conditions: obj.conditions,
      }
    }
  )
}

// 23.获取帐变记录  POST user / findAssetsChangeRecord {pageNo pageSize conditions }
export const FindAssetsChangeRecord = (obj: {
  pageNo: number | undefined;
  pageSize: number | undefined;
  conditions?: object | undefined;
}) => {
  return _http.postReq(
    {
      url: `${PublicPrefix}/findAssetsChangeRecord`,
      data: {
        pageNo: obj.pageNo,
        pageSize: obj.pageSize,
        conditions: obj.conditions,
      }
    }
  )
}
// 24.公告列表  POST operate / operation / viewAnnouncement {pageNo pageSize conditions }
export const ViewAnnouncement = (obj: {
  pageNo: number | undefined;
  pageSize: number | undefined;
  conditions?: object | undefined;
}) => {
  return _http.postReq(
    {
      url: `/operate/operation/viewAnnouncement`,
      data: {
        pageNo: obj.pageNo,
        pageSize: obj.pageSize,
        conditions: obj.conditions,
      }
    }
  )
}
// 数字货币汇率接口
export const GetUSDTTickers = () => {
  return _http.getReq({
    url: `/operate/operation/getUSDTTickers`
  })
}
// 文件上传
export const FileUpload = (file: any) => {
  return _http.postReq({
    url: '/operate/operation/upload',
    data: { file }
  })
}
// 交易记录详情
export const TradeRecordDetail = (id: any) => {
  return _http.getReq({
    url: `${PublicPrefix}/checkTradeRecordDetail?id=${id}`,
  })
}
// 交易资金密码
export const VerifyAssetsPassword = ({ assetsPwd, operationId }: any) => {
  return _http.getReq({
    url: `${PublicPrefix}/verifyAssetsPassword?assetsPassword=${assetsPwd}&operationId=  ${operationId}`,
  })
}
// google 验证码
export const VerifyGoogle = (googleCode: string, operationId: number) => {
  return _http.getReq({
    url: `${PublicPrefix}/verifyGoogle?googleCode=${googleCode}&operationId=${operationId}`,
  })
}
// 邮箱验证码
export const SendEmailCode = (operationId: number) => {
  return _http.getReq({
    url: `${PublicPrefix}/sendEmailCode?operationId=${operationId}`,
  })
}
// 邮箱校验
export const VerifyEmail = (emailCode: string, operationId: any) => {
  return _http.getReq({
    url: `${PublicPrefix}/verifyEmail?emailCode=${emailCode}&operationId=${operationId}`,
  })
}
export const BindGoogleAuth = () => {
  return _http.getReq({
    url: `${PublicPrefix}/bindGoogleAuth`,
  })
}
// 更新资金密码
export const UpdateAssetsPassword = ({ newPassword, assetsToken }: any) => {
  return _http.putReq({
    url: `${PublicPrefix}/updateAssetsPassword`,
    data: { newPassword },
    headers: {
      "Assets-Password-Token": assetsToken
    }
  })
}
// 新增白名单
export const AddWithdrawAddress = (data: {
  currencyId: number,
  currencyChain: number,
  address: string,
  note: string,
}, headers: {
  "Assets-Password-Token": string,
  "Google-Auth-Token": string,
  "Email-Token": string
}) => {
  return _http.postReq({
    url: `${PublicPrefix}/addWithdrawAddress`,
    data,
    headers
  })
}
// 修改用户信息
export const SetUserInfo = (data:{mobile?:string, currencyUnit?:string}) => {
  return _http.putReq({
    url:`${PublicPrefix}/setUserInfo`,
    data
  })
}

export const GetCurrencyAssetsInfo = (obj:{currencyChain:number|undefined,currencyId:number }) => {
  return _http.getReq({
    url:`${PublicPrefix}/getCurrencyAssetsInfo?currencyId=${obj.currencyId}&currencyChain=${obj.currencyChain}`,
  })
}

