<template>
    <div class="wrapper">
        <div class="top-"></div>
        <div class="nav- flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span>提交订单</span>
            <i>&nbsp;</i>
        </div>
        <div style="background:#fff" v-if="$store.state.pay_order.goods.dummy">
        <div class="address flex-row" @click="select_address">
            <div style="width:calc(100% - .8rem)" v-if="$store.state.pay_order.address.F_Id">
                <div class="margin-bt-02">
                    <span class="margin-rt-03">{{$store.state.pay_order.address.receiveby}}</span>
                    <span>{{$store.state.pay_order.address.mobile}}</span>
                </div>
                <div class="address-info">
                    <span class="theme theme-color margin-rt-026" v-if="$store.state.pay_order.address.isdefault">默认</span>
                    <span>{{$store.state.pay_order.address.address}}</span>
                </div>
            </div>
            <div v-else class="select-address" @click="select_address">
                <span>去设置收货地址</span>
            </div>
            <div class="address-edit flex-row">
                <i class="iconfont icon-zuojiantou"></i>
            </div>
        </div>
        </div>
        <div class="pay-order">
            <div class="goods flex-row">
                <div class="goods-img" :style="'background-size: cover;background:url('+$store.state.pay_order.goods.headpic+');background-size:cover;background-position:center;'"></div>
                <div class="goods-des">
                    <div class="goods-name">
                        <span>{{$store.state.pay_order.goods.productname}}</span>
                    </div>
                    <div class="goods-pic">
                        <span> {{$store.state.pay_order.goods.score}} + <span style="font-size:.2rem">￥</span>{{$store.state.pay_order.goods.price}}</span>
                    </div>
                    <div class="goods-num">
                        <span><span style="font-size:.2rem">×</span> 1</span>
                    </div>
                </div>
            </div>
            <ul class="cost-list">
                <li class="cost-item flex-row">
                    <span>合计</span>
                    <span class="theme-color"> {{$store.state.pay_order.goods.score}} + <span style="font-size:.2rem">￥</span>{{$store.state.pay_order.goods.price}}</span>
                </li>
                <li class="cost-item flex-row">
                    <span>运费</span>
                    <span class="theme-color"><span style="font-size:.2rem">￥</span>0</span>
                </li>
                <li class="cost-item flex-row">
                    <span>实付金额</span>
                    <span class="theme-color"> {{$store.state.pay_order.goods.score}} + <span style="font-size:.2rem">￥</span>{{$store.state.pay_order.goods.price}}</span>
                </li>
            </ul>
        </div>
        <div class="pay-type" v-if="$store.state.pay_order.goods.price>0">
            <div class="pay-type-item">
                <span>选择支付方式:</span>
            </div>
            <div class="pay-type-item flex-row" v-show="!$root._IsIOS()">
                <span>
                    <i class="iconfont icon-weixinzhifu2 margin-rt-03" style="font-size:.36rem;color:#01AF00"></i>
                    <span>微信支付</span>
                </span>
                <yd-checkbox color="#34C3CB" v-model="pay_type">&nbsp;</yd-checkbox>
            </div>
            <div style="position:relative">
                <div class="pay-type-item flex-row">
                    <span>
                        <i class="iconfont icon-zhifubaozhifu margin-rt-03" style="font-size:.36rem;color:#00AAEF"></i>
                        <span>支付宝支付</span>
                    </span>
                    <yd-checkbox color="#34C3CB" v-model="pay_type_">&nbsp;</yd-checkbox>
                </div>
                <div class="pay-type-cover" v-if="$root._IsIOS()"></div>
            </div>

        </div>
        <div class="to-pay" @click="to_pay">
            <span>提交订单</span>
        </div>
    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
        return {
            pay_type: true,
            pay_type_: false,
        }
    },
    watch:{
        pay_type(n) {

            if(n) {
                this.pay_type_ = false;
            }else {
                this.pay_type_= true;
            }
        },
        pay_type_(n) {

            if(n) {
                this.pay_type = false;
            }else {
                this.pay_type= true;
            }
        }
    },
    computed:{

    },
    methods:{
        to_pay() {
            if(this.$store.state.pay_order.goods.dummy==1&&!this.$store.state.pay_order.address.F_Id){
                this.$dialog.toast({
                    mes:'请选择地址',
                    timeout: 1000
                })
                return;
            }
            let mobile = this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'';
            let courier_id = this.$store.state.pay_order.address.F_Id?this.$store.state.pay_order.address.F_Id:'';
            let goods_id = this.$store.state.pay_order.goods.F_Id;
            let pay_type = '';
            if(this.$store.state.pay_order.goods.price<=0) {
                pay_type = '';
            }else {
                pay_type = this.pay_type?'wxpay':'alipay';
            }
            if(!this.$store.state.pay_order.goods.dummy) {
                courier_id = '';
            }
            
            this.$root.pay(mobile,courier_id,goods_id,pay_type);
            // this.$http.ajax_post('/api/My/SaveOrder',{
            //     Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
            //     HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
            //     productid: this.$store.state.pay_order.goods.F_Id,
            //     deliverid: this.$store.state.pay_order.address.F_Id?this.$store.state.pay_order.address.F_Id:''
            // },(res)=>{
            //     console.log(res.data.data)
            //     if(this.$store.state.pay_order.goods.price>0) {
            //         console.log(JSON.stringify(res.data.data))
            //     }else {
            //         console.log(JSON.stringify(res.data.data))
            //         this.$router.push({path:'/order_list'})
            //     }

            // },(err)=>{
            //     this.$dialog.alert({
            //         mes: '请重新提交'
            //     })
            // })

        },  
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
        select_address() {
            this.$store.commit('updataPayOrder',(pay_order)=>{
                pay_order.pay_type = this.pay_type;
                pay_order.pay_type_ = this.pay_type_;
            });

            this.$router.push({
                path:'/address_list',
            })
        }

    },
    created(){
        this.$root.init_nav();
    },
    mounted(){
  
    },
    activated() {
        this.$nextTick(()=>{
        if(this.$root._IsIOS()) {
            this.pay_type = false;
            this.pay_type_ = true;
        }
        })

        if(!this.$store.state.pay_order.address.F_Id) {
            this.get_address()
        }else {
            this.pay_type = this.$store.state.pay_order.pay_type;
            this.pay_type_ = this.$store.state.pay_order.pay_type_;
        } 
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    font-size: .28rem;
}
.top- {
    height: .4rem;
    background: #fff;
}
.nav- {
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    background: #fff;
    padding: 0 .3rem;
    font-size: .34rem;
}
.nav- i {
    padding-right: .4rem;
    font-size: .4rem;
}
.address {
    padding: .3rem;
    margin: .2rem 0;
    text-align: left;
    font-size: .28rem;
    background: #ffffff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURf///4u16Oxtbezz/J3B7NDh9vvd3fSmprjS8vGNje57e/jDw/7w8IQ3dnAAAABSSURBVCjPY2CAAG4l7GADVJ4hUBArEIXJJ2HXrw6TZ8auX7ABKs+zCLsBE2AGmGDXLwKT58SuX+sATIEjdgOcYfJF2A1Qg8lz4PCBwWgQUiMIAWCaOFG2MdFRAAAAAElFTkSuQmCC) bottom repeat-x; 
    background-size:64px 5px;
}
.address:active {
    opacity: .7;
}
.select-address {
    line-height:1rem;
    width:calc(100% - .8rem)
}

.address-edit {
    align-items: center;
    transform: rotateZ(-180deg);
    width: .8rem;
}
.theme {
    border: 1px solid #34C3CB;
    border-radius: 4px;
    padding: .02rem .1rem;
    padding-bottom: 0;
}

.pay-order {
    background: #fff;
    padding: .3rem;
    margin-bottom: .2rem;
    text-align: left;
}
.goods {
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
    height: .8rem;
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
.cost-item {
    padding: .3rem;
    justify-content: space-between;
    border-bottom: 1px solid #E6E6E6;
    font-size: .26rem;
}
.cost-item:last-child {
    border-bottom: 1px solid transparent;
}

.pay-type {
    background: #fff;
    text-align: left;
    margin-bottom: 2rem;
}
.pay-type-item {
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: .3rem;
    border-bottom: 1px solid #E6E6E6;
}
.pay-type-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    
}
.pay-type-item:last-child {
    border-bottom: 1px solid transparent;;
}
.to-pay:active {
    opacity: .7;
}
.to-pay {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1rem;
    width: 100vw;
    line-height: 1rem;
    background: #34C3CB;
    color: #fff;
    font-size: .34rem;
}
</style>