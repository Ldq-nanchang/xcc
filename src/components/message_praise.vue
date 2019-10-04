<template>
    <div class="wrapper">
        <!-- <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$router.back()"></i>
            <span>收到的赞</span>
            <i></i>
        </div> -->
        <!-- <div class="top-pedestal"></div>
        <div style="height: .2rem"></div> -->
        <div class="list">
            <yd-infinitescroll :callback="get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <div class="item flex-row" v-for="item in list" :key="item.F_Id"
            @click="to_comment_info(item)">
                <div class="icon" @click.stop="$root.person_page(item.commentbymobile,item.commentby)" :style="item.background"></div>
                <div class="right">
                    <div class="flex-row">
                        <span class="name">{{item.commentbynickname}}</span>
                        <span class="date">{{item.commentdate}}</span>
                    </div>
                    <div class="return-info">
                       <span>赞了我的评论</span> 
                    </div>
                    <div class="topic" v-if="item.name">
                        <span>{{item.name}}</span>
                    </div>
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
        "yd-infinitescroll": InfiniteScroll,
    },
    props:{},
    data(){
        return {
            page: 1,
            list: [],
            headstone_show: true
        }
    },
    watch:{},
    computed:{},
    methods:{
        to_comment_info(item) {
            // this.$router.push({
            //     path: '/comment_info?id=' + item.parentid
            // })
            this.$root.native_comment_info(item.parentid);
        },
        get_list() {
            this.$http.ajax_post('/api/My/ReceivePraiseList',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: 8,
                OrderBy: ''
            },(res)=>{
                this.headstone_show = false;
                this.list = [...this.list,...res.data.data.datalist];
                for(let item of this.list) {
                    item.background = `background:url('${item.commentbyheadpic}');background-size:cover;background-position:center;`
                }
                if (res.data.data.datalist.length == 0||this.list.length<8) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad'); 
            })
        }
    },
    created(){},
    mounted(){
        this.get_list();
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    min-height: calc(100vh - .4rem);
}
.nav- {
    font-size: .34rem;
}
.nav- i {
    padding-right: .4rem;
    font-size: .4rem;
}

.list {
    padding: .58rem .3rem;
    background: #fff;
    min-height: calc(100vh - 1.6rem)
}
.item {
    margin-bottom: .6rem;
    text-align: left;
}
.item:active {
    opacity: .7
}
.icon {
    width: 1rem;
    height: 1rem;
    margin-right: .2rem;
    border-radius: 1rem;
    overflow: hidden;
}
.icon img {
    width: 100%;
}
.right {
    width: calc(100% - 1.2rem)
}
.right > div:first-child {
    justify-content: space-between;
    align-items: center;
}
.name {
    font-size: .34rem;
    color: #010101;
}
.date {
    color: #999;
}
.return-info {
    font-size: .26rem;
    color: #4D4D4D;
    margin-top: .2rem;
    margin-bottom: .06rem;
}
.topic {
    padding: .06rem .3rem;
    background: #EBF0F2;
    color: #808080;
    font-size: .26rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>