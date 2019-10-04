<template>
    <div class="wrapper">

        <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$router.back()"></i>
            <span>相关新闻</span>
            <i></i>
        </div>
        <div class="top-pedestal"></div>
 
        <div style="height: .2rem"></div>
        <div class="information-list" v-show="!headstone_show">
            <yd-infinitescroll :callback="get_information_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <div class="information-item flex-row"
            @click="to_information_info(item)" 
            v-for="(item) in list" :key="item.f_id">
                <!-- <div class="information-item-content flex-col">
                    <div>
                        <div class="information-item-title">
                            <span>{{item.title}}</span>
                        </div>                       
                    </div>
                    <div class="information-item-content-foot">
                        <span v-if="item.source">来源：</span>
                        <span v-if="item.source" style="margin-right: .4rem;">{{item.source}}</span>
                        <span>{{item.F_LastModifyTime}}</span>
                    </div>
                </div> -->
                <div class="flex-row" v-if="item.coverpic" style="width:100%">
                    <div class="content">
                        <div class="item-title">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="content-foot">
                            <span style="margin-right:.3rem">{{item.source}}</span>
                            <span>{{$root.transform_time(item.f_creatortime)}}</span>
                        </div>
                    </div>
                    <div class="icon" :style="'background:url('+$root.img_url+item.coverpic+') center center /cover'"></div>
                </div>
                <div class="flex-row" v-else  style="width:100%">
                    <div class="content-">
                        <div class="item-title">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="content-foot">
                            <span style="margin-right:.3rem">{{item.source}}</span>
                            <span>{{$root.transform_time(item.f_creatortime)}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
        </div>

        <ul class="information-list" v-show="headstone_show">
            <li class="information-item flex-row" v-for="(item,k) in new Array(6)" :key="k">
                <div class="flex-row" style="width:100%">
                    <div class="content">
                        <div class="item-title headstone" style="height:.3rem"></div>
                        <div class="content-foot headstone" style="height:.3rem"></div>
                    </div>
                    <div class="icon headstone"></div>
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
            list: [],
            headstone_show: true
        }
    },
    watch:{},
    computed:{},
    methods:{
        init_nav() {
            if(this.$root._IsIOS()) {
                this.$IOS.getNavInfo(true,'相关新闻',0,'','','','')
            }else if(this.$root._IsAndroid()) {
                try{
                    android.getNavInfo(true,'相关新闻',0,'','','','')
                }catch(err){
                    console.log(err)
                }
            }
        },
        to_information_info(item) {
            this.$router.push({
                path: '/information_info?id='+item.f_id,

            })
        },
        get_information_list() {
            this.$http.ajax_post('/api/School/GetNewsListBySchoolId',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                Id: this.$route.query.id,
                CurrentPage: this.page++,
                PageSize: 8,
                OrderBy: ''
            },(res)=>{
                this.headstone_show = false;
                this.list = [...this.list, ...res.data.data.datalist];
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
        // this.get_information_list();
    },
    activated() {
        this.init_nav();
        this.get_information_list();
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    text-align: left;
}
.nav- {
    font-size: .34rem;
    line-height: .88rem;
}
.nav i {
    font-size: .4rem;
    padding-right:1rem;
}
.information-item {
    padding: .3rem;
    border-bottom: 1px solid #eee;
    background: #fff;
}
// .information-item-content {
//     width: 100%;
//     height: 1.8rem;
//     padding-right: .23rem;
//     text-align: left;
//     justify-content: space-between;
// }
// .information-item-title {
//     font-size: .32rem;
//     overflow:hidden; 
//     text-overflow:ellipsis;
//     display:-webkit-box; 
//     -webkit-box-orient:vertical;
//     -webkit-line-clamp:2;
//     margin-bottom: .14rem; 
// }
// .information-item-title-secondary {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     font-size: .26rem;
//     color: #666;
// }

// .information-item-content-foot {
//     color:#999;
//     font-size: .24rem;
// }
.content {
    width: calc(100% - 2.1rem);
    padding-right: .36rem;
}

.content-foot {
    color: #999;
}
.item-title {
    margin-bottom: .4rem;
    width: 100%;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    font-size: .32rem; 
}
.icon {
    width:2.1rem;
    height: 1.5rem;
    border-radius: 8px;
}

</style>