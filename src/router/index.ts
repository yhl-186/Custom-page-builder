import { createRouter, createWebHistory } from 'vue-router'
//import LoginView from '../views/login/index.vue'
// 导入不同页面
import MainView from '../views/MainView/MainPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // 添加登录页面路由
      name: 'MainView',
      component: MainView // 懒加载方式引入登录组件
    }
  ]
})

export default router
/* {
  path: '/feature2',
  name: 'Feature2',
  component: () => import('../views/Feature2/index.vue'),
}, */
