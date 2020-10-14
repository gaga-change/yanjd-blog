import request from '@/utils/request'
import strapi from '@/utils/strapi'

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

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
