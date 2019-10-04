<template>
    <div class="wrapper">
        <div class="top-">
            <div v-if="$store.state.old_version">
            <div class="top-btns flex-row" :style="'background:rgba(255,255,255,'+nav_opcity+');box-shadow: 1px 1px 1px 1px rgba(238,238,238,'+nav_opcity+')'">
                <div class="top-btn-left" ref="test" @click="$root.back">
                    <i class="iconfont icon-zuojiantou"></i>
                </div>
                <div :style="'opacity:'+nav_opcity">
                    <span class="font-03 font-weight">详情页</span>
                </div>
                <div class="top-btn-right flex-row" @click="$root.share_url(share_page,houses_info.F_Id)">
                    <yd-icon name="more"></yd-icon>
                </div>
            </div>
            </div>
            <yd-slider autoplay="3000" style="height:5rem">
                <yd-slider-item style="height:5rem">
                    <yd-lightbox>
                        <yd-lightbox-img src="https://pic1.ajkimg.com/display/xinfang/0fd3588d9a5dd836735f65d06937e60a/840x563.jpg"></yd-lightbox-img>
                    </yd-lightbox>
                </yd-slider-item>
            </yd-slider>
            <div class="top-txt">
                <div class="top-txt-title flex-row">
                    <div v-if="houses_info.F_Id">
                        <span class="houses-name">{{houses_info.name}}</span>
                        <!-- <span class="houses-name-label">售罄</span> -->
                    </div>
                    <div v-else class="headstone" style="width:1.5rem;height:.38rem"></div>
                    <!-- <div class="open-date">
                        <span style="color:#808080;margin-right:.1rem">开盘</span>
                        <span>2016-06-15</span>
                    </div> -->
                </div>
                <div class="margin-bt-02">
                    <div v-if="houses_info.F_Id" class="flex-row">
                        <span class="line-title">价格</span>
                        <span style="color:#FC5969;font-size:.3rem">{{houses_info.averageprice}}元/㎡</span>
                    </div>
                    <div v-else class="headstone" style="width:1.2rem;height:.3rem"></div>
                </div>
                <div style="width:100%;margin-bottom:.26rem">
                    <div v-if="houses_info.F_Id" class="flex-row">
                        <span class="line-title">地址</span>
                        <div class="top-txt-address">
                            <span>{{houses_info.address}}</span>
                        </div>
                    </div>
                    <div v-else class="headstone" style="width:3.3rem;height:.3rem;"></div>
                </div>
                <!-- <div class="top-txt-btns flex-row">
                    <yd-button class="margin-rt-026" type="danger" bgcolor="#FE5491" color="#fff">＋收藏</yd-button>
                    <yd-button type="danger" bgcolor="#34C3CB" color="#fff">＋关注</yd-button>
                </div> -->
            </div>
        </div>
        <ul class="houses-info-labels flex-row">
            <li class="houses-info-label" v-for="(item,k) in list" :key="k">{{item}}</li>
        </ul>
        <div class="houses-base">
            <div class="houses-info-title flex-row margin-bt-02">
                <span>基本信息</span>
            </div>
            <ul class="houses-base-table">
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>物业类型:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.managetype}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>物业费:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.managefee}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
                <!-- <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>总建面积:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">暂无数据</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li> -->
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>总户数:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.households}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
                <!-- <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>建造年代:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">暂无数据</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li> -->
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>停车位:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.parkingspace}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>容  积  率:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.plotratio}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>


                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>绿化率:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.greeningrate}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>开  发  商:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.developcompany}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>物业公司:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.managecompany}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>就读小学:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.smallschoolname}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
                <li class="houses-base-line flex-row">
                    <div class="house-base-name"><span>就读中学:</span></div>
                    <div class="house-base-des">
                        <span v-if="houses_info.F_Id">{{houses_info.middleschoolname}}</span>
                        <div v-else class="headstone" style="height:.28rem;width:100%"></div>
                    </div>
                </li>
            </ul>
            <div style="height:1px">&nbsp;</div>
        </div>
        <div style="position:relative;height:3rem">
            <div class="map-cover" @click="native_map"></div>
            <gdMap v-if="houses_info.xy" :school="houses_info"/>
        </div>
        <housesPrice v-if="houses_price[0].name" :hourse="houses_price" ref="houses_price"/>
        <div class="schools">
            <div class="houses-info-title flex-row margin-bt-02"><span>关联学区</span></div>
            <ul v-if="schools.length>0"><li></li></ul>
            <div v-else style="padding:0 .3rem"><span>暂无数据</span></div>
        </div>
        <evaluate/>
        <aboutNews/>
    </div>
</template>

<script>
import gdMap from '@/components/public/map.vue';
import housesPrice from '@/components/school_home.vue';
import evaluate from '@/components/evaluate.vue';
import aboutNews from "@/components/about_news";
export default {
    components:{
        gdMap,
        housesPrice,
        evaluate,
        aboutNews
    },
    props:{},
    data(){
        return {
            test: false,
            nav_opcity: 0,
            add_height: 0,
            list: [],
            houses_info: {},
            schools: []
        }
    },
    watch:{
        add_height(n) {
            if(n>80) {
                this.nav_opcity = 1;
                return false;
            }
            this.nav_opcity = n/80
        },
        $route: {
            deep: true,
            handler: function() {
                if(this.$route.name=='houses_info') {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    this.get_houses_info();
                }    
            }
            
        }
    },
    computed:{
        share_page() {
            let des = '';
            let a = !this.houses_info.smallschoolname?'':this.houses_info.smallschoolname;
            let b = !this.houses_info.middleschoolname?'':this.houses_info.middleschoolname;
            des = '可就读:' +a + ' ' +b
            if(!this.houses_info.smallschoolname&&!this.houses_info.middleschoolname) {
                des = ''
            }
            let page = {
                logo: '',
                name: this.houses_info.name,
                des: des
            }
            return page
        },
        houses_price() {
            let list = [
                {   
                    f_id: '0',
                    name: this.houses_info.name,
                    anjukeprice: this.houses_info.anjukeprice?this.houses_info.anjukeprice:[],
                    xy: this.houses_info.xy
                },{
                    f_id: '1',
                    name: '区域均价',
                    anjukeprice: this.houses_info.areaprice?this.houses_info.areaprice:[],
                    xy: this.houses_info.xy
                }
            ]
            return list;
        }
    },
    methods:{
        init_share() {
            this.$store.commit('updataShare',{page:this.share_page,id:this.houses_info.baseinfo.F_Id,type_id:this.houses_info.baseinfo.periodcode});
        },
        init_nav() {
            let host = window.location.href.split('#')[0];
            if(this.$root._IsIOS()) {
                this.$IOS.getNavInfo(true,'社区详情',1,'','#000000',host+'icon/icon_share.png','shareUrl()')
            }else if(this.$root._IsAndroid()) {
                try{
                    android.getNavInfo(true,'社区详情',1,'','#000000',host+'icon/icon_share.png','shareUrl()')
                }catch(err){
                    console.log(err)
                }
            }
        },
        get_houses_info() {
            this.$http.ajax_post('/api/School/GetCommunityDetail',{
                Id: this.$route.query.id,
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
            },(res)=>{
                if(res.data.data.baseinfo.smallschoolname&&res.data.data.baseinfo.smallschoolname[0]==',') {
                    res.data.data.baseinfo.smallschoolname = res.data.data.baseinfo.smallschoolname.substr(1,res.data.data.baseinfo.smallschoolname.length)
                }
                if(res.data.data.baseinfo.middleschoolname&&res.data.data.baseinfo.middleschoolname[0]==',') {
                    res.data.data.baseinfo.middleschoolname = res.data.data.baseinfo.middleschoolname.substr(1,res.data.data.baseinfo.middleschoolname.length)
                }
                this.houses_info = res.data.data.baseinfo;
                this.init_share();
                if(this.$root.isWeiXin()) {
                    this.$root.get_wechat_sign(this.share_page);
                }

            })
        },
        native_map() {
            let xy = this.houses_info.xy.slice(1,this.houses_info.xy.length-1).split(',');

            if(!_DEV_&&this.$root._IsAndroid()) { 
                android.startSchoolMapNative(this.houses_info.name,this.$route.query.id,this.$route.query.type_id,Number(xy[0]),Number(xy[1]))
            }else if(!_DEV_&&this.$root._IsIOS()) {
                this.$IOS.startSchoolMapNative(this.houses_info.name,this.$route.query.id,this.$route.query.type_id,Number(xy[0]),Number(xy[1]))
            }
        },
        handleScroll() {
            if(document.documentElement.scrollTop>document.body.scrollTop) {
                this.add_height = document.documentElement.scrollTop;
            }else {
                this.add_height = document.body.scrollTop;
            }
        },
    },
    created(){
        
    },
    mounted(){
        // this.get_houses_info();
        // window.addEventListener('scroll', this.handleScroll);
    },
    activated() {
        this.init_nav();
        this.get_houses_info();
        window.addEventListener('scroll', this.handleScroll);
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
// .wrapper{}
.top- {
    position: relative;
}
.top-btns {
    position: fixed;
    padding: .56rem .3rem .3rem .3rem;
    justify-content: space-between;
    align-items: center;
    z-index: 2000;
    width: 100%;
    z-index: 1000;
}
.top-btn-left i {
    font-size: .4rem;
}
.top-btn-right {
    width: 1rem;
    height: 0.7rem;
    background: rgba(245,245,245,0.8);
    justify-content: center;
    align-items: center;
    border-radius: 14px;
}
.top-txt {
    z-index: 900;
    position: absolute;
    left: .3rem;
    bottom: -1.6rem;
    padding: .3rem;
    width: calc(100vw - .6rem);
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
    text-align:left;
}
.top-txt-title {
    justify-content: space-between;
    margin-bottom: .2rem;
}
.houses-name {
    margin-right: .2rem;
    font-size: .38rem;
    color: #1a1a1a;
}
.houses-name-label {
    padding: .02rem .12rem;
    background: #FFD712;
    border-radius: 2px;
    font-size: .24rem;
    color: #fff;
}
.line-title {
    width: .72rem;
    font-size: .28rem;
    color: #808080;
}
.top-txt-address {
    width: calc(100vw - 1.32rem);
    color: #4D4D4D;
}
.top-txt-btns {
    justify-content: flex-end;
}
.houses-info-labels {
    flex-wrap: wrap;
    padding: 1.9rem .3rem .6rem .3rem;
    background: #fff;
    
}
.houses-info-label {
    margin-right: .2rem;
    margin-bottom: .2rem;
    padding: 0 .12rem;
    height: .5rem;
    line-height: .5rem;
    border-radius: .5rem;
    background: #EBF0F2;
    color: #666;
    font-size: .26rem;
}

.houses-base {
    background: #fff;
    // padding-bottom: .6rem;
}
.houses-info-title {
    position: relative;
    // justify-content: space-between;
    align-items: center;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin: 0 0.3rem 0.4rem 0.3rem;
}
.houses-info-title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem;
}
.house-base-table {
    padding: .3rem;
}
.houses-base-table {
    margin: .2rem .3rem .6rem .3rem;
    padding: .3rem;
    box-shadow: 1px 1px 1px 1px rgba(77, 77, 77, 0.2);
    border-radius: 8px;
    text-align: left;
}
.houses-base-line {
    margin-bottom: .2rem;
    width: 100%;
}
.houses-base-line:last-child {
    margin-bottom: 0;
}
.house-base-name {
    width: 1.4rem;
    color: #1a1a1a;
}
.house-base-des {
    width: calc(100% - 1.4rem);
    // overflow:hidden;
    // text-overflow:ellipsis;
    // white-space:nowrap;
}

.schools {
    margin-top: -1rem;
    background: #fff;
    text-align: left;
}
</style>