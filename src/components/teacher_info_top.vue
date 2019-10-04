<template>
  <div class="wrapper">
        <div class="top flex-col" style="height:5rem">
            <div class="top-btns flex-row" v-if="$store.state.old_version"
            :style="'background:rgba(255,255,255,'+nav_opcity+');box-shadow: 1px 1px 1px 1px rgba(238,238,238,'+nav_opcity+')'">
                <div class="top-btn-left" @click="$root.back">
                    <i class="iconfont icon-zuojiantou"></i>
                </div>
                <div :style="'opacity:'+nav_opcity">
                    <span class="font-03 font-weight">详情页</span>
                </div>
                <div class="top-btn-right flex-row" @click="$root.share_url(share_page,data_info.baseinfo.F_Id)">
                    <yd-icon name="more" size=".5rem"></yd-icon>
                </div>
            </div>
            <yd-slider autoplay="3000" style="height:5rem">
                <yd-slider-item v-for="item in data_info.carousel" :key="item.Id" style="height:5rem">
                    <!-- <img :src="item.filename" style="height:5rem"> -->
                    <yd-lightbox style="position: relative">
                        <yd-lightbox-img :src="item.filename" class="yd-slider-img"></yd-lightbox-img>
                        <div :style="'background:url('+item.filename+') center center /cover;height:5rem;'"></div>
                    </yd-lightbox>
                </yd-slider-item>
            </yd-slider>
            <div class="top-txt flex-row">
                <div class="top-txt-img flex-row">                    
                    <!-- <img v-if="data_info.baseinfo" :src="data_info.baseinfo.headpic" alt=""> -->
                     <div v-if="data_info.baseinfo" :style="'background:url('+data_info.baseinfo.headpic+') center center /cover'"></div>
                    <div v-else class="headstone headstone-logo"></div>                       
                </div>
                <div class="top-txt-content">
                    <div v-if="data_info.baseinfo" class="school-name flex-row">
                        <span>{{data_info.baseinfo.truename}}</span>
                        <i v-if="data_info.baseinfo.sex=='女'" class="iconfont icon-nv" style="color: #ff7171"></i>
                        <i v-if="data_info.baseinfo.sex=='男'" class="iconfont icon-nan" style="color: #29aeff"></i>
                        <i v-if="!data_info.baseinfo.sex"></i>
                        <div class="teacher-age" v-if="data_info.baseinfo.age">
                            <span>{{data_info.baseinfo.age}}岁</span>
                        </div>
                        <div class="teacher-age" v-if="data_info.baseinfo.schoolage">
                            <span>{{data_info.baseinfo.schoolage}}年</span>
                        </div>
                    </div>
                    <div v-else>
                        <div  class="headstone margin-bt-02" style="height:.3rem;width:4rem;border-radius:.3rem"></div>
                        <div  class="headstone" style="height:.3rem;width:3rem;border-radius:.3rem"></div>
                    </div>
                </div>
                <div class="attention flex-row" v-if="!$store.state.wechat">
                    <yd-button type="disabled" disabled v-if="data_info.isstore">已收藏</yd-button>
                    <yd-button type="primary" bgcolor="#FE5491" color="#fff" v-else
                    @click.native="follow_store('/api/Family/SaveStore',data_info.baseinfo.name)">＋收藏</yd-button>
                    <yd-button type="disabled" disabled v-if="data_info.isfollow">已关注</yd-button>
                    <yd-button type="primary" bgcolor="#34C3CB" color="#fff" v-else
                    @click.native="follow_store('/api/Family/SaveFollow',data_info.baseinfo.name)">＋关注</yd-button>                  
                </div>
            </div>
        </div>

        <div class="school-describe">
            <div v-if="data_info.baseinfo" class="top-txt-btns flex-row">
                <div class="top-txt-btn" @click="to_teacher_list(item)"
                :style="item.color&&item.color.length<8?'background:'+item.color+';color:#fff':''"
                v-for="(item, key) in data_info.tags" :key="key">
                    <span>{{item.tagname}}</span>
                </div>
            </div>
            <div v-else class="top-txt-btns">
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;" v-for="(item,k) in new Array(3)" :key="k"></div>
            </div>
            <div v-if="$route.query.type_id == '06'">

            <div class="school-describe-title flex-row">
                <span>教育背景</span>
            </div>
            <div v-if="data_info.baseinfo" :class="all_describe?'all-describe':'school-describe-content'" ref="school_describe_content">
                <p v-for="(item, k) in background_list" :key="k">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item}}</p>
                <p v-if="!background_list.length">暂无数据</p>
                <div v-if="!hidden_more_describe" class="school-describe-foot" @click="more_describe">
                    <i class="iconfont icon-z044" :style="all_describe?'transform:rotate(180deg)':''"></i>
                </div>
            </div>
            <div v-else>
                <div class="headstone margin-bt-01" style="width:calc(100% - .48rem);height:.24rem;border-radius:.24rem;margin-left:.48rem"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;" v-for="(item,k) in new Array(4)" :key="k"></div>

            </div>

            </div>

            <div class="school-describe-title flex-row" style="margin-top:.5rem">
                <span>介绍</span>
            </div>
            <div v-if="data_info.baseinfo" :class="all_describe?'all-describe':'school-describe-content'" ref="school_describe_content">
                <p v-for="(item, k) in resume_list" :key="k">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item}}</p>
                <p v-if="!resume_list.length">暂无数据</p>
                <div v-if="!hidden_more_describe" class="school-describe-foot" @click="more_describe">
                    <i class="iconfont icon-z044" :style="all_describe?'transform:rotate(180deg)':''"></i>
                </div>
            </div>
            <div v-else>
                <div class="headstone margin-bt-01" style="width:calc(100% - .48rem);height:.24rem;border-radius:.24rem;margin-left:.48rem"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;" v-for="(item,k) in new Array(4)" :key="k"></div>
            </div>


        </div>
        <!-- <div class="broadcast-wrapper flex-row" v-if="data_info.news&&data_info.news.length>0">
            <div>
                <i class="iconfont icon-laba" style="color:#3fd4c0"></i>
            </div>
            <yd-rollnotice autoplay="2000">
                <yd-rollnotice-item v-for="(item) in data_info.news" :key="item.Id">
                    <div class="txt-omit broadcast">{{item.des}}</div>
                </yd-rollnotice-item>
            </yd-rollnotice>
        </div> -->
    
  </div>
</template>

<script>
// import {Icons} from 'vue-ydui/dist/lib.rem/icons';
// import {Button} from 'vue-ydui/dist/lib.rem/button';
// import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
export default {
    components:{
        // "yd-icon": Icons,
        // "yd-slider": Slider,
        // "yd-slider-item": SliderItem,
        // "yd-button": Button
    },
    props:{

    },
    data(){
        return {
            Id: "",
            data_info: {},
            resume_list: [],
            background_list: [],
            all_describe: true,
            hidden_more_describe: true,
            nav_opcity: 0,
            add_height: 0,
            
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
                if(!this.$store.state.second_show&&!this.$store.state.third_show&&this.$route.name=="teacher_info") {
                    switch(this.$route.query.type_id) {
                        case '06':
                            this.get_school_detail('/api/School/GetTeacherDetail');
                            break;
                        case '07':
                            this.get_school_detail('/api/School/GetEducationDetail');
                            break;
                    }
                }
            }
        }

    },
    computed:{
        share_page() {
            let page = {
                logo: this.data_info.baseinfo.headpic,
                name: this.data_info.baseinfo.truename,
                des: this.data_info.baseinfo.introduce
            }
            return page
        },
    },
    methods:{
        init_share() {
            this.$store.commit('updataShare',{page:this.share_page,id:this.data_info.baseinfo.F_Id,type_id:this.data_info.baseinfo.periodcode});
        },
        init_nav() {
            if(this.$root._IsIOS()) {
                this.$IOS.getNavInfo(true,'详情页',1,'','#000000',host+'icon/icon_share.png','shareUrl()')
            }else if(this.$root._IsAndroid()) {
                try{
                    android.getNavInfo(true,'详情页',1,'','#000000',host+'icon/icon_share.png','shareUrl()')
                }catch(err){
                    console.log(err)
                }
            }
        },
        to_teacher_list(item) {
            if(!item.tagcode||!this.$route.query.type_id) {
                return false;
            }
            if(this.$store.state.wechat) {
                wx.miniProgram.navigateTo({
                    url:'/pages/teacher_search/teacher_search?type_id='+this.$route.query.type_id+'&tagcode='+item.tagcode
                })
                return;
            }
            if(!_DEV_&&this.$root._IsAndroid()) {
                android.startListByTag(item.tagcode,this.$route.query.type_id)
            }else if(!_DEV_&&this.$root._IsIOS()) {
                this.$IOS.startListByTag(item.tagcode,this.$route.query.type_id)
            }
        },
        follow_store(url,name) {
            this.$root.follow_store(url,name,()=>{
                switch(url) {
                    case '/api/Family/SaveStore':
                        this.$dialog.toast({
                            mes: '收藏成功',
                            timeout: 1500,
                            icon: 'success',
                            callback: () => {
                                this.data_info.isstore = true;
                            }
                        });
                        break;
                    case '/api/Family/SaveFollow':
                        this.$dialog.toast({
                            mes: '关注成功',
                            timeout: 1500,
                            icon: 'success',
                            callback: () => {
                                this.data_info.isfollow = true;
                            }
                        });
                        break;
                }
            })
        },
        get_school_detail(url) {
            this.$http.ajax_post(url,{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                Id: this.$route.query.id
            },(res)=>{
                this.data_info = res.data.data;
                this.init_share();
                this.init_school_describe();
                this.data_school_teacher(res.data.data);

                if(this.$root.isWeiXin()) {
                    this.$root.get_wechat_sign(this.share_page);
                }
            })
        },

        more_describe() {    
            this.all_describe = !this.all_describe;
        },
        init_school_describe() {
            this.resume_list = [];
            this.background_list = [];
            if(this.data_info.baseinfo.introduce) {
                 this.resume_list.push(this.data_info.baseinfo.introduce)
            }
            if(this.data_info.baseinfo.background) {
                this.background_list.push(this.data_info.baseinfo.background)
            }
            
            
            this.$nextTick(()=>{
                if(this.$refs.school_describe_content.offsetHeight > 300) {
                    this.all_describe = false;
                    this.hidden_more_describe = false;
                }
            })
        },
        data_school_teacher(data) {
            this.$emit('data_school_teacher',data)
        },
        handleScroll() {
            if(document.documentElement.scrollTop>document.body.scrollTop) {
                this.add_height = document.documentElement.scrollTop;
            }else {
                this.add_height = document.body.scrollTop;
            }
            // if(!this.height) {
            //     return false;
            // }
            // console.log(this.add_height)
            if(this.add_height>this.height-80) {
                this.fixed = true;
            }else {
                this.fixed = false;
            }
        },
    },
    created(){
        // this.$store.commit('updataCoverComponentStatus',true);
        this.init_nav()
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll)
        // if(this.$store.state.teacher_school_info.baseinfo) {           
        //     this.data_info = this.$store.state.teacher_school_info;
        //     this.data_school_teacher(this.data_info);
        //     this.init_school_describe();
        // }else {    
            switch(this.$route.query.type_id) {
                case '06':
                    this.get_school_detail('/api/School/GetTeacherDetail');
                    break;
                case '07':
                    this.get_school_detail('/api/School/GetEducationDetail');
                    break;
            }
        // }
               
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    font-size: 0.26rem;
}
.top {
    position: relative;
    justify-content: space-between;
    /* padding: 0 0.3rem;
    padding-top: 0.56rem; */
    /* background: url('../assets/school_top_bg.jpg'); */
    background-size: cover;
    height: 5rem;
}

.top-btns {
    // box-shadow: 2px 2px 2px 2px rgba(238,238,238,);
    position: fixed;
    padding: .56rem .3rem .3rem .3rem;
    justify-content: space-between;
    align-items: center;
    z-index: 2000;
    width: 100%;
    z-index: 1000;
}
.top-btn-left i {
    font-size: 0.4rem;
}
// .top-btn-right {
//     width: 1rem;
//     height: 0.7rem;
//     background: rgba(245,245,245,0.8);
//     justify-content: center;
//     align-items: center;
//     border-radius: 14px;
// }

.top-txt {
    // align-items: center;
    position:absolute;
    left: 0.3rem;
    right: 0.3rem;
    bottom: -1rem;
    background: #fff;
    border-radius: 10px;
    padding: 0.2rem;
    /* margin-bottom: -1rem; */
    box-shadow: 1px 1px 1px 1px #eee;
    z-index: 500;
}
.top-txt-img {
    align-items: center;
    margin-right: 0.33rem;
    width: 1.6rem;
    height: 1.6rem;
    overflow: hidden;
    border-radius: 1.6rem;
}
.top-txt-img > div {
    width: 1.6rem;
    height: 1.6rem;
}

.top-txt-content{
    position: relative;
    width: calc(100% - 1.93rem);
}
.school-name {
    font-size:0.36rem;
    color:#000;
    text-align:left;
    width:100%;
    align-items: center;
// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 2;
// overflow: hidden;
}
.school-name i {
    margin-right: .2rem;
}
.teacher-age {
    font-size: .24rem;
    padding: .04rem .06rem;
    border: 1px solid #4E91FF;
    margin-right: .06rem;
    color: #4E91FF;
    border-radius: 4px;
}
.attention {
    position: absolute;
    bottom: .2rem;
    right: .2rem;
    // width: 2.6rem;
    // justify-content: space-between;
}
.attention .yd-btn {
    margin-right: .2rem;
}
.top-txt-btns {
    flex-wrap: wrap;
    margin-top: 0.1rem;
    padding-bottom: .56rem;
}
.top-txt-btn {
    border-radius: .6rem;
    margin: 0 0.2rem 0.1rem 0;
    padding: .1rem .2rem;
    background:#EBF0F2;
    color: #666666;
    font-size: .26rem;

}
// .top-txt-btn:nth-child(1) {
//     border: 1px solid #34c3cb;
//     color: #34c3cb;
// }
// .top-txt-btn:nth-child(2) {
//     border: 1px solid #ff8c4d;
//     color: #ff8c4d;
// }
// .top-txt-btn:nth-child(3) {
//     border: 1px solid #ffbf5b;
//     color: #ffbf5b;
// }

.school-describe {
    padding: 1.56rem 0.3rem 0.4rem 0.3rem;
    background-color: #fff;
    text-align: left;
    color: #878787;
}
.school-describe-title {
    // padding-left: 0.2rem;
    // border-left: 4px solid #34c3cb;
    align-items: center;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin-bottom: 0.4rem;
}
.school-describe-title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem;   
}
.school-describe-content {
    transition: height 2s;
    position: relative;
    overflow: hidden;
    height: 2.4rem;  
}
.all-describe {
    position: relative;
    overflow: hidden;
    max-height: none;
}
.school-describe-foot {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: .3rem;
    width: 100%;
    height: 1rem;
    background: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
    text-align: center;
}
.school-describe-foot i {
    position: absolute;
    bottom: 0;
    left: calc(50% - .15rem);
    font-size: .3rem;
    color: #34c3cb;
}
.school-describe div p {
    margin-bottom: .15rem;
    line-height: .34rem;
}
.broadcast-wrapper {
    padding: calc((1rem - 30px)/2) 0.3rem;
    background-color: #fff;
    align-items: center;
    border-bottom: 1px solid #eee;
}
.broadcast {
    width: 6rem;
    margin-left:0.2rem;
}

</style>