<template>
    <div class="wrapper">
        <div class="nav- flex-row" :style="'background:rgba(255,255,255,'+nav_opcity+');box-shadow: 1px 1px 1px 1px rgba(238,238,238,'+nav_opcity+')'">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
        </div>
        <div class="banner" :style="'background:url('+goods_info.headpic+') center center /cover'"></div>
        <div class="goods-content">
            <div class="goods-name">
                <span>{{goods_info.productname}}</span>
            </div>
            <div class="goods-pic flex-row">
                <div>
                    <img src="../assets/water_drop.jpg" alt="">
                </div>
                <span style="color:#3FD4BF">{{goods_info.score}} ＋ ￥{{goods_info.price}}</span>
            </div>
            <div class="pransport">
                <div class="address flex-row" @click="to_address_list">
                    <div>
                        <span style="margin-right:.48rem">运送至</span>
                        <span style="color:#B3B3B3">{{$store.state.pay_order.address.address?$store.state.pay_order.address.address:'暂未设置收货地址，立即填写'}}</span>
                    </div>
                    <div style="transform: rotateZ(-180deg)">
                        <i class="iconfont icon-zuojiantou"></i>
                    </div>
                </div>
                <div>
                    <span>运费: 包邮</span>
                </div>
            </div>
        </div>
        <div class="goods-des" v-html="goods_info.des"></div>
        <div style="height: 2.4rem;"></div>
        <div class="acquire">
            <div class="acquire-btn" @click="to_pay">
                <span>马上兑换</span>
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
            goods_info: {},
            add_height: 0,
            nav_opcity: 0,
            address: '暂未设置收货地址，立即填写'
        }
    },
    watch:{
        add_height(n) {
            console.log(n.meta)
            if(n>80) {
                this.nav_opcity = 1;
                return false;
            }
            this.nav_opcity = n/80
        },
    },
    computed:{},
    methods:{
        get_address() {
            this.$http.ajax_post('/api/My/GetMyDeliverys',{
                    Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                    HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                },(res)=>{
                    let list = res.data.data.datalist;
                    for(let item of list) {
                        if(item.isdefault) {
                            this.$store.commit('updataPayOrder',(pay_order)=>{
                                pay_order.address = item;
                            })
                        }
                    }
                })
        },
        to_address_list() {
            this.$router.push({
                name:'address_list',
                params: {
                    init: 1
                }
            })
        },
        handleScroll() {
            if(document.documentElement.scrollTop>document.body.scrollTop) {
                this.add_height = document.documentElement.scrollTop;
            }else {
                this.add_height = document.body.scrollTop;
            }
        },
        to_pay() {
            this.$store.commit('updataPayOrder',(pay_order)=>{
                pay_order.goods = this.goods_info;
            })
            this.$router.push({
                path: '/pay'
            })
        }
    },
    created(){
        this.$root.init_nav();
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll)
    },
    activated() {

        if(this.$route.params.goods_info) {
            document.documentElement.scrollTop=0;
            document.body.scrollTop=0;

            this.$store.commit('updataGoodsInfo',this.$route.params.goods_info);
            this.goods_info = this.$route.params.goods_info;


        }else {
            this.goods_info = this.$store.state.goods_info;
        }
        
        if(!this.$store.state.pay_order.address.F_Id) {
            this.get_address();
        }
    }
}
</script>
<style lang="scss" scoped>
// .wrapper{}
.nav- {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 1.2rem;
    padding: .4rem 0 0 .3rem;
    z-index: 1000;
}
.nav- i {
    font-size: .4rem;
    // color: #fff;
}
.banner {
    height: 5rem;
}
.goods-content {
    padding: .4rem .3rem;
    background: #fff;
    text-align: left;
    margin-bottom: .4rem;
}
.goods-name {
    font-size: .3rem;
    height: .8rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: .4rem;
}
.goods-pic {
    font-size: .4rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #eee;
}
.goods-pic img {
    margin-right: .2rem;
    width: .4rem;
}
.pransport {
    padding-top: .4rem;
    text-align: left;
    font-size: .26rem;
    color:#666;
}
.address {
    justify-content: space-between;
    align-items: center;
    margin-bottom: .76rem;
}
.goods-des {
    background: #fff;
    text-align: left;
    padding: .3rem;
    
}
.acquire {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 2rem;
    padding: .5rem .3rem;
    background: #fff;
    box-shadow: 1px 1px 1px 1px rgb(238,238,238);
}
.acquire-btn {
    height: 1rem;
    background: linear-gradient(to right,#40D6BE,#34C3CB);
    line-height: 1rem;
    border-radius: 4px;
    color: #fff;
    font-size: .34rem; 
}
.acquire-btn:active {
    opacity: .7;
}
</style>