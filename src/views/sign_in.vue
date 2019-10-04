<template>
    <div class="wrapper">
        <div :style="signin_window?'':'display:none'" class="bg-signin" @click="signin_window=false"></div>
        <div class="heade" ref="heade">
            <div style="height: .4rem"></div>
            <div class="nav- flex-row">
                <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
                <span>小水滴</span>
                <span style="font-size:.26rem;padding-right:1.1rem;">&nbsp;</span>
            </div>
            
            <div class="heade-num">
                <span>{{score}}</span>
            </div>
            <div class="calendar-title">
                <span>签到日历</span>
            </div>
            <ul class="calendar-list flex-row">
                <li class="calendar-item flex-col" v-for="(item,k) in sign_in" :key="k">
                    <span v-if='k==days-1'>今天</span>
                    <span v-else>第{{item.name}}</span>
                    <div class="calender-circle flex-row">
                        <span v-if="!item.day">+{{item.score}}</span>
                        <div v-else class="calender-circle-today">
                            <i class="iconfont icon-check"></i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div :class="tabs_fixed?'select-tab fixed flex-row':'select-tab flex-row'">
            <div :class="k==active?'tab-item tab-item-active':'tab-item'"
            :style="k==2?'margin-left:1.42rem;':''"
            @click="select_task(k)" v-for="(item,k) in tabs" :key="k">         
                <span>{{item}}</span>
            </div>
        </div>
       
        <div class="task-list-wrapper" ref="first_task">
            <div class="task-list-title">
                <span>新人任务</span>
            </div>
            <div class="task-list">
                <div class="task-item flex-row" 
                :style="item.isfinish=='0'?'border-left:2px solid '+item.color:'box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0);border-left:2px solid '+item.color"
                v-for="item in tasks" :key="item.F_Id">
                    <div class="flex-row">
                        <div class="task-item-icon">
                            <img :src="item.headpic" alt="">
                        </div>
                        <div class="task-item-content flex-col">
                            <div>
                                <span class="content-title">{{item.taskname}}</span>
                                <span class="content-lab">+ {{item.score}}</span>
                            </div>
                            <div class="content-info"><span>{{item.des}}</span></div>
                        </div>
                    </div>
                    <div class="task-item-btn" v-if="item.isfinish=='0'" @click="do_task(item)">
                        <span>去完成</span>
                    </div>
                    <div class="task-item-state" v-if="item.isfinish=='1'">
                        <span>已完成</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-list-wrapper">
            <div class="task-list-title">
                <span>水池任务</span>
            </div>
            <div class="task-list-foot">
                <div class="task-item flex-row"
                :style="item.isdayfinish=='0'?'border-left:2px solid '+item.color:'box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0);border-left:2px solid '+item.color"
                v-for="(item,index) in day_tasks" :key="item.F_Id">
                    <div class="flex-row">
                        <div class="task-item-icon">
                            <img :src="item.headpic" alt="">
                        </div>
                        <div class="task-item-content flex-col">
                            <div>
                                <span class="content-title">{{item.taskname}}</span>
                                <span class="content-lab">+ {{item.score}}</span>
                            </div>
                            <div class="content-info"><span>{{item.des}}</span></div>
                        </div>
                    </div>
                    <div class="task-item-btn" @click="do_task(item)" v-if="item.isdayfinish=='0'">
                        <span>去完成</span>
                    </div>
                    <div class="task-item-state" v-if="item.isdayfinish=='1'">
                        <span>已完成</span>
                    </div>
                </div>
            </div>
        </div>
         <div :class="signin_window?'show animated zoomInDown':'hidden'">
             <p style="font-size:.3rem;margin-bottom:.4rem">今日已签到</p>
             <p class="theme-color" style="margin-bottom:.3rem">
                 <span style="font-size:.6rem;margin-right:.15rem">+</span>
                 <span class="font-weight" style="font-size:.6rem">{{add_score}}</span>
             </p>
             <p style="color: #999">连续签到可获得更多小水滴哦~</p>
             <div class="circle01"></div>
             <div class="circle02"></div>
         </div>
    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
            return {
                active: 0,
                score: 0,
                days: 0,
                sign_in: [],
                tabs: ['新手任务','水池任务','水滴明细'],
                tabs_fixed: false,
                tasks: [],
                day_tasks: [],
                page: 1,
                is_signin: 1,
                signin_window: false,
                add_score: '',
            }
    },
    watch:{

    },
    computed:{},
    methods:{
        select_task(k) {

            if(k==0) {
                // let timer = setInterval(() => {  
                //     document.body.scrollTop = document.body.scrollTop - 100;
                //     if(document.body.scrollTop<=100) {
                //         clearInterval(timer)
                //     }
                // }, 10);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }else if(k==1) {
                // let height = this.$refs.heade.offsetHeight+this.$refs.first_task.offsetHeight-100
                // let timer_ = setInterval(() => {
                //     document.body.scrollTop = document.body.scrollTop + 100;
                //     if(document.body.scrollTop>=height) {
                //         clearInterval(timer_)
                //     }
                // }, 10);
                document.documentElement.scrollTop = this.$refs.heade.offsetHeight;
                document.body.scrollTop = this.$refs.heade.offsetHeight;
            }else if (k==2) {
                this.$router.push({
                    path: '/signin_detail'
                })
            }
        },
        do_task(item) {
            if(item.url=='doShare()'&&!_DEV_&&this.$root._IsAndroid()) {
                android.doShare();
                return;
            }
            if(item.url=='doShare()'&&!_DEV_&&this.$root._IsIOS()) {
                this.$IOS.goToShare();
                return;
            }
            if(!_DEV_&&this.$root._IsAndroid()) {
                android.intentNative(item.url)
            }
            if(!_DEV_&&this.$root._IsIOS()) {
                this.$IOS.intentNative(item.taskname)
            }
        },
        handleScroll() {
            this.$nextTick(()=>{
                let height = this.$refs.heade.offsetHeight;
                if(document.documentElement.scrollTop>=height||document.body.scrollTop>=height){
                    this.tabs_fixed = true;
                    this.active = 1;
                }else {
                    this.active = 0;
                    this.tabs_fixed = false;
                }
            })
        },
        get_task_list(callback) {
            this.$http.ajax_post('/api/My/MyTaskList',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: 6,
                OrderBy: ''
            },(res)=>{

                this.score = res.data.data.score;
                this.sign_in = res.data.data.signin;
                this.days = res.data.data.days;
                for(let i=0;i<this.sign_in.length;i++) {
                    if(i<res.data.data.days) {
                        this.sign_in[i].day = true;
                    }else{
                        this.sign_in[i].day = false;
                    }
                }
                this.tasks = res.data.data.firsttask;
                this.day_tasks = res.data.data.daystask;
                for(let item of this.tasks) {
                    if(item.des=='完善注册信息') {
                        item.color = '#FDBB59'
                    }else if(item.des=='绑定手机号') {
                        item.color = '#6ED7FB'
                    }else {
                        item.color = '#FDBB59'
                    }
                }
                for(let item of this.day_tasks) {
                    if(item.des=='完善注册信息') {
                        item.color = '#FDBB59'
                    }else if(item.des=='绑定手机号') {
                        item.color = '#6ED7FB'
                    }else if(item.des=='分享APP到微信') {
                        item.color = '#66E5AB'
                    }else if(item.des=='分享APP到朋友圈') {
                        item.color = '#4BDE7F'
                    }else if(item.des=='分享APP到微博') {
                        item.color = '#F17A66'
                    }else {
                        item.color = '#FDBB59'
                    }
                }
                if(typeof callback == 'function') {
                    callback()
                }
                if(res.data.data.days<=7) {
                    this.add_score = this.sign_in[res.data.data.days-1].score;
                }else if(res.data.data.days>7){
                    this.add_score = this.sign_in[6].score;
                }
                
            })
        },
        signin_action() {
            this.$http.ajax_post_('/api/My/SaveSignin',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
            },(res)=>{
                if(res.data.status=='-1') {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '该信息不存在',
                        callback:()=>{
                            this.$root.back();
                        }
                    });
                    return false;
                }
                
                this.get_task_list(()=>{
                    if(res.data.data.issignin == 0) {
                        this.signin_window = true;
                    }   
                })
            },(err)=>{
                console.log(err)
                this.get_task_list()
            })
        }
    },
    created(){
        this.$root.init_nav();
    },
    mounted(){
        // window.addEventListener('scroll', this.handleScroll);
        // this.signin_action()
    },
    activated() {
        window.addEventListener('scroll', this.handleScroll);
        this.signin_action()
    },
    deactivated() {},
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    background: #fff;
    padding-bottom: 1rem;
}
.heade {
    // height: 5.9rem;
    padding: .3rem;
    background: linear-gradient(to top, #34C3CB, #3FD4BF);
    color: #fff;
}
.nav- i {
    font-size: .4rem;
    padding-right: .8rem;
}
.nav- {
    justify-content: space-between;
    align-items: center;
    font-size: .34rem;
}
.heade-num {
    height: 2.16rem;
    text-align: center;
    line-height: 2.16rem;
    font-size: 1rem;
}
.calendar-title {
    border-bottom: 1px solid #fff;
    padding-bottom: .2rem;
    margin-bottom: .42rem;
    font-size: .26rem;
    text-align: left;
}
.calendar-list {
    justify-content: space-between;
}
.calender-circle {
    margin-top: .22rem;
    width: .6rem;
    height: .6rem;
    border-radius: .6rem;
    background: rgba(255, 255, 255, .21);
    justify-content: center;
    align-items: center;
}
.calender-circle-today {
    border-radius: .48rem;
    height: .48rem;
    width: .48rem;
    background: rgba(255, 255, 255, .31);
    line-height: .48rem;
}

.select-tab {
    padding: .5rem .3rem 0 .3rem;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
}
.fixed {
    position: fixed;
    top: 0;
    box-shadow: 1px 1px 1px 1px #eee;
    width: 100vw;
}
.tab-item {
    padding-bottom: .26rem;
    font-size: .3rem;
    color: #666;
    margin-right: .5rem;
}
.tab-item-active {
    color: #34C3CB;
    border-bottom: 2px solid #34C3CB;
}

.task-list-wrapper {
    padding: .5rem .3rem 0 .3rem;
}

.task-list-title {
    margin-bottom: .4rem;
    text-align: left;
    font-size: .4rem;
}
.task-list-title::before {
    content: '';
    display: inline;
    border-right: 4px solid #34C3CB;
    margin-right: .2rem;
}
.task-list-foot {
    min-height: 8rem;
}
.task-item {
    justify-content: space-between;
    align-items: center;
    padding: .34rem .2rem .34rem .36rem;
    margin-bottom: .42rem;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
    border-left: 2px solid #FDBB59;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.task-item-icon {
    margin-right: .3rem;
}
.task-item-icon img {
    width: .9rem;
}
.task-item-content {
    justify-content: space-between;
}
.content-title {
    font-size: .28rem;
    color: #333;
    margin-right: .28rem;
}
.content-lab {
    color: #3ED3C0;
    font-size: .28rem;
    font-weight: bold;
}
.content-info {
    color: #999;
    font-size: .2rem;
    text-align: left;
}

.task-item-btn {
    width: 67px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 32px;
    background: linear-gradient(to right,#40D6BE,#34C3CB);
    color: #fff;
}
.task-item-btn:active {
    opacity: .7;
}
.task-item-state {
    width: 1.22rem;
    text-align: center;
    color: #999;
}
.show {
    position: fixed;
    left: calc(50% - 2.5rem);
    top: calc(50% - 1.12rem);
    width: 5rem; 
    height: 3.24rem;
    background: #fff;
    border-radius: .2rem;
    overflow: hidden;
    padding-top: .7rem;
}
.hidden {
    display: none;
    position: relative;
}
.bg-signin {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3)
}
.circle01 {
    position: absolute;
    left: -2.5rem;
    top: -4rem;
    width: 5rem;
    height: 5rem;
    border-radius: 5rem;
    background: #34C3CB;
}
.circle02 {
    position: absolute;
    right: -3.5rem;
    bottom: -4rem;
    width: 5rem;
    height: 5rem;
    border-radius: 5rem;
    background: #34C3CB;
}
</style>