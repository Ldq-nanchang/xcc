<template>
    <div class="wrapper">
        <div class="heade">
            <div style="height:.4rem"></div>
            <div class="nav- flex-row">
                <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
                <span>水滴兑换</span>
                <!-- <yd-icon name="more"></yd-icon> -->
                <div style="padding-right:1.1rem">&nbsp;</div>
            </div>
            <div class="heade-title">
                <span>推荐</span>
            </div>
            <yd-slider autoplay="3000" style="min-height:7.5rem;">
                <yd-slider-item v-for="item in recommend" :key="item.F_Id" @click.native="to_goods_info(item)">
                    <div style="padding:0 .5rem">
                    <div class="slider-img" :style="'background-size:cover;background:url('+item.headpic+');background-size:cover;background-position:center;'"></div>
                    <div class="slider-content">
                        <div class="slider-good-name">{{item.productname}}</div>
                        <div class="slider-good-pic flex-row">
                            <div>
                                <img src="../assets/water_drop.jpg" alt="">
                            </div>
                            <span>{{item.score}} ＋ ￥{{item.price}}</span>
                        </div>
                    </div>
                    </div>
                </yd-slider-item>
            </yd-slider>
        </div>
        <div style="height:4.5rem"></div>
        <div style="background:#fff">
        <div class="hot-good">
            <div class="hot-title">
                <span>热门</span>
            </div>
            <div class="hot-goods-wrapper">
                <ul class="hot-goods flex-row">
                    <li class="hot-good-item" v-for="item in hot" :key="item.F_Id" @click="to_goods_info(item)">
                        <div class="hot-good-img" :style="'background:url('+item.headpic+') center center /cover'"></div>
                        <div class="hot-good-name">
                            <span>{{item.productname}}</span>
                        </div>
                        <div class="hot-good-pic flex-row">
                            <div style="padding-bottom:.1rem">
                                <img src="../assets/water_drop.jpg" alt="">
                            </div>
                            <span>{{item.score}} ＋ ￥{{item.price}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="new-good">
            <div class="hot-title" style="margin-top:0;">
                <span>最新</span>
            </div>
            <div style="overflow:hidden">
                <ul class="new-goods flex-row">

                    <yd-infinitescroll class="" :callback="water_drop_index" ref="infinitescroll">
                    <yd-list theme="2" slot="list" class="new-goods flex-row" style="padding:0">
                    <li class="new-good-item" v-for="item in news" :key="item.F_Id" @click="to_goods_info(item)">
                        <div class="new-good-img" :style="'background:url('+item.headpic+') center center /cover'"></div>
                        <div class="hot-good-name">
                            <span>{{item.productname}}</span>
                        </div>
                        <div class="hot-good-pic flex-row">
                            <div style="padding-bottom:.1rem">
                                <img src="../assets/water_drop.jpg" alt="">
                            </div>
                            <span>{{item.score}} ＋ ￥{{item.price}}</span>
                        </div>
                    </li>

                    <span slot="doneTip">没有更多数据了~~</span>
                    <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
                    </yd-list>
                    </yd-infinitescroll>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
        return {
            page: 1,
            page_size: 8,
            recommend: [],
            hot: [],
            news: []
        }
    },
    watch:{},
    computed:{},
    methods:{
        water_drop_index() {
            this.$http.ajax_post('/api/My/GetMarketProductList',{
                HToken:this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: this.page_size,
                OrderBy: ''
            },(res)=>{
                if(this.page==2) {
                    this.recommend = res.data.data.recommend;
                    this.hot = res.data.data.hot;
                    this.news = res.data.data.new;
                    return false;
                }

                this.news = [...this.news,...res.data.data.new];
                if (res.data.data.new.length<this.page_size) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');  
            })
        },
        to_goods_info(item) {
            this.$router.push({
                name: 'goods_info',
                params: {
                    goods_info: item
                }
            })
        }
    },
    created(){
        this.$root.init_nav();
    },
    mounted(){
        // this.water_drop_index();
    },
    activated() {
        this.water_drop_index();
    },
    deactivated() {},
}
</script>
<style lang="scss" scoped>
// .wrapper{
    
// }
.heade {
    height: 6rem;
    // padding: .3rem;
    background: linear-gradient(to top, #34C3CB, #3FD4BF);
    color: #fff;
}
.nav- i:first-child {
    font-size: .4rem;
    padding-right: .8rem;
}
.nav- {
    justify-content: space-between;
    align-items: center;
    font-size: .34rem;
    padding: 0 .3rem
}
.heade-title {
    padding: .3rem .3rem;
    font-size: .6rem;
    text-align: left;

}
.slider-img {
    height: 5.7rem;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
}
.slider-content {
    padding: .3rem .3rem .2rem .3rem;
    background: #fff;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
}
.slider-good-name {
    color: #1a1a1a;
    font-size: .34rem;
    margin-bottom: .2rem;
    text-align: left;
    height: .9rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.slider-good-pic {
    align-items: center;
    color: #3FD4BF;
    font-size: .36rem;
}
.slider-good-pic img {
    width: .25rem;
    vertical-align: middle;
    margin-right: .15rem;
}

.hot-title {
    margin-top: 1.2rem;
    font-size: .5rem;
    text-align: left;
    padding-top: .2rem;
    padding-left: .5rem;
}
.hot-goods-wrapper {
    width: 100vw;
    padding: .2rem 0 .9rem .5rem;
    overflow: scroll;
}

.hot-good-item {
    width: 2.6rem;
    margin-right: .35rem;
    background: #fff;
}
.hot-good-img {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 4px;
}
.hot-good-name {
    padding: .15rem;
    font-size: .26rem;
    height: .85rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: left;
}
.hot-good-pic {
    align-items: center;
    color: #3FD4BF;
    font-size: .26rem;
    padding: .15rem;
}
.hot-good-pic img {
    width: .25rem;
    vertical-align: middle;
    margin-right: .15rem;
}

.new-goods {
    flex-wrap: wrap;
    margin-right: -.3rem;
    padding: .2rem .5rem 0 .5rem;
}
.new-good-item {
    width: 3.1rem;
    margin-right: .3rem;
    margin-bottom: .3rem;
    background: #fff;
    border-radius: 4px;
}
.new-good-img {
    width: 3.1rem;
    height: 2rem;
    border-radius: 4px;
}
</style>