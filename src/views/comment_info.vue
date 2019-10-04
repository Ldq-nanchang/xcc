<template>
    <div class="wrapper" style="height:500px">
        <div class="top"></div>
        <div style="background:#ebf0f3;padding-bottom:.2rem">
            <!-- <div class="comment-info-top nav flex-row">
                <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
                <div>消息详情</div>
                <span style="padding:.15rem"></span>
            </div>
            <div class="top-pedestal"></div> -->
            <div style="height: .28rem"></div>
            <div class="item-info" ref="item_info">
                <div class="item-info-top flex-row">
                    <div class="item-info-top-left flex-row" @click="$root.person_page(item_info.mobile,item_info.F_CreatorUserId)">
                        <div class="item-info-icon">
                            <!-- <yd-lightbox v-if="item_info.headpic">
                                <yd-lightbox-img :src="item_info.headpic"></yd-lightbox-img>
                            </yd-lightbox> -->
                            <div class="item-info-icon" v-if="item_info.headpic" :style="'background:url('+item_info.headpic+');background-size:cover;background-position:center;'"></div>
                            <div v-else class="headstone headstone-logo"></div>
                        </div>
                        <div class="item-info-top-content">
                            <p v-if="item_info.nickname">{{item_info.nickname}}</p>
                            <p v-else class="headstone" style="width:2rem;height:.3rem;border-radius:.3rem"></p>
                            <p v-if="item_info.publishdate">{{$root.transform_time(item_info.publishdate)}}</p>
                            <p v-else class="headstone" style="width:1rem;height:.2rem;border-radius:.2rem"></p>
                        </div>
                    </div>
                    <div class="item-info-top-right">          
                        <yd-button type="primary" bgcolor="#34C3CB" color="#fff" @click.native.stop="follow"
                        v-if="item_info.isfollow=='0'&&item_info.mobile!=$store.state.user_status.mobile">＋关注</yd-button>
                        <yd-button type="disabled" v-if="item_info.isfollow=='1'&&item_info.mobile!=$store.state.user_status.mobile">已关注</yd-button>      
                    </div>
                </div>
                <div v-if="item_info.publishdate" class="item-info-text">
                    <!-- <p v-if="item_info.typecode=='01'" v-html="item_info.content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> -->
                    <p v-html="line_feed(item_info.content)"></p>
                </div>
                <div v-else>
                    <p class="headstone margin-bt-02" style="width:calc(100% - .6rem);height:.3rem;border-radius:.3rem;margin-left:.6rem"></p>
                    <p class="headstone margin-bt-02" style="width:100%;height:.3rem;border-radius:.3rem"></p>
                </div>

                <viewer v-if="pic.length==1" class="imgs flex-row">
                    <div
                    v-for="item in pic" :key="item.F_Id"
                    :style="item.style"
                    class="img-row">
                        <img :src="item.filename" ref="img">
                    </div>
                </viewer>

                <!-- <yd-lightbox v-if="pic.length==1" class="imgs flex-row" close-text="关闭关闭...">
                    <div 
                    v-for="item in pic" :key="item.F_Id"
                    :style="item.style"
                    class="img-row">
                        <div style="width:0;overflow:hidden">
                            <img :src="item.filename" alt="" ref="img">
                        </div>
                        <yd-lightbox-img :src="item.filename"></yd-lightbox-img>
                    </div>
                </yd-lightbox> -->
                                
                <!-- <yd-lightbox v-if="pic.length>1" class="imgs flex-row">
                    <div :style="item.background"
                    v-for="item in pic" :key="item.F_Id"
                    class="img">
                        <yd-lightbox-img :src="item.filename"></yd-lightbox-img>
                    </div>
                </yd-lightbox> -->

                <viewer v-if="pic.length>1" class="imgs flex-row">
                    <div :style="item.background"
                    v-for="item in pic" :key="item.F_Id"
                    class="img">
                        <img :src="item.filename" ref="img">
                    </div>
                </viewer>

                <div class="source-address" v-if="item_info.source">
                    <i class="iconfont icon-ico_site margin-rt-026"></i>
                    <span>{{item_info.source}}</span>
                </div>
            </div>
        </div>
        <div class="comment-info-foot flex-row">
            <div @click="$root.share_url(share_page,item_info.f_id)">
                <i class="iconfont icon-31zhuanfa"></i>
                <span>转发</span>
            </div>
            <div @click="show_textarea_action">
                <i class="iconfont icon-tubiaopinglunshu"></i>
                <span>评论</span>
            </div>
            <div :style="item_info.ispraise=='1'?'color:#FF8600':''" @click="praise">
                <i class="iconfont icon-zantianchongxiao"></i>
                <span>赞</span>
            </div>
        </div>
        
        <div class="comment-action">
            <div class="comment-action- flex-row">
                <div :class="active==k?'comment-action-item comment-action-item-':'comment-action-item'" 
                v-for="(item,k) in comment_action_navs" :key="k" @click="change_tab(k)">
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div style="padding-top:46px">
                <commentActionPanel v-show="active==0" type="0" ref="sharePanel"/>
                <commentActionPanel v-show="active==1" @reply="reply" ref="commentActionPanel" type="1"/>
                <commentActionPanel v-show="active==2" type="2" ref="praisePanel"/>
            </div>
        </div>

        <yd-popup v-model="show_textarea" position="bottom">
           <div class="comment-border flex-row">
               <textarea ref="textarea"
               name="" id="textarea" class="comment-textarea" v-model="comment_content"></textarea>
               <div class="comment-post" @click="post_comment('01',$route.query.id,comment_content)">
                   <span class="theme-color">发送</span>
               </div>
           </div>
        </yd-popup>
        <yd-popup v-model="show_textarea_" position="bottom">
           <div class="comment-border flex-row">
               <textarea ref="textarea_s"
               name="" id="textarea-s" class="comment-textarea"
               :placeholder="'回复:'+replier.name"   
               v-model="comment_content_"></textarea>
               <div class="comment-post" @click="post_comment('03',replier.id,comment_content_)">
                   <span class="theme-color">回复</span>
               </div>
           </div>
        </yd-popup>
    </div>
</template>

<script>
// import {Button} from 'vue-ydui/dist/lib.rem/button';
// import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
// import {Popup} from 'vue-ydui/dist/lib.rem/popup';
// @ is an alias to /src
import commentActionPanel from "@/components/comment_action_panel";
export default {
    components:{
        // "yd-button": Button,
        // "yd-tab": Tab,
        // "yd-tab-panel": TabPanel,
        // "yd-popup": Popup,
        commentActionPanel,
    },
    props:{},
    data(){
        return {
            active: 1,
            item_info: {},
            pic: [],
            show_textarea: false,
            comment_content: '',
            show_textarea_: false,
            comment_content_: '',
            replier: {
                id: '',
                name: ''
            },
            show: false
            // textarea_pad: false,
            // comment_action_navs: ['转发','评论','点赞']
        }
    },
    watch:{
        active(n) {
            switch(n) {
                case 0:
                    if(!this.comment_action_navs[n].init) {
                        this.comment_action_navs[n].init = true;
                        this.$refs.sharePanel.init_list('/api/Family/GetShareList');
                    }
                    break;
                case 1:
                     if(!this.comment_action_navs[n].init) {
                        this.comment_action_navs[n].init = true;
                        this.$refs.commentActionPanel.init_list('/api/Family/GetCommentList');
                    }
                    break;
                case 2:
                    if(!this.comment_action_navs[n].init) {
                        this.comment_action_navs[n].init = true;
                        this.$refs.praisePanel.init_list('/api/Family/GetPraiseList');
                    }
                    break;
            }
        },
        show_textarea(n) {
            if(!n) {
                this.comment_content = ''
            }else {
                // this.$refs.textarea.focus(); 
            }
        },
        show_textarea_(n) {
            if(!n) {
                this.comment_content_ = ''
            }else {
                // this.$refs.textarea_s.focus();
            }
        }
    },
    computed:{
        comment_action_navs() {
            return [
                {title:this.item_info.share?'转发'+this.item_info.share:'转发0',init:false},
                {title:this.item_info.comment?'评论'+this.item_info.comment:'评论0',init:true},
                {title:this.item_info.praise?'点赞'+this.item_info.praise:'点赞0',init:false}
                ]
        },
        share_page() {
            let page = {
                logo: this.item_info.headpic,
                name: this.item_info.title,
                des: this.item_info.nickname,
            }
            return page
        }
    },
    methods:{
        line_feed(str) {
            return str.replace(/\n/g,"<br/>")||str.replace(/\r/g,"<br/>")
        },
        show_textarea_action() {
            if(!this.$store.state.user_status.mobile) {
                this.$dialog.toast({
                    mes: '请先登录',
                    timeout: 1000,
                    icon: 'error',
                });
                return false;
            }
            this.$refs.textarea.focus();
            this.show_textarea = true;
        },
        praise() {
            if(!this.$store.state.user_status.mobile) {
                this.$dialog.toast({
                    mes: '请先登录',
                    timeout: 1000,
                    icon: 'error',
                });
                return false;
            }
            let state = '';
            if(this.item_info.ispraise=='0') {
                state = '1'
            }
            if(this.item_info.ispraise=='1') {
                state = '0'
            }
            this.$root.praise('/api/Family/SavePraise',state,this.item_info.f_id,this.item_info.periodcode,this.item_info.F_CreatorUserId,()=>{  

                this.item_info.ispraise = state;
                if(state=='1') {
                    this.item_info.praise = this.item_info.praise+1;
                }else if(state=='0') {
                    this.item_info.praise = this.item_info.praise-1;
                }
                // console.log(this.item_info.praise)
                this.$refs.praisePanel.get_list('save_list','/api/Family/GetPraiseList');
            })
        },
        follow() {
            if(!this.$store.state.user_status.mobile) {
                this.$dialog.toast({
                    mes: '请先登录',
                    timeout: 1000,
                    icon: 'error',
                });
                return false;
            }
            this.$root.follow('/api/Family/SaveFollow',1,this.item_info.F_CreatorUserId,this.item_info.periodcode,this.item_info.nickname,()=>{
                this.$dialog.toast({
                    mes: '关注成功',
                    timeout: 1500,
                    icon: 'success',
                    callback: () => {
                        this.item_info.isfollow = '1';
                    }
                });
            })
        },
        change_tab(k) {
            this.active = k;
        },
        get_comment_info() {
            this.$http.ajax_post('/api/Family/GetFamilyCycleDetail',{
                Id: this.$route.query.id,
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
            },(res)=>{

                this.item_info = res.data.data.baseinfo;

                if(this.$root.isWeiXin()) {
                    this.$root.get_wechat_sign(this.share_page);
                }

                for(let item of res.data.data.pic) {
                    item.style = ''
                }
                
                this.pic = res.data.data.pic;
  
                this.$root.pic_sort(this.pic,(pics)=>{
                    this.pic = pics;
                })
                if(this.pic.length>1) {
                    for(let item of this.pic) {
                        item.background=`background:url('${item.filename}');background-size:cover;background-position:center;`
                    }
                }else if(this.pic.length==1) {
                    this.$nextTick(()=>{
                    this.$refs.img[0].onload= ()=>{  this.$root.getImgNaturalDimensions(this.$refs.img[0],(dimension)=>{
                                if(dimension.w/dimension.h<0.6) {
                                    for(let item of this.pic) {
                                        item.style=`width:2.2rem`;
                                    }
                                }else {
                                    for(let item of this.pic) {
                                        item.style=`width:4rem`;
                                    }
                                }
                            })
                        }  
                    })
                }
            })
        },

        post_comment(type_code,id,content) {
            if(!content) {
                this.$dialog.toast({
                    mes: '请输入信息',
                    timeout: 1000,
                    icon: 'error',
                });
                return false;
            }
            this.$root.post_comment(type_code,id,content,()=>{
                this.item_info.comment = this.item_info.comment+1;
                switch(type_code) {
                    case '01':
                        this.show_textarea = false;
                        break;
                    case '03':
                        this.show_textarea_ = false;
                        break;
                }
                this.$refs.commentActionPanel.get_list('save_list','/api/Family/GetCommentList');
            })
        },
        reply(item) {
            this.$refs.textarea_s.focus();
            this.show_textarea_ = true;
            this.replier={
                id: item.F_Id,
                name: item.commentbynickname
            };
        },
    },
    created(){

    },
    mounted(){
        // this.get_comment_info()
        this.$refs.commentActionPanel.init_list('/api/Family/GetCommentList');
        
    },
    activated() {
        this.get_comment_info()
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper{
    background: #fff;
    
}
.comment-info-top {
    font-size: .34rem;
    color: #1A1A1A;
}
.comment-info-top i {
    font-size: .4rem;
}

.item-info { 
    padding: .18rem .3rem;
    background: #fff;
}
.item-info-top {
    justify-content: space-between;
    margin-bottom: .44rem;
}
.item-info-icon {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    overflow: hidden;
    margin-right: .22rem;
}
.item-info-icon img{
    width: 1rem;
}
.item-info-top-content p {
    text-align: left;
    font-size: .2rem;
    color: #999;
}
.item-info-top-content P:first-child {
    font-size:.3rem;
    margin-bottom:.18rem;
    color: #1A1A1A;
}
.item-info-top-right {
    width: 1rem;
    // height: .58rem;
    // background: #34C3CB;
    // border-radius: 2px;
    // color: #fff;
    // font-size: .26rem;
    // line-height: .58rem;
}

.item-info-text {
    font-size: .3rem;
    margin-bottom: .3rem;
}
.item-info-text p {
    text-align: left;
}

.imgs {
    padding-top: .18rem;
    flex-wrap: wrap;
    margin-right: -.1rem;
}
.img-row {
    position: relative;
    width: 2.22rem;
    // height: 4rem;
    // border-radius: 4px;
    // overflow: hidden;
    // margin-right: .1rem;
    // margin-bottom: .1rem;
}
.min {
    width: 2.22rem;
}
.max {
    width: 4rem;
}
.img-row img {
    width: 100%;
    // height: 100%;
    // opacity: 0;
}
.img {
    width: 2.22rem;
    height: 2.22rem;
    overflow: hidden;
    margin-right: .1rem;
    margin-bottom: .1rem;
}
.img img {
    // width: 100%;
    // height: 100%;
    opacity: 0;
}
.source-address {
    color: #999;
    text-align: left;
}


.comment-info-foot {
    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    padding: 0 .6rem;
    width: 100vw;
    height: .8rem;
    background: #f9f9f9;
    color: #999;
    font-size: .28rem;
    z-index: 1000;
    
}
.comment-info-foot i {
    font-size: .3rem;
    margin-right: .2rem;
}

.comment-action {
    background: #fff;
    position: relative;
}
.comment-action- {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    justify-content: space-around;
    align-items: center;
    color: rgb(153,153,153)
}
.comment-action-item {
    position: relative;
    width: 33.33%;
    height: 46px;
    line-height: 46px;
}
.comment-action-item- {
    color: #34C3CB;
}
.comment-action-item- :after {
    content: '';
    display: block;
    width: 30%;
    position: absolute;
    bottom: 0;
    left: 35%;
    border-bottom: 2px solid #34C3CB;
}

.tab {
    justify-content: space-between;
    padding: 0 .3rem;
}
.tab-panel {
    height: .85rem;
    line-height: .85rem;
    border-bottom: 2px solid transparent; 
}
.tab-panel-active {
    border-bottom: 2px solid #34C3CB;
}


</style>