import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './ydui.flexible.js'
// import gallery from 'img-vuer'
import VueAMap from 'vue-amap';

import YDUI from 'vue-ydui';

import 'vue-ydui/dist/ydui.rem.css';
import './assets/css/common.css';
import './assets/css/iconfont.css';
import 'animate.css';

import http from './http'

Vue.prototype.$http = http;

Vue.use(YDUI);
// Vue.use(gallery);
Vue.use(VueAMap);

Vue.config.productionTip = false;


import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

/* global _DEV_ android */
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999,
        title: false,
        toolbar: false,
        // backdrop: true
    }
})
import ios from './ios.js';
Vue.prototype.$IOS = ios;


router.beforeEach((to,from, next) => {
  // store.commit('updateLoadingStatus', true);
  from
  if(to.name=='school_info'||to.name=='organization_info'||to.name=='teacher_info') {
    store.commit('updataSecondShow',false);
    store.commit('updataThirdShow',false);
  }
  next();
});

router.afterEach(() => {

});
let vue=new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    androidData: 'android',
    obj_type: 'file',
    android_data_school_teacher: null,
    img_url: '',
    share_url_: '',
  },
    beforeCreate() {
        // if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
        //     document.addEventListener('WeixinJSBridgeReady', ready, false)
        //     store.commit('updataWechat',false) 
        // } else {
        //     console.log('sss02')
        //     ready()
        // }
        
        // wx.miniProgram.getEnv(function(res) {
        //     store.commit('updataWechat',res.miniprogram)
        // })
    },
    created() {
        function ready() {
            store.commit('updataWechat',window.__wxjs_environment === 'miniprogram')
        }
        if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
            document.addEventListener('WeixinJSBridgeReady', ready, false)
            store.commit('updataWechat',false)     
        } else {   
            ready()
        }      
        this.get_user();
        // wx.miniProgram.getEnv(function(res) {
        //     store.commit('updataWechat',res.miniprogram)
        // })
       
        let url_array = window.location.href.split('/');
        switch(url_array[2]) {
            case '223.84.156.187:807':
                this.img_url = url_array[0]+'//223.84.156.187:808';
                // this.img_url = url_array[0]+'//47.105.241.14:808';
                this.share_url_ = url_array[0]+'//223.84.156.187:807/?#';
                break;
            case '223.84.156.187:813':
                this.img_url = url_array[0]+'//223.84.156.187:808';
                // this.img_url = url_array[0]+'//47.105.241.14:808';
                this.share_url_ = url_array[0]+'//223.84.156.187:813/?#';
                break;
            case 'share.xcc-edu.com':
                this.img_url = url_array[0]+'//47.105.241.14:808';
                this.share_url_ = url_array[0]+'//share.xcc-edu.com/?#';
                break;
            case '47.105.241.14:807':
                this.img_url = url_array[0]+'//47.105.241.14:808';
                this.share_url_ = url_array[0]+'//share.xcc-edu.com/?#';
                break;
            case 'front.xcc-edu.com':
                this.img_url = url_array[0]+'//back.xcc-edu.com';
                this.share_url_ = url_array[0]+'//front.xcc-edu.com/?#';
                break;
            default:
                this.img_url = url_array[0]+'//223.84.156.187:808';
                // this.img_url = url_array[0]+'//47.105.241.14:808';
                this.share_url_ = url_array[0]+'//223.84.156.187:807/?#';
                // this.share_url_ = url_array[0]+'//share.xcc-edu.com/?#';
        }

        window.android_school_teacher = this.android_school_teacher;
        window.android_compare_school = this.andrid_compare_school;
        window.android_gps_school_hourse = this.android_gps_school_hourse;
        window.android_sign_in = this.android_sign_in;
        window.shareUrl = this.share_url;
        if(_DEV_) {
            this.obj_type = 'development'
            // this.loading('15170236956');
            return;
        }else {
            this.obj_type = 'production'
        }
        

    },
  mounted() {
    // this.$http.init_head();
    
        if(window.location.href.split('user=')[1]&&
        window.location.href.split('user=')[1].split('xcc-')[1]&&
        window.location.href.split('user=')[1].split('xcc-')[1].length>15) {
            let arr = window.location.href.split('user=')[1].split(',')
            this.$http.init_head(arr[0],arr[1])
            setTimeout(() => {
                this.get_user_info_(window.location.href.split('user=')[1].split('xcc')[0]+'xcc-');
            });  
        }
  },
  methods: {
    init_nav() {
        if(this.$root._IsIOS()) {
            this.$IOS.getNavInfo(false,'',0,'','','','')
        }else if(this.$root._IsAndroid()) {
            try{
                android.getNavInfo(false,'',0,'','','','')
            }catch(err) {
                console.log(err);
            }
        }
    },
    get_wechat_sign(share_page) {
        console.log(share_page)
        console.log('ss')
        var urlBay = window.location.href.split('#')[0];
        console.log(urlBay)
        this.$http.get_sign('https://api.xcc-edu.com/api/Weixin/GetWxSignatureInfo',{
            Url: urlBay
        },(res)=>{
            wx.config({
                debug: false, //是否 开启调试模式,建议调试的时候debug 改为true
                appId: res.data.data.appid, // 必填，公众号的唯一标识
                timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
                signature: res.data.data.signature, // 必填，签名，见附录1
                jsApiList: [
                  'updateAppMessageShareData',
                  'updateTimelineShareData',
                  'onMenuShareAppMessage',
                  'onMenuShareTimeline',
                ] // 必填，需要使用的JS接口列表 声明
              });
              wx.error(function(res) {
                // alert("微信接口初始化失败；错误信息："+res.toString());
                console.log("微信接口初始化失败；错误信息：",res);
              });
              window.onload = function() {
                // alert("当前域名是："+url);
                console.log("当前域名是："+url)
              }
              wx.ready(function() {

                let share = {
                    debug: false,
                    title: share_page.name, // 分享标题
                    desc: share_page.des, // 分享描述
                    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://share.xcc-edu.com/logo.png', // 分享图标
                }
                let share_ = {
                    debug: false,
                    title: share_page.des, // 分享标题
                    desc: share_page.des, // 分享描述
                    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://share.xcc-edu.com/logo.png', // 分享图标
                }
                wx.onMenuShareAppMessage(share);
                wx.onMenuShareTimeline(share_); 
              });
        })
    },
    isWeiXin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger"||ua.match(/WeiBo/i) == "weibo") {
            return true;
        }else if(ua.indexOf('mobile mqqbrowser')>-1){  
            return true;
        } else if(ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1){   
            if(ua.indexOf('qq') > -1){
                return true;
            }

        }
        return false;
    },
    more_action() {
        this.$dialog.confirm({
            title: '温馨提示',
            mes: '下载APP体验更多功能!',
            opts: [
                {
                    txt: '取消',
                    color: false,
                },
                {
                    txt: '确定',
                    color: true,
                    callback: () => {
                        wx.miniProgram.switchTab({
                            url: '/pages/center/center'
                        })
                    }
                }
            ]
        })
    },    
    get_user() {
        
      let user = '';
      if(this._IsAndroid()) {
        if(android&&android.getUserInfo()){
            user = android.getUserInfo();
            this.get_user_info(user);
        }
              
      }else if(this._IsIOS()) {
        let version = '';
        if(navigator.appCodeName.split('-')[0]=='xcc') {
            version = navigator.appCodeName
        }
        if(window.location.href.split('user=')[1]) {
            user = window.location.href.split('user=')[1]+','+version;
        } 
        this.get_user_info(user)
      } 

    },
    get_user_info(user) {
        let arr = user?user.split(','):[];
        this.$http.init_head_(arr[0],arr[1])
        store.commit('updataUserStatus',{
            mobile: arr[0],
            htoken: arr[1],
            version: arr[2]
        })
        if(!store.state.user_status.version&&store.state.user_status.mobile) {
            store.commit('updataOldVersion',true);
        }
    },
    get_user_info_(user) {
        let arr = user?user.split(','):[];
        store.commit('updataUserStatus',{
            mobile: arr[0],
            htoken: arr[1],
            version: arr[3]
        })
        if(!store.state.user_status.version&&store.state.user_status.mobile) {
            store.commit('updataOldVersion',true);
        }
    },

    loading() {
        console.log('ss')
      store.commit('updataUserStatus',{
        // htoken: '3B0BC63A92B323B02DC19804ECED05D3',
        htoken: '42931F1BBF911E5565D00EF07F225F4F',
        mobile: '15170236956'
      })
      this.$http.init_head_('42931F1BBF911E5565D00EF07F225F4F','15170236956')
    },
    to_login() {
      if(!_DEV_&&this._IsAndroid()) {
        android.toLogin()
      }else if(!_DEV_&&this._IsIOS()) {
        ios.goToLogin()
      }
    },
    android_school_teacher(type,id) {
      this.android_data_school_teacher = [type,id];
    },

    android_gps_school_hourse(id) {
      this.$router.push({
        name:'gps_school_hourse',
        query: {
          id: id
        }
      });
    },
    andrid_compare_school(schoola_id,schoolb_id,type_id) {
      this.$router.push({
        path: '/compare_result',
        query: {
          schoola_id: schoola_id,
          schoolb_id: schoolb_id,
          type_id: type_id 
        }
      })
    },
    android_sign_in() {
      this.$router.push({
        path: '/sign_in'
      })
    },
    native_comment_info(id) {
        if(!_DEV_&&this._IsAndroid()) {
            android.issueMomentDetails(id)
        }else if(!_DEV_&&this._IsIOS()) {
            ios.goToParentsDetail(id)
        }
    },
    pay(mobile,courier_id,goods_id,payType) {
      if(this._IsAndroid()) {
        android.startPayTool(mobile,courier_id,goods_id,payType);
      }else if(this._IsIOS()) {
        ios.startPayTool(mobile,courier_id,goods_id,payType);
      }
    },
    browser_url(url) {
        if(!url) {
            return false;
        }
        if(this.$route.query.open) {
            window.location.href = url;
            return;
        }
        if(this._IsAndroid()){
            android.openLinkByBroweser(url)
        }else if (this._IsIOS()) {
            ios.openUrlWithSafari(url)
        }
    },
    calling(num) {
        if(!num) {
            return false;
        }
        if(this.$route.query.open) {
            window.location.href = 'tel:'+num;
            return;
        }
        if(this._IsAndroid()){
            android.callUp(num)
        }else if (this._IsIOS()) {
            ios.callWithPhoneNumber(num)
        }
    },
    share_url(page,id,type_id) {
        console.log(page);
        if(!type_id) {
            type_id = '';
        }
        if(store.state.share.page.logo) {
            page = store.state.share.page;
            id = store.state.share.id;
            type_id = store.state.share.type_id;
        }
        let url = this.share_url_+window.location.href.split('#')[1];
        if(this._IsAndroid()) {
            url=url+"&open=browser";
            android.doShareUrl(url,page.logo,page.name,page.des.replace(/[\r\n]/g,"").substr(0,40),id,type_id)
        }else if(this._IsIOS()) {
            let uri = url;
            let list = []
            if(uri.split('&')[uri.split('&').length-1].split('=')[0]!='user') {
                list = uri.split('&');
            }else {
                list = uri.split('&').splice(0,uri.split('&').length-1);
            }
            let u=list.join('&') + '&open=browser';
            ios.doShareUrl(u,page.logo,page.name,page.des.replace(/[\r\n]/g,"").substr(0,40),id,type_id)
        }
    },
    follow_store(url,name,callback) {
      this.$store.commit('updataCoverComponentStatus',true)
      this.$http.ajax_post_(url,{
        Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
        HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
        Id: this.$route.query.id,
        ObjectCode: this.$route.query.type_id,
        SetValue: 1,
        Name: name
      },(res)=>{  
        if(res.data.status !='0000') {
          return false;
        }
        if(typeof callback == 'function') { 
          callback();
        }
      },()=>{
        this.$dialog.alert({mes: '系统开了个小差~'});
      }) 
    },
    follow(url,state,id,type_id,name,callback) {
      this.$store.commit('updataCoverComponentStatus',true)
      this.$http.ajax_post_(url,{
        Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
        HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
        Id: id,
        ObjectCode: type_id,
        Name: name,
        SetValue: state
      },(res)=>{  
        if(res.data.status !='0000') {
          return false;
        }
        if(typeof callback == 'function') { 
          callback();
        }
      },()=>{
          this.$dialog.alert({mes: '系统开了个小差~'});
         }) 
    },
    praise(url,state,id,type_id,user_id,callback) {
      this.$store.commit('updataCoverComponentStatus',true)
      this.$http.ajax_post_(url,{
        Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
        HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
        Id: id,
        ObjectCode: type_id,
        UserId: user_id,
        SetValue: state
      },(res)=>{  
        if(res.data.status !='0000') {
          return false;
        }
        if(typeof callback == 'function') { 
          callback();
        }
      },()=>{
        this.$dialog.alert({mes: '系统开了个小差~'});
      }) 
    },
    pic_sort(pics,callback) {
        for(let i=0;i<pics.length;i++) {
            pics[i].time = pics[i].filename.split('/')[pics[i].filename.split('/').length-1].split('.')[0].split('_xcc_')[1]
        }
        pics.sort(function(a,b){
            return a.time - b.time;
        })
        if(typeof callback=='function') {
            callback(pics)
        }  
    },
    post_comment(type_code,id,content,callback) {
      this.$store.commit('updataCoverComponentStatus',true)
      this.$http.ajax_post_('/api/Family/SaveComment',{
          Id: id,
          TypeCode: type_code,
          Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
          HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
          Content: content
      },(res)=>{
          if(res.data.status=='-1') {
              this.$dialog.alert({
                  title: '温馨提示',
                  mes: '该信息不存在',
                  // callback:()=>{
                  //     this.backNative();
                  // }
              });
              return false;
          }
          this.$dialog.toast({
              mes: '发送成功',
              timeout: 1500,
              icon: 'success',
              callback: ()=>{
                  if(typeof callback == 'function') {
                    callback()
                  }
              }
          });
      },()=>{
        this.$dialog.alert({mes: '系统开了个小差~'});
      })
  },
      getImgNaturalDimensions(oImg, callback) {
          var nWidth, nHeight;
          if (!oImg.naturalWidth) {//现代浏览器
              nWidth = oImg.naturalWidth;
              nHeight = oImg.naturalHeight;
              callback({ w: nWidth, h: nHeight });
          } else {//IE6/7/8
              var nImg = new Image();
              nImg.onload = function () {
                  var nWidth = nImg.width,
                      nHeight = nImg.height;
                  callback({ w: nWidth, h: nHeight });
              }
              nImg.src = oImg.src;
          }
      },

back() {
    this.$store.commit('updataSecondShow',true);
    this.$store.commit('updataThirdShow',true);
    if(this._IsIOS()) {
        ios.goToBack();               
    }else if(this._IsAndroid()) {
        android.goToBack();
    }
},
person_page(mobile,id) {
    console.log(mobile,id)
  if(this._IsAndroid()) {
    android.startPersonPage(mobile,id)
  }else if(this._IsIOS()) {
    ios.startPersonPage(mobile,id)
  }
},

//判断是否为ios端访问
_IsIOS() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return true;
  } else {
      return false;
  }
},
//判断是否为android端访问
_IsAndroid() {
  if (/(Android|Adr)/i.test(navigator.userAgent)) {
      return true;
  } else {
      return false;
  }
},
getScrollTop()
{
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
},
transform_time(time) {
    if(!time) {
        return;
    }
    let _time = new Date()
    let time_ = parseInt(_time.valueOf()/1000)-(new Date(time.replace(/-/g, '/'))).getTime()/1000;
    let _time_ = '';
    if(time_<=15) {
        _time_ = '刚刚';
    }else if (time_>15&&time_<60) {
        _time_ = time_ +'秒前';
    }else if(time_>=60&&time_<3600) {
        _time_ = parseInt(time_/60) + '分钟前';
    }else if(time_>=3600&&time_<86400) {
        _time_ = parseInt(time_/3600) + '小时前'
    }else if(time_>=86400&&time_<2592000) {
        _time_ = (parseInt(time_/86400)) + '天前'
    }else if(time_>=2592000) {
        _time_ = parseInt(time_/2592000) + '个月前'
    }
    return _time_;
  
},
future() {
    this.$dialog.toast({
        mes: '暂未开通，敬请期待',
        timeout: 1000,
        icon: 'warn',
    })
},
to_open_app() {
    let url = window.location.href.split('&');
        url  = url.slice(0,url.length-1);
        url = url.join('&')
        url = 'xcc://m.xcc-edu.com/'+'#'+url.split('#')[1];
        sessionStorage.setItem('url',url);
        if(this.$root.share_url_=='http://share.xcc-edu.com/?#') {
            window.location.href = 'http://share.xcc-edu.com/open_app.html';
        }else if(this.$root.share_url_=='http://223.84.156.187:807/?#') {
            window.location.href = 'http://223.84.156.187:807/open_app.html';
        }
                 
},
}

}).$mount('#app')
if(_DEV_) {
  setTimeout(()=>{
    
    // window.android_school_teacher("02","459A7068-5ADE-41EF-AEA6-266D9DD6B309")
    // window.android_school_teacher("03","F3CB66D2-7079-4DF9-8A25-333483148F88")
    // window.android_school_teacher("01","479D8C4E-03A3-46AA-A1D6-0C0D1DB7A334")
    // window.android_school_teacher("04","Z0718")
    // window.android_school_teacher("04","4436a496-2c5e-4890-be0d-755540263cf7")
    // window.android_school_teacher("04","Z0210")
    // window.android_school_teacher("05","36E1ADD0-8541-4B50-AEC7-19C0BFC1AB74")
    // window.android_school_teacher("05","FBBCA07C-EB3F-49AB-A90C-C3BBE8B2ED6A")
    // window.android_school_teacher("06","e41f1b729034412bbbf893afc1d01dc1")
    // window.android_school_teacher("06","0a0f681aa61047edb00a4bc9440c432a")
    // window.android_school_teacher("07","196DA9C3-3AAC-4CBD-A1DB-B383D8FD6011")
    // window.android_compare_school('3A2AF08D-5C2E-4507-AC57-A88E711DFE2D','479D8C4E-03A3-46AA-A1D6-0C0D1DB7A334','01')

     // window.android_gps_school_hourse("cc16cc4a-16a6-4617-a097-900198563f14");
    
    // window.android_gps_school_hourse("1A0D023A-D5C1-42BC-A8F8-4F5CA8D297C3");
    // window.android_sign_in();
    // router.push({path:'/follow_list'})
    // router.push({path:'/browse_list'})
    // router.push({path:'/signin_detail'})
    // router.push({path:'/message'})
    // router.push({path:'/water_drop'})
    // router.push({path:'/address_list'})
    // router.push({path:'/address_edit'})
    // router.push({path:'/pay'})
    // router.push({path:'order_list'})
    // router.push({
    //   path:'/houses_info',
    //   query: {
    //     id: 'f222d904-947d-490c-9f4c-1d4c253774db',
    //     type_id: '10'
    //   }
    // })
  },1000)
}
export default vue;









