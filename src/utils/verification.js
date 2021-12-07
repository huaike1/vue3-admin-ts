// 手机号验证
export function checkPhone(value) {
  let regPhong = /^1[3456789]\d{9}$/;
  return regPhong.test(value);
}
// 邮箱验证
export function checkMail(value) {
  let regMail =
    /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  return regMail.test(value);
}
// 密码验证 1\密码必须由字母、数字组成，区分大小写2.密码长度为8-18位
export function checkPassword(value) {
  let regPassword = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{8,18}$/;
  return regPassword.test(value);
}
// 验证码 纯数字
export function checkCode(value) {
  let regCode =/^\d{6}$/;
  return regCode.test(value);
}
