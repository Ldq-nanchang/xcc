<template>
    <div class="wrapper">
        <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$router.back()"></i>
            <span>水滴明细</span>
            <i></i>
        </div>
        <div class="top-pedestal"></div>
        <div style="height: .2rem"></div>
        <div class="list">
            <yd-infinitescroll :callback="get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <div class="item flex-row" v-for="item in list" :key="item.F_Id">
                <div class="left">
                    <p class="name">{{item.taskname}}</p>
                    <p class="date">{{item.finishdate}}</p>
                </div>
                <div class="right">
                    <span>+ {{item.score}}</span>
                </div>
            </div>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
        </div>
    </div>
</template>

<script>
import {ListTheme} from 'vue-ydui/dist/lib.rem/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
export default {
    components:{
        "yd-list": ListTheme,
        "yd-infinitescroll": InfiniteScroll
    },
    props:{},
    data(){
        return {
            page: 1,
            list: []
        }
    },
    watch:{},
    computed:{},
    methods:{
        get_list() {
            this.$http.ajax_post('/api/My/MyCompleteTaskList',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: 10,
                OrderBy: ''
            },(res)=>{

                this.list = [...this.list,...res.data.data.datalist];
                if (res.data.data.datalist.length == 0||this.list.length<8) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad'); 
            })
        }
    },
    created(){
        this.$root.init_nav();
    },
    mounted(){
        // this.get_list()
    },
    activated() {
        this.get_list()
    },
    deactivated() {},
}
</script>
<style lang="scss" scoped>

.nav- {
    font-size: .34rem;
    
}
.nav- i {
    font-size: .4rem;
    padding-right: .4rem;
}

.list {
    padding: .3rem;
    background: #fff;
    min-height: calc(100vh - 1.6rem)
}
.item {
    justify-content: space-between;
    align-items: center;
    height: 1.18rem;
    border-bottom: 1px solid #E5E5E5;
    text-align: left;
}
.name {
    font-size: .3rem;
    margin-bottom: .18rem;
}
.date {
    color: #B3B3B3;
}
.right {
    font-size: .4rem;
    color: #3ED3C0;
}
</style>