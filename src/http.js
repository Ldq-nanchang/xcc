import axios from 'axios';
import qs from "qs";
import store from './store';

import ios from './ios.js';

import { Toast ,Alert} from 'vue-ydui/dist/lib.rem/dialog';
let $dialog = {
    toast: Toast,
    alert: Alert
}
// const Axios = axios.create({
//     responseType: "json",
//     withCredentials: true,
//     header: {
//         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//     }
// })

// Axios.interceptors.response.use(response => {
//     return response
// },error => {
//     console.log(error)
// })
// axios.defaults.headers.common['HToken'] = store.state.user_status.htoken?store.state.user_status.htoken:'';
// axios.defaults.headers.common['Mobile'] = store.state.user_status.Mobile?store.state.user_status.Mobile:'';
// let base_url = 'http://223.84.156.187:806';

// let base_url = 'http://223.84.156.187:812';

// let base_url = 'http://47.105.241.14:806';
let base_url = '';
let url_array = window.location.href.split('/');
switch(url_array[2]) {
    case '223.84.156.187:807':
        base_url = url_array[0]+'//223.84.156.187:806';
        break;
    case 'share.xcc-edu.com':
        base_url = url_array[0]+'//47.105.241.14:806';
        break;
    case '47.105.241.14:807':
        base_url = url_array[0]+'//47.105.241.14:806';
        break;
    case 'front.xcc-edu.com':
        base_url = url_array[0]+'//api.xcc-edu.com';
        break;
    case '223.84.156.187:813':
        base_url = url_array[0]+'//223.84.156.187:812';
        break;
    default:
        // base_url = url_array[0]+'//223.84.156.187:806';
        // base_url = 'http:'+'//223.84.156.187:806';
        base_url = 'http:'+'//223.84.156.187:812';
        // base_url = 'http:'+'//47.105.241.14:806';
        // base_url = 'https://api.xcc-edu.com'
}
let head = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Mobile': store.state.user_status.mobile?store.state.user_status.mobile:' ',
    'HToken': store.state.user_status.htoken?store.state.user_status.htoken:' ',
}


  //判断是否为ios端访问
function _IsIOS() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
  }
  //判断是否为android端访问
function _IsAndroid() {
    if (/(Android|Adr)/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}
export default {
    init_head(mobile,htoken) {
        head = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Mobile': mobile,
            'HToken': htoken,
            "PlatformType": "wechat"
        }
    },
    init_head_(mobile,htoken) {
        head = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Mobile': mobile,
            'HToken': htoken,
        }
    },
    ajax_post (url,data,success) {
        console.log(head)
        store.commit('updataCoverComponentStatus',true);
        axios.post(base_url+url,qs.stringify({json: JSON.stringify(data)}),
        {
            headers: head
        }).then(function(res){
            store.commit('updataCoverComponentStatus',false)
            if(res.data.status=='-1') { 
                if(_IsIOS()) {
                    ios.goToBack('该信息不存在');               
                }else if(_IsAndroid()) {
                    android.goToBack('该信息不存在');
                }
                return false;
            }
            
            if(typeof success == 'function'){
                success(res)
            }
          })
          .catch(function(err){
            store.commit('updataCoverComponentStatus',false)

            if(err.response&&err.response.status=='404') {
                if(store.state.wechat) {
                    wx.miniProgram.switchTab({
                        url: '/pages/new/new'
                    })
                    return;
                }

                if(!_DEV_&&_IsAndroid()) {
                    android.toLogin()
                }else if(!_DEV_&&_IsIOS()) {
                    
                    ios.goToLogin()
                }
                
                return false;
            }

            if(!_DEV_&&_IsIOS()) {
                ios.goToBack('系统开了个小差~');               
            }else if(!_DEV_&&_IsAndroid()) {
                android.goToBack('系统开了个小差~');
            }
        })   
    },
    ajax_post_(url,data,success,file) {
        store.commit('updataCoverComponentStatus',true);    
        axios.post(base_url+url,qs.stringify({json: JSON.stringify(data)}),
        {
            headers: head
        }).then(function(res){
                store.commit('updataCoverComponentStatus',false)
                if(typeof success == 'function'){
                    success(res)
                }
            })
            .catch(function(err){
                store.commit('updataCoverComponentStatus',false)
                if(err.response&&err.response.status=='404') {
                    if(store.state.wechat) {
                        wx.miniProgram.switchTab({
                            url: '/pages/new/new'
                        })
                        return;
                    }

                    if(!_DEV_&&_IsAndroid()) {
                        android.toLogin()
                    }else if(!_DEV_&&_IsIOS()) {
                        ios.goToLogin()
                    }
                    return false;
                }
                if(typeof file=='function') {
                    file(err)
                }
            })     
    },
    get_sign(url,data,success,file) {
        store.commit('updataCoverComponentStatus',true);    
        axios.post(url,qs.stringify({json: JSON.stringify(data)}),
        {
            headers: {}
        }).then(function(res){
                store.commit('updataCoverComponentStatus',false)
                if(typeof success == 'function'){
                    success(res)
                }
            })
            .catch(function(err){
                console.log(err)
                store.commit('updataCoverComponentStatus',false)
                if(err.response&&err.response.status=='404') {
                    console.log('404')
                    // if(!_DEV_&&_IsAndroid()) {
                    //     android.toLogin()
                    // }else if(!_DEV_&&_IsIOS()) {
                    //     ios.goToLogin()
                    // }
                    return false;
                }
                if(typeof file=='function') {
                    file(err)
                }
            })     
    },

}
