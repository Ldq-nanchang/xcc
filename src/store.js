import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    logo: '',
    isLoading: false,
    coverComponent: false,
    teacher_school_info: {},
    organization_id: '',
    user_status: {},
    // school_information_id: '',
    second_show: false,
    third_show: false,

    organization: {
      id: 'FBBCA07C-EB3F-49AB-A90C-C3BBE8B2ED6A',
      logo: 'http://223.84.156.187:808/Upload/Train/3d162d722c48cc6352f403b1ea0f4b5399648.jpg',
      name: '51Talk无忧英语'
    },
    goods_info: {},
    pay_order: {
      address:{},
      goods: {},
      pay_type: true,
      pay_type_: false
    },
    post_evaluate: false,

    htoken_show: false,

    wechat: false,
    address_before: '',
  
    share: {},
    old_version: false
  },
  mutations: {

    updataLogo(state, logo) {
      state.logo = logo;
    },
    updateLoadingStatus(state, isLoading) {
      state.isLoading = isLoading;
    },
    updataTeacherSchoolInfoStatus(state, teacher_school_info) {
      state.teacher_school_info = teacher_school_info;
    },
    updataCoverComponentStatus(state,coverComponent) {
      state.coverComponent = coverComponent;
    },
    updataOrganizationId(state,organization_id) {
      state.organization_id = organization_id; 
    },
    updataUserStatus(state,user_status) {
      state.user_status = user_status;
    },
    // updataSchoolInformationId(state,school_information_id) {
    //   state.school_information_id = school_information_id;
    // },
    updataSecondShow(state,second_show) {
      state.second_show = second_show;
    },
    updataThirdShow(state,third_show) {
        state.third_show = third_show;
    },


    updataOrganization(state,organization) {
      state.organization = organization;
    },
    updataGoodsInfo(state,goods_info) {
      state.goods_info = goods_info;
    },
    updataPayOrder(state,callback) {
      callback(state.pay_order)
    },

    updataPostEvaluate(state,post_evaluate) {
        state.post_evaluate = post_evaluate;
    },

    updataHtokenShow(state,htoken_show) {
        state.htoken_show = htoken_show
    },
    updataWechat(state,wechat) {
        state.wechat = wechat;
    },
    updataAddressBefore(state,address_before) {
        state.address_before = address_before
    },
    updataShare(state,share) {
        state.share = share;
    },
    updataOldVersion(state,old_version) {
        state.old_version = old_version;
    }

  },
  actions: {

  }
})
