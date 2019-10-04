<template>
    <div class="wrapper-course" v-if="course_info.F_Id">
        <div class="top" style="background:#34C3CB"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="back_organization"></i>
            <div class="nav-action">

                <i v-show="course_info.ispraise=='0'" class="iconfont icon-xiaolian" @click="praise"></i>
                <i v-show="course_info.ispraise=='1'" class="iconfont icon-xiaolian1" style="color:#FFE400" @click="praise"></i>
                
                <i class="iconfont icon-pinglun" @click="show_textarea=true"></i>
                <i class="iconfont icon-fenxiang-1"></i>
            </div>
        </div>
        <div class="top-pedestal"></div>
        <div class="select-view flex-row">
            <div @click="view_type('content')" 
            :class="content_or_comment=='content'?'select-view-item select-view-item-active':'select-view-item'"><span>课程详情</span></div>
            <div @click="view_type('comment')" 
            :class="content_or_comment=='comment'?'select-view-item select-view-item-active':'select-view-item'"><span>课程评论</span></div>
        </div>
        <div v-if="content_or_comment=='content'" class="course-content">
            <div class="course-content-head">
                <div class="course-class-name">
                    <span>{{course_info.coursename}}</span>
                </div>
                <div class="price flex-row">
                    <div class="price">
                        <span>折扣价</span>
                        <span>￥{{course_info.price}}起</span>
                    </div>
                    <div v-if="course_info.costprice" class="cost-price">原价 ￥{{course_info.costprice}}</div>
                </div>
            </div>
            <div class="course-content-unit flex-row">
                <div class="course-content-unit-left">
                    <i class="iconfont icon-fenlei"></i>
                    <span>科目</span>
                </div>
                <div class="course-content-unit-right">
                    <span>{{course_info.courseclasscode}}</span>
                </div>
            </div>
            <div class="course-content-unit flex-row">
                <div class="course-content-unit-left">
                    <i class="iconfont icon-fenlei"></i>
                    <span>班型</span>
                </div>
                <div class="course-content-unit-right">
                    <span v-if="course_info.classsize">{{course_info.classsize}}</span>
                    <span v-else>--</span>
                </div>
            </div>
            <div class="course-content-unit flex-row">
                <div class="course-content-unit-left">
                    <i class="iconfont icon-yonghu"></i>
                    <span>适合对象</span>
                </div>
                <div class="course-content-unit-right">
                    <span>{{course_info.agreewith}}</span>
                </div>
            </div>
            <div class="course-content-unit flex-row">
                <div class="course-content-unit-left">
                    <i class="iconfont icon-shijian"></i>
                    <span>课时</span>
                </div>
                <div class="course-content-unit-right">
                    <span>{{course_info.courseperiod}}课时</span>
                </div>
            </div>
            <div class="time-address-wrapper">
                <div class="time-address">
                    <div class="time-address-title">
                        <i class="iconfont icon-shijian"></i>
                        <span>上课时间</span>
                    </div>
                    <div class="time-address-info">
                        <span>{{course_info.schooltime}}</span>
                    </div>
                </div>
                <div class="time-address">
                    <div class="time-address-title">
                        <i class="iconfont icon-ico_site"></i>
                        <span>上课地点</span>
                    </div>
                    <div class="time-address-info">
                        <span>{{course_info.schoolplace}}</span>
                    </div>
                </div>
            </div>
            <div class="course-info">
                <div class="course-info-title">
                    <i class="iconfont icon-shuxingliebiaoxiangqing2"></i>
                    <span>课程内容</span>
                </div>
                <div class="course-info-content">
                    <span>{{course_info.des}}</span>
                </div>
            </div>
        </div>
        <div v-else class="course-comment flex-row">
            <!-- <div>   
                <img src="../assets/empty.jpg" alt="">
                <p>空空如也~</p>
                <p>点击右上角评论图标新增评论~</p>
            </div> -->
            <commentActionPanel type='1' @reply="reply" :courseId='course_info.F_Id' ref="commentActionPanel"/>
        </div>
        <div class="course-action flex-row">
            <div class="course-action-left" @click="$root.future">
                <i class="iconfont icon-dianhua"></i>
                <span>咨询</span>
            </div>
            <div class="course-action-right" @click="$root.future">
                <span>立即报名</span>
            </div>
        </div>

        <yd-popup v-model="show_textarea" position="bottom">
           <div class="comment-border flex-row" :style="textarea_pad&&$root._IsAndroid()?'padding-bottom:40vh':''">
               <textarea v-on:focus="textarea_pad = true;" 
               name="" id="textarea" class="comment-textarea" v-model="comment_content"></textarea>
               <div class="comment-post" @click="post_comment('05',course_info.F_Id,comment_content)">
                   <span class="theme-color">发送</span>
               </div>
           </div>
        </yd-popup>
        <yd-popup v-model="show_textarea_" position="bottom">
           <div class="comment-border flex-row" :style="textarea_pad&&$root._IsAndroid()?'padding-bottom:40vh':''">
               <textarea  v-on:focus="textarea_pad = true;"
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
import commentActionPanel from "@/components/comment_action_panel";
export default {
    components:{
        commentActionPanel
    },
    props:{
        
    },
    data(){
        return {
            course_info: {},
            content_or_comment: 'content',
            show_textarea: false,
            textarea_pad: false,
            comment_content: '',
            show_textarea_: false,
            comment_content_: '',
            replier: {}
            
        }
    },
    watch:{
        show_textarea(n) {
            if(!n) {
                this.comment_content = ''
            }else {
                this.textarea_pad = false;
            }
        },
        show_textarea_(n) {
            if(!n) {
                this.comment_content_ = ''
            }else {
                this.textarea_pad = false;
            }
        }
    },
    computed:{},
    methods:{
        back_organization() {
            this.$router.back()
        },
        view_type(text) {
            this.content_or_comment = text;
        },
        praise() {
            let state = '';
            if(this.course_info.ispraise=='0') {
                state = '1'
            }
            if(this.course_info.ispraise=='1') {
                state = '0'
            }
            this.$root.praise('/api/Family/SavePraise',state,this.course_info.F_Id,'','',()=>{  
                this.course_info.ispraise = state;
                // if(state=='1') {
                //     this.course_info.praise = this.course_info.praise+1;
                // }else if(state=='0') {
                //     this.course_info.praise = this.course_info.praise-1;
                // }
                // this.$refs.praisePanel.get_list('save_list','/api/Family/GetPraiseList');
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
                if(type_code=='05') {
                    this.show_textarea = false;
                }else if(type_code=='03') {
                    this.show_textarea_  = false;
                }
                this.$refs.commentActionPanel.get_list('save_list','/api/Family/GetCommentList');
                
            },()=>{
                this.$dialog.toast({
                    mes: '发送失败',
                    timeout: 1000,
                    icon: 'error',
                });
            })
        },
        reply(item) {
            this.show_textarea_ = true;
            this.replier={
                id: item.F_Id,
                name: item.commentbynickname
            };
        },
    },
    created(){
        this.$root.init_nav();
    },
    mounted(){
    //    window.scrollTo(0,2);
    //    this.course_info = this.$route.params.course_info;
    },
    activated() {
       window.scrollTo(0,2);
       this.course_info = this.$route.params.course_info;
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper-course{
    color: #1A1A1A;
    background: #ebf0f3;
    min-height: 100vh;
}
.nav- {
    // padding: .7rem .6rem .26rem .3rem;
    background: #34C3CB;
    justify-content: space-between;
    color: #fff;
}
.nav- > i {
    font-size: .34rem;
}
.nav-action > i {
    font-size: .42rem;
}
.nav-action > i:active {
    opacity: .7;
}
.nav-action i:nth-child(3) {
    margin: 0 .66rem 0 .76rem;
}

.select-view {
    height: .8rem;
    background: #fff;
}
.select-view-item {
    width: 50%;
    text-align: center;
    line-height: .8rem;
}
.select-view-item-active {
    border-bottom: 2px solid #34C3CB;
    color: #34C3CB;
}

.course-content {
    margin: .2rem .3rem;
    padding-bottom: 1.2rem;
}
.course-content > div {
    background: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 4px 2px rgba(117, 117, 117, 0.07);
    padding: 0 .26rem;
    margin-bottom: .2rem;
}
.course-content-head div {
    height: .92rem;
    line-height: .92rem;
}
.course-class-name {
    font-size: .34rem;
    color: #666;
    text-align: left;
}
.course-content-head > div:first-child {
    border-bottom: 1px solid #f2f2f2;
}
.price {
    justify-content: space-between;
    align-items: center;
    font-size: .3rem;
    color: #FF8600;
}
.cost-price {
    color: #8f8f8f;
    font-size: .26rem;
}

.course-content-unit {
    justify-content: space-between;
    align-items: center;
    height: 1.04rem;
}
.course-content-unit-left {
    font-size: .34rem;
    color: #8F8F8F;
}
.course-content-unit-left i {
    color: #34C3CB;
    margin-right:.2rem;
    font-size: .36rem;
}
.course-content-unit-right {
    font-size: .26rem;
    color: #BCBCBC
}


.time-address-wrapper > div:first-child {
    border-bottom: 1px solid #F2F2F2
}
.time-address {
    padding: .2rem 0; 
    text-align: left;
}
.time-address-title {
    font-size: .34rem;
    color: #8F8F8F;
}
.time-address-title i {
    color: #34C3CB;
    margin-right:.2rem;
    font-size: .36rem;
}
.time-address-info {
    padding-top: .2rem;
    color: #666666
}

.course-info {
    text-align: left;
}
.course-info-title {
    font-size: .34rem;
    color: #8F8F8F;
    padding: .2rem 0;
}
.course-info-title i {
    color: #34C3CB;
    margin-right:.2rem;
    font-size: .36rem;
}
.course-info-content {
    color: #666666;
    padding-bottom: .2rem; 
}

.course-action {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: .98rem;
    background: #fff;
}
.course-action div {
    width: 50%;
    line-height: .98rem;
    // text-align: center;
    font-size: .34rem;
    color: #fff;
}
.course-action div:active {
    opacity: .7;
}
.course-action-left {
    color: #A8A8A8!important;
}
.course-action-left i {
    margin-right: .2rem;
}
.course-action-right {
    background: #34C3CB;
}

.course-comment {
    margin: .2rem 0;
    min-height: calc(100vh - 3.48rem);
    background: #fff;
}
.course-comment img {
    width: 2.6rem;
    margin-bottom: .4rem;
}
.course-comment p {
    margin-bottom: .2rem;
    color: #34C3CB;
    font-size: .26rem;
}


</style>