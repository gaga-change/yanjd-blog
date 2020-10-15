import strapi from '@/utils/strapi'
import store from '@/store'
export function login(data) {
  return strapi({
    url: '/auth/local',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return strapi({
    url: '/users/me',
    method: 'get'
  })
}

export function sendRestPwdEmail() {
  return strapi({
    url: '/auth/forgot-password',
    method: 'post',
    data: {
      email: store.state.user.email
    }
  })
}

export const resetPwd = (code, newPassword) => strapi
  .post('/auth/reset-password', {
    code: code,
    password: newPassword,
    passwordConfirmation: newPassword
  })
