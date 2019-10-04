<template>
    <div class="wrapper">
        <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span>我的订单</span>
            <i>&nbsp;</i>
        </div>

        <ul class="order-list">
            <yd-infinitescroll :callback="get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <li class="order-item" v-for="item in list" :key="item.F_Id">
                <div class="order-title flex-row">
                    <span>订单编号:{{item.orderno}}</span>
                    <span class="theme-color">{{item.statusname}}</span>
                </div>
                <div class="order-content flex-row">
                    <div class="goods-img" :style="'background:url('+item.headpic+') center center /cover'"></div>
                    <div class="goods-des">
                        <div class="goods-name">
                            <span>{{item.ordername}}</span>
                        </div>
                        <div class="goods-pic">
                            <span> {{item.score}} + <span style="font-size:.2rem">￥</span>{{item.price?item.price:0}}</span>
                        </div>
                        <div class="goods-num">
                            <span><span style="font-size:.2rem">×</span> 1</span>
                        </div>
                    </div>
                </div>
                <div class="order-foot">
                    <span>
                        <span>共1件商品 合计:</span>
                        <span class="theme-color"> {{item.score}} + <span style="font-size:.2rem">￥</span>{{item.price?item.price:0}}</span>
                    </span>
                </div>
                <div class="order-bottom flex-row" v-if="item.statusname=='待支付'">
                    <yd-button class="margin-rt-026"  type="hollow" @click.native="_del_order(item)">取消订单</yd-button>
                    <yd-button type="danger" bgcolor="#34C3CB" color="#fff" @click.native="_order_pay(item)">立即支付</yd-button>
                </div>
            </li>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
        </ul>
        <yd-popup v-model="show_window" position="bottom" height="3rem">
            <div class="window-title">请选择支付方式</div>
            <div class="window-btn" @click="order_pay('wxpay')">
                <i class="iconfont icon-weixinzhifu2 margin-rt-03" style="font-size:.36rem;color:#01AF00"></i>
                <span>微信支付&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div style="background: #eee;height:.1rem"></div>
            <div class="window-btn" @click="order_pay('alipay')">
                <i class="iconfont icon-zhifubaozhifu margin-rt-03" style="font-size:.36rem;color:#00AAEF"></i>
                <span>支付宝支付</span>
            </div>
        </yd-popup>
    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
        return {
            page: 1,
            list: [],
            item: {},
            show_window: false,
        }
    },
    watch:{},
    computed:{},
    methods:{
        _del_order(item) {
            this.$dialog.confirm({
                title: '温馨提示',
                mes: '确定取消该订单吗？',
                opts: () => {
                    this.del_order(item)
                }
            });
        },
        del_order(item) {
            this.$http.ajax_post('/api/My/DeleteOrder',{
                orderno: item.orderno
            },(res)=>{
                switch(res.data.status) {
                    case '0000':
                        this.$dialog.toast({
                            mes: '取消成功',
                            timeout: 1000,
                            icon: 'success',
                            callback: ()=>{
                                for(let i=0;i<this.list.length;i++) {
                                    if(this.list[i].orderno == item.orderno) {
                                        this.list[i].statusname = '已取消'
                                    }
                                }
                            }
                        })
                        break;
                    case '0001':
                        this.$dialog.toast({
                            mes: '取消失败',
                            timeout: 1000,
                            icon: 'error'
                        })
                        break;
                    case '0002':
                        this.$dialog.toast({
                            mes: '取消失败~',
                            timeout: 1000,
                            icon: 'error'
                        })
                        break;
                }
            })
        },
        _order_pay(item) {
            this.item = item,
            this.show_window = true;
        },
        order_pay(pay_type) {
            this.show_window = false;
            if(this.$root._IsAndroid()) {
                android.startPayToolByOrder(this.item.orderno,pay_type)
            }else if(this.$root._IsIOS()) {
                this.$IOS.startPayToolByOrder(this.item.orderno,pay_type)
            }
        },
        get_list() {
            this.$http.ajax_post('/api/My/GetMyOrderList',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: 8,
                OrderBy: ''
            },(res)=>{
                
                this.list = [...this.list,...res.data.data.datalist];
                if (res.data.data.datalist.length == 0||this.list.length<9) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');  
            },(err)=>{})
        }
    },
    created(){
        this.$root.init_nav();
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
// .wrapper{}
.nav- {

    font-size: .34rem;
}
.nav- i {
    padding-right: .4rem;
    font-size: .4rem;
}

.order-list {
    margin-top: 1.6rem;
}
.order-item {
    padding: .2rem 0;
    background: #fff;
    font-size: .28rem;
    margin-bottom: .2rem;
}
.order-title {
    justify-content: space-between;
    margin-bottom: .2rem;
    padding: 0 .3rem;
}
.order-content {
    align-items: center;
    padding: .2rem .3rem;
    background: #FAFAFA;
}
.goods-img {
    width: 1.4rem;
    height: 1.4rem;
     
    margin-right: .2rem;
    
}
.goods-des {
    width: calc(100% - 1.6rem);
}
.goods-name {
    height: .7rem;
    // padding-top: 2px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: left;
}
.goods-pic {
    margin-top: .2rem;
    text-align: right;
}
.goods-num {
    text-align: right;
    color: #999;
}
.order-foot {
    padding: .26rem .3rem;
    background: #fff;
    text-align: right;
}
.order-bottom {
    justify-content: flex-end;
    padding: 0 .3rem;
    padding-top: .3rem;
    border-top: 1px solid #E6E6E6;
}
</style>