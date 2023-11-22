import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import fa from "element-ui/src/locale/lang/fa";
import store from "@/store";
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
 roles: ['college','editor']    control the page roles (you can set multiple roles)
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
    title: '登录',
    hidden: true
  },
  {
    path: '/editPassword',
    title: '修改密码',
    component: () => import('@/views/login/EditPassword.vue'),
    hidden: true
  },

  {
    path: '/process/apply/:processTemplateId',

    component: () => import('@/views/app/apply.vue'),
    hidden: true
  },
  {
    path: '/process/list/:activeIndex',
    name: '审批列表',
    component: () =>
      import('../views/app/list.vue'),
  },
  {
    path: '/about',
    name: 'About',
    title: '关于',
    component: () => import('@/views/about.vue'),
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

    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        //部署动态路由
        // component:()=>resolve=>require([`@/views/${path}`],resolve),
        meta: {title: '个人主页', icon: 'dashboard'}
      }
    ]
  },
  {
    path: '/hide',
    component: Layout,
    hidden: true,
    meta: {
      // title: '试卷管理',
      icon: 'el-icon-tickets'
    },
    children: [

      {
        path: 'Information/:stuId',
        name: 'Information',
        component: () => import('@/views/manage/student/Information.vue'),
        meta: {
          title: '学生个人信息',
        },
        // hidden: false,

      },

    ]
  },

]

const createRouter = () => new Router({
  mode: 'history',
  base: '/',
  // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})


const router = createRouter()
router.beforeEach((to, from, next) => {
  // 在这里记录路径和名称，你可以将它们保存在某个状态管理器（如Vuex）中，或者在组件中使用 props、事件等方式传递
  const routeInfo = {
    path: to.path,
    name: to.meta.title,
  };
  store.dispatch("tagsView/addView", to).then(r =>{
  } )
  // console.log('to：', to);

  next();
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
