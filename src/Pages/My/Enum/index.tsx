enum InfoType {
  userName = "userName",
  eMail = "eMail",
  phone = "phone",
  unit = "unit",
  nickName = "nickName",
  headSculpture = "headSculpture",
}
enum CountryCode {
  "China" = "86",
  "Malaysia" = "60",
  "Singapore" = "65",
  "Thailand" = "66",
  "Japan" = "81",
  "SouthKorea" = "82",
  "Vietnam" = "84",
  "Burma" = "95",
  "Taiwan" = "886",
}
enum MonetaryUnit {
  "China" = "CNY",
  "America" = "USD",
}
enum InfoSecurity {
  siginPwd = "siginPwd",
  updateSiginPwd = "updateSiginPwd",
  securityPwd = "securityPwd",
  updateSecurityPwd = "updateSecurityPwd",
  googleValidator = "googleValidator",
  updateGoogleValidator = "updateGoogleValidator",
  unbind="unbind"
}
enum InfoSecurityTip {
  siginPwd = "",
  updateSiginPwd = "",
  securityPwd = "您尚未设置资金密码，为了您的账户安全，请设置六位数字密码",
  updateSecurityPwd = "资金密码重置或修改，24小时内无法进行交易",
  googleValidator = "",
  updateGoogleValidator = "",
  unbind="解除与Ozbet账号：rose的绑定状态，解除后将无法进行快捷支付"
}
enum HeadTitle {
  "siginPwd" = "设置登录密码",
  "updateSiginPwd" = "修改登录密码",
  "securityPwd" = "设置资金密码",
  "updateSecurityPwd" = "修改资金密码",
  "googleValidator" = "绑定Google验证器",
  "updateGoogleValidator" = "修改Google验证器",
  "unbind"="解除绑定"
}
enum WhiteListInfo {
  open = "openTip",
  close = "closeTip",
  add = "addTip",
}
enum WhiteListEnum {
  openTip = "开启白名单地址提币功能，白名单地址可以快捷提币，非白名单地址无法进行提币",
  closeTip = "关闭白名单地址提币功能，开放输入地址提币",
  addTip = "温馨提示：新绑定的白名单地址24H后方可进行提币",
}
export {
  InfoType,
  CountryCode,
  MonetaryUnit,
  InfoSecurity,
  InfoSecurityTip,
  HeadTitle,
  WhiteListEnum,
  WhiteListInfo,
};
