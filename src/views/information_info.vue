<template>
    <div class="wrapper">
        <div v-if="$store.state.old_version">
        <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span @click="open_htoken">资讯详情</span>
            <yd-icon v-if="item_info.isstore=='0'" name="more" style="padding:0 0 0 .4rem" @click.native="_store_page"></yd-icon>
            <i v-if="item_info.isstore=='1'">&nbsp;</i>
        </div>
        <div class="top-pedestal"></div>
        </div>

        <div style="height: .28rem"></div>
        <div class="head" ref="head">
            <div v-if="item_info.title" class="title font-weight">
                <span>{{item_info.title}}</span>
            </div>
            <div v-else class="headstone margin-bt-04" style="width:100%;height:.4rem;border-radius:.4rem"></div>
            <div v-if="item_info.F_CreatorTime" class="date">
                <span class="margin-rt-026">{{$root.transform_time(item_info.publishdate)}}</span>
                <img class="click-num-icon" src="../assets/eye.png" alt="">
                <span class="click-num">
                    {{item_info.clicksnum}}
                </span>
            </div>
            <div v-else class="headstone" style="width:1.5rem;height:.24rem;border-radius:.24rem"></div>
        </div>

        <!-- <img id="test" src="../assets/empty.jpg" alt="" width="640" height="480"> -->
        <div v-if="item_info.content" class="v-html" ref="v_html" v-html="item_info.content"></div>
        <div v-else class="v-html">
            <div class="headstone margin-bt-01" style="width:calc(100% - .48rem);height:.24rem;border-radius:.24rem;margin-left:.48rem"></div>
            <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;" v-for="(item,k) in new Array(2)" :key="k"></div>
            <div v-for="(item,k) in new Array(3)" :key="k+'d'">
                <div style="height:.24rem"></div>
                <div class="headstone margin-bt-01" style="width:calc(100% - .48rem);height:.24rem;border-radius:.24rem;margin-left:.48rem"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;" v-for="(item,index) in new Array(6)" :key="index+k+'d'"></div>
            </div>
        </div>
        <div class="statement">
            <p>免责声明：著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处</p>
        </div>
        <!-- <iframe id="iFrame" ref="" :src="iframe_url" frameborder="0" width="100%" height="2500px" scrolling=no></iframe> -->
        <!-- <div style="height:80vh"></div> -->
        <div style="background:#ebf0f2;height:.2rem"></div>
        <aboutNews/>
        <div class="comment-info-foot flex-row">

            <div @click="$root.share_url(share_page,item_info.F_Id)" v-if="$store.state.old_version">
                <i class="iconfont icon-31zhuanfa" :style="item_info.isstore=='0'?'':'color:#FF8600'"></i>
                <span>转发</span>
            </div>
            <div v-else :style="item_info.isstore=='0'?'':'color:#FF8600'" @click="_store_page">
                <i class="iconfont icon-star"  style="font-size:.4rem;"></i>
                <span>收藏</span>
            </div>
            <div @click="click_show_textarea">
                <i class="iconfont icon-pinglun" style="font-size:.4rem;"></i>
                <span>评论</span>
            </div>
            <div :style="item_info.ispraise=='1'?'color:#FF8600':''" @click="praise">
                <i class="iconfont icon-zantianchongxiao" style="font-size:.3rem;"></i>
                <span>赞</span>
            </div>
        </div>
        
        <div style="background:#ebf0f2;height:.2rem"></div>
        <div class="comment-action">
           <div class="comment-action- flex-row">
                <div :class="active==k?'comment-action-item comment-action-item-':'comment-action-item'" 
                v-for="(item,k) in comment_action_navs" :key="k" @click="change_tab(k)">
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div style="padding-top:46px" v-if="comment_action_state">
                <commentActionPanel v-show="active==0" type="0" ref="sharePanel"/>
                <commentActionPanel v-show="active==1" @reply="reply" ref="commentActionPanel" type="1"/>
                <commentActionPanel v-show="active==2" type="2" ref="praisePanel"/>
            </div>
        </div>
        <!-- <div style="height:20vh"></div> -->
        <yd-popup v-model="show_textarea" position="bottom">
           <div class="comment-border flex-row">
               <textarea ref="textarea"
               name="" id="textarea" class="comment-textarea" v-model="comment_content"></textarea>
               <div class="comment-post" @click="post_comment('02',$route.query.id,comment_content)">
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
        <yd-popup v-model="show_window" position="bottom" height="3rem">
            <div class="window-title">确定收藏此页面？</div>
            <div class="window-btn" @click="store_page">
                <span>确定</span>
            </div>
            <div style="background: #eee;height:.1rem"></div>
            <div class="window-btn" @click="show_window=false">
                <span>取消</span>
            </div>
        </yd-popup>

    </div>
</template>

<script>
import aboutNews from "@/components/about_news";
import commentActionPanel from "@/components/comment_action_panel";
export default {
    components:{
        commentActionPanel,
        aboutNews
    },
    props:{},
    data(){
        return {
            active: 1,
            item_info: {},
            show_textarea: false,
            comment_content: '',
            show_textarea_: false,
            comment_content_: '',
            replier: {
                id: '',
                name: ''
            },
            comment_action_state: true,
            // textarea_pad: false,
            show_window: false
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
                this.comment_content = '';
            }else {
                this.$refs.textarea.focus();
            }
        },
        show_textarea_(n) {
            if(!n) {
                this.comment_content_ = '';
            }else {
                this.$refs.textarea_s.focus();
            }
        },
        $route: {
            deep: true,
            handler: function(n) {
                console.log('ee')
                if(n.name=='information_info') {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    this.get_information();
                    this.comment_action_state = false;
                    this.active = 1;
                    this.comment_action_state = true;
                       
                    for(let i=0;i<this.comment_action_navs.length;i++){
                        if(i!=1) {
                            this.comment_action_navs[i].init = false;
                        }else {
                            this.comment_action_navs[i].init = true;
                        }
                    }
                    this.$nextTick(()=>{
   
                        console.log(this.$refs.commentActionPanel)
                         this.$refs.commentActionPanel.init_list('/api/Family/GetCommentList');
                    })
                }
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
                logo: this.$store.state.logo,
                name: this.item_info.title,
                des: this.item_info.source
            }
            return page
        }
    },
    methods:{

        init_share() {
            this.$store.commit('updataShare',{page:this.share_page,id:this.item_info.F_Id,type_id:this.item_info.periodcode});
        },
        init_nav() {
            let host = window.location.href.split('#')[0];
            console.log(this.$store.state.share)
            if(this.$root._IsIOS()) {
                this.$IOS.getNavInfo(true,'资讯详情',1,'','#000000',host+'icon/icon_share.png','shareUrl()')
            }else if(this.$root._IsAndroid()) {
                try{
                    android.getNavInfo(true,'资讯详情',1,'','#000000',host+'icon/icon_share.png','shareUrl()')
                }catch(err){
                    console.log(err)
                }
            }
        },

        open_htoken() {
            if(this.$root.share_url_=='http://share.xcc-edu.com/?#') {
                return false;
            }
            this.$store.commit('updataHtokenShow',!this.$store.state.htoken_show)
        },
        click_show_textarea() {

            this.$refs.textarea.focus();
            this.show_textarea = true;
        },
        // click_show_textarea_() {
        //     this.$refs.textarea_s.focus();
        //     this.show_textarea_ = true;
        // },
        _store_page() {
            this.show_window = true;
        },
        store_page() {
            this.$http.ajax_post('/api/Family/SaveStore',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                Id: this.$route.query.id,
                ObjectCode:this.item_info.periodcode
            },()=>{
                this.$dialog.toast({
                    mes:'收藏成功',
                    timeout: 1000,
                    callback: ()=>{
                        this.show_window = false;
                        this.item_info.isstore = '1';
                    }
                })
            })
        },
        praise() {

            let state = '';
            if(this.item_info.ispraise=='0') {
                state = '1'
            }
            if(this.item_info.ispraise=='1') {
                state = '0'
            }
            let user_id = '';
            if(this.$store.state.wechat) {
                user_id = window.location.href.split('user=')[1].split(',')[2];
            }else {
                user_id = this.item_info.F_CreatorUserId
            }
            this.$root.praise('/api/Family/SavePraise',state,this.item_info.F_Id,this.item_info.periodcode,user_id,()=>{
                this.item_info.ispraise = state;
                if(state=='1') {
                    this.item_info.praise = this.item_info.praise+1;
                }else if(state=='0') {
                    this.item_info.praise = this.item_info.praise-1;
                }
                this.$refs.praisePanel.get_list('save_list','/api/Family/GetPraiseList');
            })
        },
        change_tab(k) {
            this.active = k;
        },

        post_comment(type_code,id,content) {
            this.$root.post_comment(type_code,id,content,()=>{
                this.show_textarea = false;
                this.$refs.commentActionPanel.get_list('save_list','/api/Family/GetCommentList');
            })
        },
        reply(item) {
            this.show_textarea_ = true;
            // this.$refs.textarea_s.focus();
            this.replier={
                id: item.F_Id,
                name: item.commentbynickname
            };
        },
        get_information() {
            this.$http.ajax_post('/api/Information/GetInformationDetail',{
                Id: this.$route.query.id,
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
            },(res)=>{
                
                this.item_info = !res.data.data.baseinfo[0]?{}:res.data.data.baseinfo[0];
                this.init_share();
                if(this.$root.isWeiXin()) {
                    this.$root.get_wechat_sign(this.share_page);
                }
                this.$nextTick(()=>{
                    // document.getElementsByTagName('img')
                    let dom = $('.v-html').find('img');

                    for(let i=0;i<dom.length;i++) {
                        let item = dom[i];
                        item.arr = item.src.split('/')
                        item.src='http://223.84.156.187:807/loding.png';
              
                        if(item.arr[2]!='img.baidu.com') {
                            item.arr[2] = this.$root.img_url.split('//')[1];
                            // item.style.width = (document.body.clientWidth - 0.3*48*2) + 'px';
                            item.style.width="100%";
                            item.onload=() => {
                                this.$root.getImgNaturalDimensions(item,(dimension)=>{
                                    // if(dimension.w<=350) {
                                    //     item.style.width = dimension.w+'px';
                                    //     console.log(item,dimension.w)
                                    // }
                                })
                            }
                        }else {
                            item.style="width:25px;"
                        }
                        $(item).data('original',item.arr.join('/'))
                        $(item).lazyload();
                    }
                })
            })
        }
    },
    created(){
        
    },
    mounted(){
        // console.log('info')
        // this.get_information();
        
        this.get_information();
        if(this.comment_action_state) {
            this.$refs.commentActionPanel.init_list('/api/Family/GetCommentList');
        }
       
    },
    activated() {
        this.init_nav();

        console.log('info')
        // this.get_information();
        // this.$refs.commentActionPanel.init_list('/api/Family/GetCommentList');
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
    line-height: 1rem;
}
.nav i {
    padding-right:1rem;
    font-size: .4rem;
}

.head {
    padding: .3rem;
    background: #fff;
}
.title {
    font-size: .4rem;
    margin-bottom: .4rem;
}
.date {
    color: #999;
    // line-height: 22px;
}
.click-num-icon {
    vertical-align: top;
    width: .35rem;
}
.v-html {
    background:#fff;
    padding: .3rem;
    overflow: hidden;
}
.statement {
    color: #999;
    padding: 0 .3rem .3rem .3rem;
    background: #fff;
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
    text-align: center;
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