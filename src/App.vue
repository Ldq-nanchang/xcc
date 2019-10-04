<template>
  <div id="app">
    <img src="./assets/logo_.png" alt="" class="logo" ref="logo">
    <!-- <iframe id="mainContent" src="weixin://" width="100vw" height="400px"></iframe> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/school_info">school_info</router-link>
      <div>123</div>
    </div> -->

    <!-- <xcc-loading v-show="isLoading"></xcc-loading> -->
    
    <!-- <div>{{$store.state.test_}}</div> -->
    <!-- <yd-button type="primary" @click.native="$root.iosGetUserInfo">ios test</yd-button> -->

    <!-- <div>{{$route.query.id}}{{$route.query.user}}</div> -->
    <keep-alive exclude="gdMap,yd-cityselect">
        <router-view/>
    </keep-alive>
    <!-- <div class="cover-app" v-show="isLoading">
      <img src="./assets/loading.gif" alt="loading.gif">
    </div> -->
    <div class="xcx-home" @click="to_xcx" v-if="$store.state.wechat&&share">
        <img src="./assets/home_ac.png" alt="">    
    </div>
    <yd-backtop></yd-backtop>
    <div v-show="$store.state.htoken_show" style="position:fixed;bottom:1rem;font-size:12px">{{$store.state.user_status.htoken}}</div>
    
    <div class="cover-component" v-show="$store.state.coverComponent"></div>
    <button class="OpenInAppButton" v-show="$route.query.open" @click="$root.to_open_app">App 内打开</button>
    
  </div>
</template>

<script>

import {BackTop} from 'vue-ydui/dist/lib.rem/backtop';
import loading from '@/components/public/loading.vue';
export default {
  components:{
    "yd-backtop": BackTop,
    "xcc-loading": loading
  },
  props:{},
  data(){
    return {
      
    }
  },
  watch:{
    "$root.android_data_school_teacher": function(n) {
      switch(n[0]) {
        case '01':
          this.to_school_info('school_info',n[1],n[0])
          break;
        case '02':
          this.to_school_info('school_info',n[1],n[0])
          break;
        case '03':
          this.to_school_info('school_info',n[1],n[0])
          break;
        case '04':
          this.to_school_info('school_info',n[1],n[0])
          break;
        case '05':
          this.to_school_info('organization_info',n[1],n[0])
          break;
        case '06':
          this.to_school_info('teacher_info',n[1],n[0])
          break;
        case '07':
          this.to_school_info('teacher_info',n[1],n[0])
          break;
      }    
    }
  },
  computed:{
    share() {
        return window.location.href.split('share=')[1];
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods:{
    to_xcx() {
        wx.miniProgram.switchTab({
            url: '/pages/index/index'
        })
    },

    to_school_info(address,id,type_id) {
      this.$router.push({
        path: '/'+address,
        query: {
          id: id,
          type_id: type_id
        }
      });
    },
    // to_open_app() {
    //     let url = window.location.href.split('&');
    //         url  = url.slice(0,url.length-1);
    //         url = url.join('&')
    //         url = 'xcc://m.xcc-edu.com/'+'#'+url.split('#')[1];
    //         sessionStorage.setItem('url',url);
    //         if(this.$root.share_url_=='http://share.xcc-edu.com/?#') {
    //             window.location.href = 'http://share.xcc-edu.com/open_app.html';
    //         }else if(this.$root.share_url_=='http://223.84.156.187:807/?#') {
    //             window.location.href = 'http://223.84.156.187:807/open_app.html';
    //         }
                     
    // },
  },
  created(){

  },
  beforeMount() {

  },
  mounted(){
    // window.location.href="https://www.baidu.com/"
    // document.getElementsByTagName('body').clientHeight = document.getElementById('app').clientHeight;
    // alert(this.$store.state.user_status.htoken)
    // switch(this.$root.obj_type) {
    //   case 'development':
    //     this.$router.push({
    //       path: "/test_view"
    //     });
    //     break;
    //   case 'production':
    //     this.$router.push({
    //       path: "/test_view"
    //     });
    //     break;
    // }
    // alert(navigator.userAgent)


    this.$store.commit('updataLogo',this.$refs.logo.src)
  },

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.cover-app {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #fff;
  text-align: center;
  line-height: 100vh;
}
.cover-app img {
  width: 3rem;
}
.logo {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.fold-enter-active, .fold-leave-active {
    transition: all .5s;
}
.fold-enter, .fold-leave-active {
    transform: translate(-50%, -100px);
}
.xcx-home {
    border: 1px solid #34C3CB;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: hsla(0,0%,100%,.85);

    left: 5%;
    bottom: 70px;

    position: fixed;
    justify-content: center;
    z-index: 1000;
    align-items: center;
    -webkit-box-pack: center;
    display: flex;
    -webkit-box-align: center;
}
.xcx-home img {
    width: .8rem;
}
</style>
