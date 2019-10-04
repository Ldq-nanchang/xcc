<template>
    <div class="wrapper">
        <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span>收货地址</span>
            <i>&nbsp;</i>
        </div>
        <ul class="address-list">
            <li class="address-item flex-row" v-for="item in list" :key="item.F_Id">
                <div class="address-item-content" @click="select_address(item)">
                    <div class="address-user">
                        <span class="margin-rt-03">{{item.receiveby}}</span>
                        <span style="color:#999">{{item.mobile}}</span>
                    </div>
                    <div class="address-info">
                        <span v-if="item.isdefault" class="theme theme-color margin-rt-026">默认</span>
                        <span>{{item.address}}</span>
                    </div>
                </div>
                <div class="address-edit flex-col">
                    <!-- <i class="iconfont icon-zuojiantou"></i> -->
                    <div style="border-left: 1px solid #eee;">
                        <i @click="address_edit(item)">编辑</i>
                        <div style="height:.3rem"></div>
                        <i @click="del_address_(item)">删除</i>
                    </div>

                </div>
            </li>
            <li style="height:1rem"></li>
        </ul>
        <div class="add-address" v-show="list.length<9">
            <div class="add-address-btn" @click="address_edit({})">
                <span>新增收货地址</span>
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
            list: []
        }
    },
    watch:{},
    computed:{},
    methods:{
        select_address(item) {

            this.$store.commit('updataPayOrder',(pay_order)=>{
                pay_order.address = item;
            })
            // this.$router.replace({path: '/'+this.$store.state.address_before});
            this.$router.back();
            
        },
        address_edit(item) {
            if(item.F_Id) {
                this.$router.push({
                    name: 'address_edit',
                    params: {
                        item: item
                    }
                })
            }else {
                this.$router.push({
                    path: '/address_edit'
                })
            }

        },
        get_list() {
            this.$http.ajax_post('/api/My/GetMyDeliverys',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
            },(res)=>{
                this.list = res.data.data.datalist;
            })
        },
        del_address_(item) {
            let that = this;
            this.$dialog.confirm({
                title: ' ',
                mes: '确定要删除该地址吗？',
                opts: () =>{
                    that.del_address(item);
                }
            });
        },
        del_address(item) {
            this.$http.ajax_post('/api/My/DelMyDeliverys',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                F_Id: item.F_Id
            },()=>{
                for(let i=0;i<this.list.length;i++) {
                    if(item.F_Id==this.list[i].F_Id) {
                        this.list.splice(i,1);
                    }
                }
            },()=>{
                this.$dialog.toast({
                    mes: '删除失败',
                    timeout: 1000,
                    icon: 'error',
                });
            })
        },
    },
    created(){
        this.$root.init_nav();
    },
    mounted(){
        
    },
    activated() {
        if(this.$route.params.init) {
            document.documentElement.scrollTop=0;
            document.body.scrollTop=0;
        }
        this.get_list()
    }
}
</script>
<style lang="scss" scoped>
// .wrapper{
//     font-size: .8rem;
// }
.nav- {
    font-size: .34rem;
    
}
.nav- i {
    padding-right: .4rem;
    font-size: .4rem;
}

.address-list {
    padding: 0 .3rem;
    margin-top: 1.7rem;
    background: #fff;
}
.address-item {
    margin-bottom: .2rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #eee;
    font-size: .28rem;
    text-align: left;
}
.address-item:first-child {
    padding-top: .4rem;
}
.address-item:last-child {
    border-bottom: 1px solid transparent;
}
.address-item-content {
    width: calc(100% - 1rem);
    padding: 0 .3rem;
}
.address-user {
    margin-bottom: .1rem;
    color: #1a1a1a;
}
.address-edit {
    // align-items: center;
    // transform: rotateZ(-180deg);
    // width: .8rem;
    justify-content: center;
}
.address-edit i {
    padding: .05rem 0 .05rem .2rem;
    
    color: #34C3CB;
}
.theme {
    border: 1px solid #34C3CB;
    padding: .02rem .1rem;
    border-radius: 4px;
    padding-bottom: 0
}
.address-info {
    height: .8rem;
    padding-top: 2px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: left;
}
.add-address {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: .2rem .3rem;
    background: #fff;
}
.add-address-btn {
    height: 1rem;
    background: linear-gradient(to right,#34C3CB,#40D6BE);
    border-radius: 4px;
    text-align: center;
    line-height: 1rem;
    color: #fff;
    font-size: .34rem; 
}
.add-address-btn:active {
    opacity: .7;
}
</style>