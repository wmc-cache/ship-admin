import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/ship/list',
    name: 'equipment',
    meta: {
      title: '设备管理',
      icon: 'documentation',
      roles: ['admin', 'equipment']
    },
    children: [

      {
        path: 'ship/list',
        component: () => import('@/views/ship/list'),
        name: 'ShipList',
        meta: { title: '无人船列表', icon: 'list', noCache: true }

      },
      {
        path: 'camera/list',
        component: () => import('@/views/camera/list'),
        name: 'CameraList',
        meta: { title: '摄像头列表', icon: 'list', noCache: true }

      },
      {
        path: 'sensor/list',
        component: () => import('@/views/sensor/list'),
        name: 'SensorList',
        meta: { title: '传感器列表', icon: 'list', noCache: true }

      },
      {
        path: 'selectMap/:deviceId',
        component: () => import('@/views/ship/selectMap'),
        name: 'selectMap',
        meta: { title: '选择地图', icon: 'list', noCache: true },
        hidden: true
      },
      {
        path: '/waterDataTable/:deviceId/:MapId',
        component: () => import('@/views/ship/waterDataTable'),
        name: 'showWaterData',
        meta: { title: '历史监测数据', icon: 'list', noCache: true },
        hidden: true
      }

    ]
  },
  {
    path: '/power',
    component: Layout,
    redirect: '/power/list',
    name: 'power',
    meta: {
      title: '权限管理',
      icon: 'documentation',
      roles: ['admin', 'power']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/power/list'),
        name: 'powerList',
        meta: { title: '权限管理列表', icon: 'list', noCache: true }
      },
      {
        path: 'detail',
        component: () => import('@/views/power/detail'),
        name: 'powerDetail',
        meta: { title: '权限详情', icon: 'guide', noCache: true },
        hidden: true
      }

    ]
  },
  {
    path: '/roles',
    component: Layout,
    redirect: '/roles/list',
    name: 'power',
    meta: {
      title: '角色管理',
      icon: 'documentation',
      roles: ['admin', 'roles']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/roles/list'),
        name: 'rolesList',
        meta: { title: '角色管理列表', icon: 'list', noCache: true }
      },
      {
        path: 'detail/:id/:name',
        component: () => import('@/views/roles/detail'),
        name: 'rolesDetail',
        meta: { title: '角色权限', icon: 'list', noCache: true },
        hidden: true
      }

    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'documentation',
      roles: ['admin', 'user']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/users/list'),
        name: 'userList',
        meta: { title: '用户管理列表', icon: 'list', noCache: true }
      },
      {
        path: 'detail/:id/:name',
        component: () => import('@/views/users/detail'),
        name: 'userRoleList',
        meta: { title: '用户角色管理', icon: 'list', noCache: true },
        hidden: true
      }

    ]
  },
  {
    path: '/camera/detail',
    component: () => import('@/views/camera/detail'),
    name: 'CameraDetail',
    meta: { title: '摄像头详情', icon: 'guide', noCache: true },
    hidden: true
  },
  {
    path: '/sensor/detail',
    component: () => import('@/views/sensor/detail'),
    name: 'SensorDetail',
    meta: { title: '传感器详情', icon: 'guide', noCache: true },
    hidden: true
  },
  {
    path: '/ship/detail/:deviceId',
    component: () => import('@/views/ship/detail'),
    name: 'ShipDetail',
    meta: { title: '无人船详情', icon: 'guide', noCache: true },
    hidden: true
  },
  {
    path: '/ship/operation/:deviceId',
    component: () => import('@/views/ship/operation'),
    name: 'operation',
    meta: { title: '无人船控制', icon: 'guide', noCache: true },
    hidden: true
  },
  {
    path: '/showWaterData/:deviceId/:MapId',
    component: () => import('@/views/ship/showWaterData'),
    name: 'showWaterData',
    meta: { title: '历史监测数据', icon: 'list', noCache: true },
    hidden: true
  },
  {
    path: '/map3D/:deviceId/:MapId',
    component: () => import('@/views/ship/map3D'),
    name: 'map3D',
    meta: { title: 'map3D', icon: 'list', noCache: true },
    hidden: true
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
