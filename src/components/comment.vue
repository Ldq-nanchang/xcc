<template>
    <div class="wrapper">
        <div class="comment-title flex-row">
            <span>相关话题</span>
            <div class="release" @click="release">
                <i class="iconfont icon-fabu"></i>
                <span class="margin-lf-01">我要发布</span>
            </div>
        </div>
        <ul class="comment-list">
            <yd-infinitescroll :callback="get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
                <li class="comment-item" v-for="(item) in list" :key="item.f_id">

                    <!-- <div class="comment-user flex-row" @click="$root.person_page(item.mobile,item.F_CreatorUserId)">
                        <div class="comment-user-icon" :style="'background:url('+item.headpic+');background-size:cover'"></div>
                        <div class="comment-user-content flex-col">
                            <div class="comment-user-name">
                                <span>{{item.nickname}}</span>
                            </div>
                            <div class="comment-user-info">
                                <span>{{$root.transform_time(item.publishdate)}}</span>
                            </div>
                        </div>
                        <div class="comment-user-btn">
                            <yd-button type="primary" bgcolor="#34C3CB" color="#fff"
                            @click.native.stop="follow(item,'follow')" v-if="item.isfollow=='0'&&item.mobile!=$store.state.user_status.mobile">＋关注</yd-button>
                        </div>
                    </div>
                    <div class="comment-content" @click="to_comment_info(item)">
                        <div class="comment-text comment-text-hidden">
                            <div v-html="line_feed(item.title)"></div>
                            <p v-if="item.typecode=='02'" class="comment-text-info">{{line_feed(item.content)}}{{line_feed(item.content)}}</p>
                            <div v-if="item.typecode=='01'" v-html="item.content" class="comment-text-info"></div>
                        </div>

                        <div class="comment-text-btn"
                        v-if="item.typecode=='01'"
                        @click="text_action">查看全文</div>
                    </div>

                    <yd-lightbox class="flex-row img-list" v-if="item.pic.length==1">
                        <div class="img-item-" v-for="(item_) in item.pic" :key="item_.filename" :style="item_.style">
                            <div style="width:0;overflow:hidden">
                                <img :src="item.filename" alt="" :ref="item_.filename">
                            </div>
                            <yd-lightbox-img  :src="item_.filename"></yd-lightbox-img>
                        </div>  
                    </yd-lightbox>

                    <yd-lightbox class="flex-row img-list" v-if="item.pic.length>1">
                        <div class="img-item" v-for="(item_) in item.pic" :key="item_.filename" :style="item_.background">
                            <yd-lightbox-img  :src="item_.filename"></yd-lightbox-img>
                        </div>  
                    </yd-lightbox>
                    <div class="school-name flex-row" v-if="item.address">
                        <div>
                            <span>#{{item.address}}</span>
                        </div>   
                    </div>
                    <div class="comment-foot flex-row">
                        <div class="comment-foot-left flex-row">
                            <i class="iconfont icon-31zhuanfa"></i>
                            <span v-if="item.share">{{item.share}}</span>
                            <span v-else>0</span>
                        </div>
                        <div class="comment-foot-center flex-row" @click="to_comment_info(item)">
                            <i class="iconfont icon-tubiaopinglunshu"></i>
                            <span v-if="item.comment">{{item.comment}}</span>
                            <span v-else>0</span>
                        </div>
                        <div :style="item.ispraise=='1'?'color:#FF8600':''" class="comment-foot-right flex-row" @click="praise(item)">
                            <i v-if="item.ispraise=='1'" class="iconfont icon-zantianchongxiao"></i>
                            <i v-else class="iconfont icon-zan1"></i>
                            <span v-if="item.praise">{{item.praise}}</span>
                            <span v-else>0</span>
                        </div>
                    </div> -->
                    <commentItem :item="item"/>
                </li>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
        </ul>
    </div>
</template>

<script>
import commentItem from '@/components/comment_'
export default {
    components:{
        commentItem
    },
    props:{
        school_name: {
            type: String
        }
    },
    data(){
        return {
            page: 1,
            text_show: false,           
            list: []
        }
    },
    watch:{},
    computed:{},
    methods:{
        // line_feed(str) {
        //     return str.replace(/\n/g,"<br/>")||str.replace(/\r/g,"<br/>")
        // },
        // text_action() {
        //     this.text_show = !this.text_show;
        // },
        // follow(item) {
        //     if(!this.$store.state.user_status.mobile) {
        //         this.$dialog.toast({
        //             mes: '请先登录',
        //             timeout: 1000,
        //             icon: 'error',
        //         });
        //         return false;
        //     }
        //     this.$root.follow('/api/Family/SaveFollow',1,item.F_CreatorUserId,item.periodcode,item.nickname,()=>{
        //         this.$dialog.toast({
        //             mes: '关注成功',
        //             timeout: 1500,
        //             icon: 'success',
        //             callback: () => {
        //                 item.isfollow = '1';
        //             }
        //         });
        //     })
        // },
        // praise(item) {
        //     if(!this.$store.state.user_status.mobile) {
        //         this.$dialog.toast({
        //             mes: '请先登录',
        //             timeout: 1000,
        //             icon: 'error',
        //         });
        //         return false;
        //     }
        //     let state = '';
        //     if(item.ispraise=='0') {
        //         state = '1'
        //     }
        //     if(item.ispraise=='1') {
        //         state = '0'
        //     }
        //     this.$root.praise('/api/Family/SavePraise',state,item.f_id,item.periodcode,item.F_CreatorUserId,()=>{  
        //         for(let item_ of this.list) {
        //             if(item_.f_id == item.f_id&&state=='1') {
        //                 item_.ispraise = state;
        //                 item_.praise = 1 + item_.praise;
        //             }
        //             if(item_.f_id == item.f_id&&state=='0') {
        //                 item_.ispraise = state;
        //                 item_.praise = item_.praise - 1;
        //             }
        //         }
        //     })
        // },
        release() {
            if(!_DEV_&&this.$root._IsAndroid()) {
                android.issueMoment(this.$route.query.id,this.$route.query.type_id,this.school_name)
            }else if(!_DEV_&&this.$root._IsIOS()){
                this.$IOS.goToPubulish(this.$route.query.id,this.$route.query.type_id,this.school_name)
            }
        },
        init_list() {
            this.page = 1;
            this.list = [];
            this.get_list()
        },
		get_list() {
            this.$http.ajax_post_('/api/Family/GetFamilyCycleList',{
                Id: this.$route.query.id?this.$route.query.id:this.$store.state.teacher_school_info.baseinfo.F_Id,
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: 6,
                OrderBy: '',
            },(res)=>{
                if(res.data.status=='-1') {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '家长圈列表加载失败',
                    });
                    return false;
                }
                for(let item of res.data.data.datalist) {
                    for(let item_ of item.pic) {
                        item_.style = ''
                        item_.background = ''
                    }
                }
                this.list = [...this.list, ...res.data.data.datalist];

                if (res.data.data.datalist.length == 0||this.list.length<6) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');               
        },()=>{
                this.$dialog.alert({
                    title: '温馨提示',
                    mes: '家长圈列表请求失败',
                });
            })
        },
        // to_comment_info(item) {
        //     if(this.$route.query.open) {
        //         this.$router.push({
        //             name: 'comment_info',
        //             query: {
        //                 id: item.f_id,
        //                 open: 'browser'
        //             }
        //         })
        //     }else {
        //         this.$router.push({
        //             name: 'comment_info',
        //             query: {
        //                 id: item.f_id
        //             }
        //         })
        //     }

        // }
    },
    created(){},
    mounted(){
        this.$nextTick(()=>{
            if (this.$route.name!='school_info') {
                this.get_list();
            }
            
        })
        
        // window.android_index_scroll_comment = this.get_list;
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    padding: 0 0 0 0;
    background: #fff;
    font-size: 0.26rem;
    color: #000;
    text-align: left;
}
.comment-title {
    position: relative;
    // justify-content: space-between;
    align-items: center;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin: 0 0.3rem 0.4rem 0.3rem;
}
.comment-title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem;
}
.release {
    position: absolute;
    right: 0;
    top: 0;
    color: #34c3cb;
    font-size: .26rem;
}
.release:active {
    opacity: .7;
}
.comment-item {
    border-bottom: 1px solid #eee;
    padding: 0 0.3rem;
    margin-bottom: 0.3rem;
}

.comment-user {
    padding-bottom: 0.45rem;
}
.comment-user-icon {
    margin-right: 0.2rem;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    overflow: hidden;
}
.comment-user-icon img {
    width: 1rem;
}
.comment-user-content {
    justify-content: space-around;
    width: calc(100% - 2rem);
}
.comment-user-name {
    font-size: 0.28rem;
}
.comment-user-info {
    color: #727272
}
.comment-user-btn {
    width: 1rem;
    // height: .42rem;
    // text-align: center;
    // line-height: .42rem;
    // background: #34C3CB;
    // border-radius: 2px;
    // color: #fff;
    // font-size: .26rem;
}

.comment-text {
    position: relative;
    line-height: 0.4rem;
}
.comment-text-info {
    color: #666;
    font-size: .26rem;
    margin-top: .22rem;
}
// .comment-text-hidden {
//     overflow:hidden; 
//     text-overflow:ellipsis;
//     display:-webkit-box; 
//     -webkit-box-orient:vertical;
//     -webkit-line-clamp:2; 
// }
.comment-text-btn {
    margin: 0.1rem 0 0.2rem 0;
    color: #34c3cb;
}

.img-list {
    margin: 0.2rem 0;
    overflow: hidden;
    flex-wrap: wrap;
}
.img-item- {
    width: 2.12rem;
}
.img-item- img {
    width: 100%;
}
.img-item {
    width: 2.12rem;
    height: 2.12rem;
    margin-right: .08rem;
    margin-bottom: .08rem;
    
}
.img-item img {
    width: 100%;
    height: 100%;
    opacity: 0;
}

.school-name div {
    padding: .1rem .18rem;
    background:#ebf0f3;
    color: #676566;
    border-radius: 0.6rem;
    font-size: .24rem
}

.comment-foot {
    padding: 0.3rem 0.26rem;
    justify-content: space-between;
    align-items: center;
}
.comment-foot div {
    align-items: center;
    color: #999999;
}
.comment-foot i{
    margin-right: 0.07rem;
    font-size: 0.36rem;
    
}
.comment-foot span {
    vertical-align: bottom;
}
</style>