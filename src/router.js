import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
const school_info = r => require.ensure([], () => r(require('./views/school_info.vue')), 'group-school');
const organization_info = r => require.ensure([], () => r(require('./views/organization_info.vue')), 'group-organization');
const teacher_info = r => require.ensure([], () => r(require('./views/teacher_info.vue')), 'group-teacher');
// const school_power = r => require.ensure([], () => r(require('./views/view_text/school_power.vue')), 'group-center');
const comment_info = r => require.ensure([], () => r(require('./views/comment_info.vue')), 'group-coment');
const compare_result = r => require.ensure([], () => r(require('./views/compare_result.vue')), 'group-coment');
const course_info = r => require.ensure([], () => r(require('./views/course_info.vue')), 'group-teacher');
const information = r => require.ensure([], () => r(require('./views/information.vue')), 'group-information');
const information_info = r => require.ensure([], () => r(require('./views/information_info.vue')), 'group-information');
const gps_school_hourse = r => require.ensure([], () => r(require('./implant_views/gps_school_hourse.vue')), 'group-implant');
const sign_in = r => require.ensure([], () => r(require('./views/sign_in.vue')), 'group-center');
const follow_list = r => require.ensure([], () => r(require('./views/follow_list.vue')), 'group-center');
const browse_list = r => require.ensure([], () => r(require('./views/browse_list.vue')), 'group-center');
const signin_detail = r => require.ensure([], () => r(require('./views/signin_detail.vue')), 'group-center');
const message = r => require.ensure([], () => r(require('./views/message.vue')), 'group-center');
// const message_comment = r => require.ensure([], () => r(require('./views/message_comment.vue')), 'group-center');
// const message_praise = r => require.ensure([], () => r(require('./views/message_praise.vue')), 'group-center');
// const message_follow = r => require.ensure([], () => r(require('./views/message_follow.vue')), 'group-center');
const evaluate_list = r => require.ensure([], () => r(require('./views/evaluate_list.vue')), 'group-evaluate');
const post_evaluate = r => require.ensure([], () => r(require('./views/post_evaluate.vue')), 'group-evaluate');
const water_drop = r => require.ensure([], () => r(require('./views/water_drop.vue')), 'group-water-drop');
const goods_info = r => require.ensure([], () => r(require('./views/goods_info.vue')), 'group-water-drop');
const address_list = r => require.ensure([], () => r(require('./views/address_list.vue')), 'group-water-drop');
const address_edit = r => require.ensure([], () => r(require('./views/address_edit.vue')), 'group-water-drop');
const pay = r => require.ensure([], () => r(require('./views/pay.vue')), 'group-water-drop');
const order_list = r => require.ensure([], () => r(require('./views/order_list.vue')), 'group-water-drop');
const houses_info = r => require.ensure([], () => r(require('./views/houses_info.vue')), 'group-houses-drop');

const ranking_list = r => require.ensure([], () => r(require('./views/ranking_list.vue')), 'group-houses-ranking');

const qa = r => require.ensure([], () => r(require('./views/qa.vue')), 'group-qa');
const qa_info = r => require.ensure([], () => r(require('./views/qa_info.vue')), 'group-qa');



Vue.use(Router)
export default new Router({
//   mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/school_info',
      name: 'school_info',
      component: school_info
    },
    {
      path: '/organization_info',
      name: 'organization_info',
      component: organization_info
    },
    {
      path: '/teacher_info',
      name: 'teacher_info',
      component: teacher_info
    },

    // {
    //   path: '/school_power',
    //   name: 'school_power',
    //   component: school_power
    // },
    {
      path: '/comment_info',
      name: 'comment_info',
      component: comment_info
    },
    {
      path: '/compare_result',
      name: 'compare_result',
      component: compare_result
    },
    {
      path: '/course_info',
      name: 'course_info',
      component: course_info
    },
    {
      path: '/information',
      name: 'information',
      component: information
    },
    {
      path: '/information_info',
      name: 'information_info',
      component: information_info
    },
    {
      path: '/gps_school_hourse',
      name: 'gps_school_hourse',
      component: gps_school_hourse
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: sign_in
    },
    {
      path: '/follow_list',
      name: 'follow_list',
      component: follow_list
    },
    {
      path: '/browse_list',
      name: 'browse_list',
      component: browse_list
    },
    {
      path: '/signin_detail',
      name: 'signin_detail',
      component: signin_detail
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    // {
    //   path: '/message_comment',
    //   name: 'message_comment',
    //   component: message_comment
    // },
    // {
    //   path: '/message_praise',
    //   name: 'message_praise',
    //   component: message_praise
    // },
    // {
    //   path: '/message_follow',
    //   name: 'message_follow',
    //   component: message_follow
    // },
    {
      path: '/evaluate_list',
      name: 'evaluate_list',
      component: evaluate_list
    },{
      path: '/post_evaluate',
      name: 'post_evaluate',
      component: post_evaluate
    },{
      path: '/water_drop',
      name: 'water_drop',
      component: water_drop
    },{
      path: '/goods_info',
      name: 'goods_info',
      component: goods_info
    },{
      path: '/address_list',
      name: 'address_list',
      component: address_list
    },{
      path: '/address_edit',
      name: 'address_edit',
      component: address_edit
    },{
      path: '/pay',
      name: 'pay',
      component: pay
    },{
      path: '/order_list',
      name: 'order_list',
      component: order_list
    },{
      path: '/houses_info',
      name: 'houses_info',
      component: houses_info
    },{
        path: '/ranking_list',
        name: 'ranking_list',
        component: ranking_list
      },{
        path: '/qa',
        name: 'qa',
        component: qa
      },{
        path: '/qa_info',
        name: 'qa_info',
        component: qa_info
      },
  ]
})
