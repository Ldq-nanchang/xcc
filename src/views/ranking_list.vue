<template>

    <div class="wrapper">
        <div class="ranking-head-wrapper">
            <div class="ranking-head flex-row">
                <div class="ranking-head-info">
                    <span>{{ranking_list_title}}</span>
                </div>
            </div>
        </div>
        <div class="ranking-list-top">
            <div></div>
        </div>
        <div class="ranking-list-wrapper">
            <ul class="ranking-list" v-show="!headstone_show">
            <yd-infinitescroll :callback="get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
                <li class="ranking-item flex-row" v-for="(item,k) in list" :key="item.f_id" @click="to_school_info(item)">
                    <div class="ranking-item-index flex-row" v-if="k>2">{{k+1}}</div>
                    <div class="ranking-item-index flex-row" v-if="k==0">
                        <div class="ranking-item-first"></div>
                    </div>
                    <div class="ranking-item-index flex-row" v-if="k==1">
                        <div class="ranking-item-second"></div>
                    </div>
                    <div class="ranking-item-index flex-row" v-if="k==2">
                        <div class="ranking-item-third"></div>
                    </div>
                    <div :class="k?'ranking-item-content flex-row':'ranking-item-content flex-col'">
                        <div class="ranking-item-icon"
                        :style="'background:url('+item.logo+') center center /cover'"></div>
                        <div class="ranking-item-info" :style="!k?'text-align:center;':''">
                            <div><span :style="!k?'color:#FF5B7B':''">{{item.name}}</span></div>
                            <div><span>{{item.ordertarget}}</span></div>
                        </div>
                    </div>
                </li>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
            </ul>

            <ul class="ranking-list" v-show="headstone_show">
                <li class="ranking-item flex-row" v-for="(item,k) in new Array(6)" :key="k">
                    <div class="ranking-item-index flex-row" v-if="k>2">{{k+1}}</div>
                    <div class="ranking-item-index flex-row" v-if="k==0">
                        <div class="ranking-item-first"></div>
                    </div>
                    <div class="ranking-item-index flex-row" v-if="k==1">
                        <div class="ranking-item-second"></div>
                    </div>
                    <div class="ranking-item-index flex-row" v-if="k==2">
                        <div class="ranking-item-third"></div>
                    </div>
                    <div :class="k?'ranking-item-content flex-row':'ranking-item-content flex-col'">
                        <div class="ranking-item-icon headstone"></div>
                        <div class="ranking-item-info">
                            <div class="headstone" style="height:.3rem"><span></span></div>
                            <div class="headstone" style="height:.3rem"><span></span></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    components:{},
    props:{},
    data(){
        return {
            ranking_list_title: '',
            page: 1,
            page_size: 10,
            list:[],
            top: 'empty',
            headstone_show: true
        }
    },
    watch:{},
    computed:{},
    methods:{
        to_school_info(item) {
            this.$router.push({
                path: '/school_info',
                query: {
                    id: item.f_id,
                    type_id: item.periodcode,
                    open: 'browser'
                }
            })
        },
        get_list() {
            this.$http.ajax_post('/api/School/GetRankDetail',{
                Id: this.$route.query.id,
                CurrentPage: this.page++,
                PageSize: this.page_size,
                OrderBy: ''
            },(res)=>{
                this.headstone_show = false;
                if(this.page==2) {
                    this.ranking_list_title = res.data.data.baseinfo.title;
                }
                this.list = [...this.list,...res.data.data.datalist];
                if (res.data.data.datalist.length<this.page_size) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');  
            })
        }
    },
    created(){},
    activated() {

    },
    mounted(){
        // this.get_list();
    },
    activated() {
        this.get_list();
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper{
    background: linear-gradient(to right,#34C3CB,#40D6BE);
    // height: 100vh;
    padding-top:  3.4rem;
}
.ranking-head-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
    width: 100%;
    height: 3.4rem;
    padding: 1.4rem 1rem 0 1rem;
    background: linear-gradient(to right,#34C3CB,#40D6BE);
}
.ranking-head {
    // padding-top: 1.4rem;
    align-items: flex-end;
    // margin: 0 1rem;
    height: 2rem;
    width: 100%;
    background: url(../assets/cup.png) top center /cover;
}

.ranking-head-info {
    width: 100%;
    height: .74rem;
    line-height: .74rem;
    background: url(../assets/ranking_head.png) top center /cover;
    color: #fff;
    font-size: .38rem;
}

.ranking-list-top {
    position: fixed;
    top: 3.4rem;
    padding: 0 .3rem;
    width: 100%;
    height: .2rem;
    background: linear-gradient(to right,#34C3CB,#40D6BE);
    z-index: 500;
}
.ranking-list-top div {
    height: .2rem;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
    background: #fff;
    // box-shadow: -4px -4px 10px rgba(128, 128, 128, 0.3);
    
}

.ranking-list-wrapper {
    position: relative;
    margin: 0 .3rem;
    min-height: 100vh;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
    padding-top: .28rem;
    background: #fff;
    box-shadow: 1px 1px 1px 1px rgba(128, 128, 128, 0.3);
}

.ranking-list {  
    padding: 0 .34rem 0 .41rem;
}
.ranking-item-index {
    justify-content: center;
    align-items: center;
    width: .66rem;
    color: #808080;
    font-size: .36rem;
}

.ranking-item-first {
    width: .66rem;
    height: .86rem;
    background: url(../assets/first.jpg) top left / cover;
}
.ranking-item-second {
    width: .42rem;
    height: .56rem;
    background: url(../assets/second.jpg) top left / cover;
}
.ranking-item-third {
    width: .42rem;
    height: .56rem;
    background: url(../assets/third.jpg) top left / cover;
}

.ranking-item-content {
    justify-content: center;
    align-items: center;
    width: calc(100% - .66rem);
    padding: .26rem .1rem;
    border-bottom: 1px solid rgba(0, 130, 251, .2);
    text-align: left;
}
.ranking-item-icon {
    margin-right: .1rem;
    width: .96rem;
    height: .96rem;
    border-radius: .96rem;
}
.ranking-item-info {
    width: calc(100% - .96rem);
}
.ranking-item-info > div:first-child {
    color: #1a1a1a;
    font-size: .34rem;
}
.ranking-item-info > div:last-child {
    color: #808080;
    font-size: .26rem;
    margin-top: .1rem;
}
</style>