<template>
    <div class="wrapper">
        <gpsSchoolHouse v-show="show" v-for="item in list" :key="item.f_id" :gps_school_house="item"/>
        <div class="list"  v-show="!show">
            <div class="item" v-for="(item,k) in new Array(3)" :key="k">
                <div class="flex-row" style="justify-content:space-between">
                    <div class="headstone" style="width:1rem;height:.3rem"></div>
                    <div class="headstone" style="width:2rem;height:.3rem"></div>
                </div>
                <div class="item-content headstone"></div>
            </div>
        </div>
        <div class="statement">
            <p>免责声明：学区划分数据来源于互联网公开渠道，政策变化及数据来源的准确性将引起划分误差，本平台不承担由此产生的法律及连带责任。</p>
        </div>
    </div>
</template>

<script>
import gpsSchoolHouse from '@/implant_views/components/gps_school_house.vue'
export default {
    components:{
        gpsSchoolHouse
    },
    props:{},
    data(){
        return {
            list: [],
            show: false
        }
    },
    watch:{
        "$route": {
            handler: function(n) {
                this.get_school_hourse()
            },
            deep: true
        }
    },
    computed:{},
    methods:{
        get_school_hourse() {
            this.$http.ajax_post_('/api/School/GetSchoolHourse',{
                Id: this.$route.query.id
            },(res)=>{
                if(res.data.status=='-1'&&_DEV_) {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '该信息不存在',
                        callback:()=>{
                            this.backNative();
                        }
                    });
                    return false;
                }
                if(res.data.status=='-1'&&!_DEV_) {
                    android.loadWebErr('该数据不存在');
                    return false;
                }
                this.list = res.data.data.datalist;
                this.show = true;          
            },(err)=>{
                
                if(!_DEV_) {
                    android.loadWebErr('数据请求失败')
                }else{
                    this.$dialog.confirm({
                        title: '温馨提示',
                        mes: '系统开了个小差~',
                        opts: [
                            {
                                txt: '取消',
                                color: false,
                                callback: () => {
                                    this.backNative();
                                }
                            },
                            {
                                txt: '重试',
                                color: true,
                                callback: () => {
                                    this.get_school_detail();
                                }
                            }
                        ]
                    });
                }
            })
        }
    },
    created(){},
    mounted(){
        this.get_school_hourse();
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    min-height: 4rem;
    background: #fff!important;
}
.statement {
    text-align: left!important;
    color: #999;
    padding: 0 .3rem .3rem .3rem;
    background: #fff;
    margin-top: .5rem;
}
.item {
    padding: .3rem;
    border-bottom: 1px solid #E6E6E6;
}
.item-content {
    height:3.4rem;
    margin-top: .1rem;
}
</style>