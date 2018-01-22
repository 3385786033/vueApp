
// 密码(6-16位)
const pwd = /^[^\s]{6,16}$/
// 手机号(8位 以6/8/9开头)
const mobile = /^[6,8,9][0-9]{7}/
// 邮箱
const email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
// 手机验证码(6位纯数字)
const authCode = /[0-9]{4}/

// 验证密码(6-16位)
export function checkPwd (str) {
	return pwd.test(str)
}

// 验证 新加坡手机号是否合法 (8位 以6/8/9开头)
export function checkMobile (str) {
	return mobile.test(str)
}

// 验证邮箱
export function checkEmail (str) {
	return email.test(str)
}

// 验证手机验证码
export function checkAuthCode (str) {
	return authCode.test(str)
}

export default {
	checkPwd,
	checkMobile,
	checkEmail,
	checkAuthCode
}