<template>
    <div class="wrapper">
        <div class="title flex-row">
            <span>评价</span>
            <div class="all" v-if="$route.query.type_id!='10'">
                <span v-if="list.length>3" @click="to_evaluate_list">查看全部</span>
                <span v-else @click="to_post_evaluate">发布评价</span>
            </div>
            
        </div>
        <ul class="list" v-if="list.length>0">
            <li class="item" v-for="(item,k) in list" :key="item.main.F_Id" v-show="k<3">
                <div class="item-head flex-row">
                    <div class="item-user flex-row">
                        <div class="icon" :style="'background:url('+item.main.commentbyheadpic+');background-size:cover;background-position:center;'"></div>
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
        </ul>
        <div v-else>
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
        return {
            list: []
        }
    },
    watch:{},
    computed:{},
    methods:{
        to_evaluate_list() {
            if(this.$store.state.wechat) {
                return;
            }
            this.$router.push({
                path: '/evaluate_list?id='+this.$route.query.id
            })
        },
        to_post_evaluate() {
            if(this.$store.state.wechat) {
                return;
            }
            this.$router.push({
                path: '/post_evaluate'
            })
        },
        get_evaluate() {
            this.$http.ajax_post_('/api/Family/GetCommentList',{
                Id: this.$route.query.id,
                CurrentPage: 1,
                PageSize: 6,
                OrderBy: ''
            },(res)=>{
                if(this.$store.state.post_evaluate) {
                    this.$store.commit('updataPostEvaluate',false)
                }

                if(res.data.status=='-1') {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '新闻列表加载失败',
                    });
                    return false;
                }
                this.list = res.data.data.datalist;
            },(err)=>{
                if(this.$store.state.post_evaluate) {
                    this.$store.commit('updataPostEvaluate',false)
                }
                this.$dialog.alert({
                    title: '温馨提示',
                    mes: '新闻列表请求失败',
                });
            })
        }
    },
    created(){},
    mounted(){
        // this.get_evaluate();
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    padding: .3rem;
    background: #fff;
    text-align: left;
}
.title {
    position: relative;
    align-items: center;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin-bottom: 0.4rem;
}
.title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem; 
}
.all {
    position: absolute;
    right: 0;
    top: 0;
    color: #34c3cb;
    font-size: .26rem;
}
.all:active {
    opacity: .7;
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