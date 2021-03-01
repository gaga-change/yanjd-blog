import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/resetPwd',
    component: Layout,
    children: [{
      path: '',
      name: 'resetPwd',
      component: () => import('@/views/resetPwd/index'),
      meta: { title: '修改密码' }
    }],
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/post',
    component: Layout,
    redirect: '/postList',
    children: [{
      path: 'postList',
      name: 'postList',
      component: () => import('@/views/post/postList'),
      meta: { title: '文章', icon: 'el-icon-folder' }
    }]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: '/tagList',
    children: [{
      path: 'tagList',
      name: 'tagList',
      component: () => import('@/views/tag/tagList'),
      meta: { title: '标签', icon: 'el-icon-collection-tag' }
    }]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/categoryList',
    children: [{
      path: 'categoryList',
      name: 'categoryList',
      component: () => import('@/views/category/categoryList'),
      meta: { title: '分类', icon: 'el-icon-folder' }
    }]
  },
  {
    path: '/markdown',
    component: () => import('@/views/markdown/markdown'),
    name: 'markdown',
    meta: { title: 'markdown' },
    hidden: true
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permissionList',
    children: [{
      path: 'permissionList',
      name: 'permissionList',
      component: () => import('@/views/permission/permissionList'),
      meta: { title: '权限', icon: 'el-icon-folder' }
    }]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/roleList',
    children: [{
      path: 'roleList',
      name: 'roleList',
      component: () => import('@/views/role/roleList'),
      meta: { title: '角色', icon: 'el-icon-folder' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/userList',
    children: [{
      path: 'userList',
      name: 'userList',
      component: () => import('@/views/user/userList'),
      meta: { title: '用户', icon: 'el-icon-folder' }
    }]
  },
  {
    path: '严俊东博客',
    component: Layout,
    children: [
      {
        path: 'http://www.yanjd.top/',
        meta: { title: '博客首页', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
