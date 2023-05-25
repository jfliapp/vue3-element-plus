import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/public/signin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/boss/bossLogout',
    method: 'get'
  })
}

// 获取验证码
export function getCaptcha() {
  return request({
    url: '/boss/captcha.jpg',
    method: 'get',
    responseType: 'blob'
  })
}
