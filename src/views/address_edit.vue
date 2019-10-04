<template>
    <div class="wrapper">
        <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span>新增收货地址</span>
            <span class="theme-color" style="font-size:.3rem" @click="post_address">保存</span>
        </div>
        <div style="height:1.6rem"></div>
        <div class="edit">
            <yd-cell-group>
                <yd-cell-item>
                    <span color="#000" slot="left">收货人：</span>
                    <yd-input slot="right" type="text" v-model="name" placeholder="请填写收货人姓名"></yd-input>
                </yd-cell-item>
                <div class="line"></div>
                <yd-cell-item>
                    <span color="#000" slot="left">手机号：</span>
                    <yd-input slot="right" v-model="phone" ref="phone" required regex="mobile" placeholder="请输入手机号码"></yd-input>
                </yd-cell-item>
                <div class="line"></div>
                <yd-cell-item arrow>
                    <span color="#000" slot="left">所在地区：</span>
                    <input slot="right" type="text"
                    @click.stop="show = true" v-model="address" readonly placeholder="请选择收货地址">
                </yd-cell-item>
                <div class="line"></div>
                <yd-cell-item>
                    <yd-textarea slot="right" v-model="address_detail" placeholder="请输入您的详细地址" maxlength="100"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        <div class="switch flex-row">
            <span>设为默认地址</span>
            <yd-switch v-model="switch_"></yd-switch>
        </div>
        <!-- <div class="del_address flex-row" @click="del_address_" v-if="$route.params.item">
            <span class="theme-color">删除收货地址</span>
        </div> -->

        <yd-cityselect v-if="city_select"
        v-model="show" :callback="result" :items="district" :provance="provance" :city="city" :area="area"></yd-cityselect>
        
    </div>
</template>

<script>
import District from 'ydui-district/dist/gov_province_city_area_id';

export default {
    components:{},
    props:{},
    data(){
        return {
            name: '',
            phone: null,
            show: false,
            district: District,
            address: '',
            address_detail: '',
            switch_: false,
            provance: '',
            city: '',
            area: '',
            city_select: true
        }
    },
    watch:{},
    computed:{},
    methods:{
        result(ret) {
            this.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
        },
        // del_address_() {
        //     let that = this;
        //     this.$dialog.confirm({
        //         title: ' ',
        //         mes: '确定要删除该地址吗？',
        //         opts: () =>{
        //             that.del_address();
        //         }
        //     });
        // },
        // del_address() {
        //     this.$http.ajax_post('/api/My/DelMyDeliverys',{
        //         Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
        //         HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
        //         F_Id: this.$route.params.item.F_Id
        //     },(res)=>{
        //         this.$router.back();
        //     },(err)=>{
        //         this.$dialog.toast({
        //             mes: '删除失败',
        //             timeout: 1000,
        //             icon: 'error',
        //         });
        //     })
        // },
        post_address() {
            if(!this.name) {
                this.$dialog.toast({
                    mes: '请输入收货人姓名',
                    timeout: 1000
                });
                return false;
            }
            if(!this.$refs.phone.valid) {
                this.$dialog.toast({
                    mes: '请输入正确的手机号码',
                    timeout: 1000
                });
                return false;
            }
            if(!this.address) {
                this.$dialog.toast({
                    mes: '请选择城市',
                    timeout: 1000
                });
                return false;
            }
            if(!this.address_detail) {
                this.$dialog.toast({
                    mes: '请输入详细地址',
                    timeout: 1000
                });
                return false;
            }
            this.$dialog.loading.open('正在提交')
            this.$http.ajax_post('/api/My/SaveMyDeliverys',{
                mobile: this.phone,
                F_Id: this.$route.params.item?this.$route.params.item.F_Id:'',
                address: this.address+' '+this.address_detail.replace(/\s+/g,""),
                receiveby: this.name,
                isdefault: this.switch_?1:0
            },()=>{
                this.$dialog.loading.close();
                this.$router.back()
            },()=>{
                this.$dialog.loading.close();
            })
        }
    },
    created(){
        this.$root.init_nav();
    },
    mounted(){


    },
    activated() {
        this.city_select = true;
        if(this.$route.params.item) {
            let item = this.$route.params.item;
            this.name = item.receiveby;
            this.phone = item.mobile;
            this.address_detail = item.address.split(' ')[3];
            this.switch_ = item.isdefault?true:false;
            this.provance =item.address.split(' ')[0];
            this.city = item.address.split(' ')[1];
            this.area = item.address.split(' ')[2];
            this.address= this.provance +' '+this.city+' '+this.area;
        }else {
            this.name= '';
            this.phone= null;
            this.show= false;
            this.district= District;
            this.address= '';
            this.address_detail= '';
            this.switch_= false;
            this.provance= '';
            this.city= '';
           this.area= '';
           
        }
    },
    deactivated() {

        this.city_select = false;
    }
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
.line {
    border-bottom: 1px solid #eee;
}
.switch, .del_address {
    align-items: center;
    justify-content: space-between;
    padding: .3rem;
    background: #fff;
    margin-top: .2rem;
    font-size: .26rem;
    color: #333333
}
.del_address:active {
    opacity: .7;
}
</style>