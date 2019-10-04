<template>
    <div class="wrapper">

        <div class="top"></div>
        <div class="nav flex-row">
            <i class="iconfont icon-zuojiantou" style="font-size:.4rem" @click="$root.back"></i>
            <span>全部评价</span>
            <i class="iconfont icon-fabu" style="font-size:.4rem" @click="to_post_evaluate"></i>
        </div>
        <div class="top-pedestal"></div>
        <div style="height: .2rem"></div>
        <ul class="list" v-show="!headstone_show">
            <yd-infinitescroll :callback="get_evaluate" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <li class="item" v-for="(item) in list" :key="item.main.F_Id">
                <div class="item-head flex-row">
                    <div class="item-user flex-row">
                        <div class="icon" :style="'background:url('+item.main.commentbyheadpic+') center center /cover'"></div>
                        <div class="user-content flex-col">
                            <p style="margin-bottom:.1rem">{{item.main.commentbynickname}}</p>
                            <p>{{$root.transform_time(item.main.commentdate)}}</p>
                        </div>
                    </div>
                    <div class="stars">
                        <span style="color: #B3B3B3">满意度: </span>
                        <i class="iconfont icon-star" v-for="(item,k) in new Array(Math.round(Number(item.main.star)))" :key="k+'s'"></i>
                        <i style="color:#B3B3B3" class="iconfont icon-star" v-for="(item,k) in new Array(5-Math.round(Number(item.main.star)))" :key="k"></i>
                    </div>
                </div>
                <div class="item-content">
                    <p>{{item.main.content}}</p>
                </div>
                <ul class="imgs flex-row">
                    <li class="img" v-for="item_ in item.main.pic" :key="item_.F_Id"
                    :style="'background:url('+item_.filename+');background-size:cover;background-position:center;'"></li>
                </ul>
            </li>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
        </ul>

        <ul class="list" v-show="headstone_show">
            <li class="item" v-for="(item,k) of new Array(6)" :key="k">
                <div class="item-head flex-row">
                    <div class="item-user flex-row">
                        <div class="icon headstone"></div>
                        <div class="user-content flex-col" style="width:2rem">
                            <div class="headstone" style="margin-bottom:.1rem;height:.3rem"></div>
                            <div class="headstone" style="height:.2rem"></div>
                        </div>
                    </div>
                    <div class="stars">
                        <span style="color: #B3B3B3">满意度: </span>
                        <i class="iconfont icon-star" v-for="(item,k) in new Array(Math.round(Number(0)))" :key="k+'s'"></i>
                        <i style="color:#B3B3B3" class="iconfont icon-star" v-for="(item,k) in new Array(5-Math.round(Number(0)))" :key="k"></i>
                    </div>
                </div>
                <div class="item-content">
                    <div class="headstone" style="margin-bottom:.1rem;height:.3rem"></div>
                </div>
            </li>
        </ul>


    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
        return {
            page: 1,
            page_size: 10,
            list: [],
            deactivated: false,
            headstone_show: true
        }
    },
    watch:{},
    computed:{},
    methods:{
        to_post_evaluate() {
            this.$router.push({
                path: '/post_evaluate'
            })
        },
        get_evaluate() {
            this.$http.ajax_post('/api/Family/GetCommentList',{
                Id: this.$route.query.id,
                CurrentPage: this.page++,
                PageSize: this.page_size,
                OrderBy: ''
            },(res)=>{
                this.headstone_show = false;
                this.list = [...this.list,...res.data.data.datalist];
                if(res.data.data.datalist.length<this.page_size) {
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
    activated() {
        if(this.deactivated&&this.$store.state.post_evaluate) {
            this.$store.commit('updataPostEvaluate',false);
            this.$refs.infinitescroll.$emit('ydui.infinitescroll.reInit');
            this.page = 1;
            this.list = [];
            this.get_evaluate();
        }  
    },
    deactivated() {
        this.deactivated = true;
    },
    mounted(){
        this.get_evaluate();
    }
}
</script>
<style lang="scss" scoped>

.list {
    background: #fff;
    padding: .3rem;
    min-height: calc(100vh - 1.6rem)
}
.item {
    text-align: left;
    padding: .46rem 0;
    border-bottom: 1px solid #eee;
}
.item:first-child {
    padding-top: 0;
}
.item-head {
    justify-content: space-between;
    margin-bottom: .2rem;
}
.icon {
    margin-right: .2rem;
    width: .8rem;
    height: .8rem;
    border-radius: .8rem;
}

.user-content {
    font-size: .24rem;
    
}
.stars {

    margin-right: .06rem;
    color: #FF8600
}
.imgs {
    flex-wrap: wrap;
    padding-top: .2rem;
}
.img {
    width: 2rem;
    height: 2rem;
    margin-right: .2rem;
    margin-bottom: .2rem;
}
</style>