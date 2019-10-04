<template>
    <div class="wrapper">
        <!-- <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$router.back()"></i>
            <span>详情</span>
            <i>&nbsp;</i>
        </div>
        <div class="top-pedestal"></div> -->
        <div class="question">
            <div class="question-title">
                <span>{{replyinfo.title}}</span>
            </div>
            <!-- <div class="question-man flex-row">
                <div class="icon" :style="'background:url(' + replyinfo.headpic + ') center center /cover'"></div>
                
                <div class="name">
                    <span>{{replyinfo.nickname}}</span>
                </div>
            </div>
            <div class="question-content">
                <span>{{replyinfo.content}}</span>
            </div> -->

            <div class="question-action flex-row">
                <div class="question-state">
                    <span>{{replyinfo.followcount}}关注</span>
                    <span>{{replyinfo.replycount}}回答</span>
                    <span>{{$root.transform_time(replyinfo.publictime)}}</span>
                </div>
                <div class="question-btn" @click="$root.to_open_app">
                    <span>我来回答</span>
                </div>
            </div>
            <div class="question-label flex-row">
                <yd-button type="hollow" color="#808080" shape="circle" style="margin: 0 .2rem .2rem 0" v-for="(item,k) of replyinfo.label" :key="k">{{item}}</yd-button>
            </div>
        </div>

        <div class="answer">
            <div class="answer-man flex-row">
                <div class="flex-row" style="align-items: center;">
                    <div class="icon-" :style="'background:url('+replyinfo.headpic+') center center /cover;'"></div>
                    <div class="name">{{replyinfo.nickname}}</div>
                </div>
                <yd-button type="primary" bgcolor="#34C3CB" color="#fff" @click.native="$root.to_open_app">关注</yd-button>
            </div>
            <div class="answer-info">
                <span>{{replyinfo.content}}</span>
            </div>
            <div class="answer-state">
                <span>{{replyinfo.prizesnum}}赞同</span>
                <span>{{replyinfo.commentsnum}}评论</span>
                <span>{{$root.transform_time(replyinfo.F_CreatorTime)}}</span>
            </div>
        </div>
        <div style="background:#fff;">
            <div class="comment-title">
                <span>评论</span>
                <span>({{replyinfo.commentsnum}}条)</span>
            </div>
        </div>
        <div class="comment">
            <yd-infinitescroll :callback="get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
                <div class="comment-item flex-row"
                v-for="item in list" :key="item.main.F_Id">
                    <div class="icon" :style="'background:url('+item.main.headpic+') center center /cover'"></div>
                    <div class="comment-item-content">
                        <p style="margin-bottom: .08rem;">{{item.main.nickname}}</p>
                        <p style="color:#999;font-seize:.2rem">{{$root.transform_time(item.main.commentdate)}}</p>
                        <p class="margin-bt-03" style="margin-top:.18rem;">{{item.main.content}}</p>
                        <ul class="comment-item-return" v-if="item.list.length>0">
                            <li class="comment-item-return-item flex-row"
                            v-for="(item_,k) in item.list" :key="k">
                                <div class="icon-second">
                                    <img :src="item_.commentbyheadpic" alt="">
                                </div>
                                <div class="icon-second-right">
                                    <p class="theme-color" style="margin-bottom: .08rem;">{{item_.commentbynickname}}</p>
                                    <p style="color:#999;font-seize:.2rem">{{$root.transform_time(item_.commentdate)}}</p>
                                    <p style="margin-top:.18rem;">
                                        <span>回复</span>
                                        <span class="theme-color">{{item_.receivebyname}}</span>
                                        <span>:{{item_.content}}</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </yd-list>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-infinitescroll>
        </div>

        <div class="comment-info-foot flex-row" @click="$root.to_open_app">
            <div>
                <i class="iconfont icon-31zhuanfa"></i>
                <span>转发</span>
            </div>
            <div>
                <i class="iconfont icon-tubiaopinglunshu"></i>
                <span>评论</span>
            </div>
            <div>
                <i class="iconfont icon-zantianchongxiao"></i>
                <span>赞</span>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    components:{
        
    },
    props:{},
    data(){
        return {
            page: 1,
            page_size: 10,
            replyinfo: {},
            list: []
        }
    },
    watch:{},
    computed:{
        share_page() {
            let page = {
                logo: this.replyinfo.headpic,
                name: this.replyinfo.title,
                des: this.replyinfo.content
            }
            return page
        }
    },
    methods:{
        init_replyinfo(res) {
            res.data.data.replyinfo.label = [];
            for(let item of res.data.data.replyinfo.name.split(',')) {
                if(item){
                    res.data.data.replyinfo.label.push(item)
                }
            }
            this.replyinfo = res.data.data.replyinfo;
            if(this.$root.isWeiXin()) {
                this.$root.get_wechat_sign(this.share_page);
            }
        },
        get_list() {
            console.log('sss')
            this.$http.ajax_post('/api/familyask/GetFamilyAnswerDetail',{
                CurrentPage: this.page++,
                PageSize: this.page_size,
                Id: this.$route.query.id,
                Mobile: this.$store.state.user_status.mobile
            },(res)=>{
                if(this.page == 2) {
                    this.init_replyinfo(res);
                }
                this.list = [...this.list,...res.data.data.datalist];
                if (res.data.data.datalist.length<this.page_size) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');  
            })
        }
    },
    created(){},
    mounted(){
        // this.get_list();
        // this.$refs.commentActionPanel.init_list('/api/Family/GetCommentList')
    },
    activated() {
        this.page = 1;
        this.list = [];
        this.get_list();
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper {
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
// 问题描述
.question {
    margin-bottom: .2rem;
    padding: .3rem;
    background: #fff;
}
.question-title {
    margin-bottom: .3rem;
    font-size: .38rem;
    color: #1A1A1A;
    text-align: justify;
}
.question-man {
    margin-bottom: .2rem;
}
.icon- {
    margin-right: .16rem;
    width: .44rem;
    height: .44rem;
    border-radius: .44rem;
}
.name {
    font-size: .28rem;
    color: #1a1a1a;
}
.question-content {
    margin-bottom: .2rem;
    text-align: justify;
}
.question-btn {
    position: absolute;
    right: 0;
    top: .4rem;
    padding: 0 .32rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: .8rem;
    background: linear-gradient(to right,#40D6BE,#34C3CB);
    color: #fff;
    
}

.question-state {
    line-height: .6rem;
}
.question-state span, .answer-state span {
    margin-right: .3rem;
    font-size: .24rem;
    color: #999999;
}
.question-action {
    position: relative;
    justify-content: space-between;
    margin-bottom: .2rem;
}
.question-label {
    justify-content: flex-start;
    flex-wrap: wrap;
    width: calc(100% - 1.7rem);
}


// 回答
.answer {
    padding: .3rem;
    background: #fff;
}
.answer-man {
    justify-content: space-between;
    align-items: center;
    margin-bottom: .3rem;
}
.answer-man div {
    line-height: .6rem;
}
.answer-info {
    margin-bottom: .28rem;
    font-size: .28rem;
    color: #1a1a1a;
}

// 评论
.comment-title {
    padding: .3rem 0;
    margin-left: .3rem;
    border-bottom: 1px solid #E6E6E6;
    font-size: .38rem;
    color: #1a1a1a;
}
.comment-title span:first-child {
    font-weight: 700;
}
.comment-title span:nth-child(2) {
    color: #808080;
}
.comment {
    padding: .3rem;
    background: #fff;
    margin-bottom: 1rem;
    text-align: justify;
}
.comment-item {
    padding-bottom: .2rem;
}
.icon {
    width: .8rem;
    height: .8rem;
    margin-right: .2rem;
    overflow: hidden;
    border-radius: .8rem;
}
.icon img {
    width: 100%;
}
.comment-item-content {
    padding: .16rem .3rem .3rem 0;
    border-bottom: 1px solid #E6E6E6;
    width: calc(100% - 1rem)
}
.comment-item:last-child .comment-item-content {
    border-bottom: 1px solid transparent;
}
.comment-item-return {
    padding: .2rem;
    background: #EBF0F2;
}
.icon-second {
    width: .6rem;
    height: .6rem;
    margin-right: .22rem;
    overflow: hidden;
    border-radius: .6rem;
}
.comment-item-return-item {
    margin-bottom: .18rem;
}
.icon-second img {
    width: 100%;
}
.icon-second-right {
    padding: .04rem .3rem .3rem 0;
    border-bottom: 1px solid #E6E6E6;
    width: calc(100% - .82rem)
}
.comment-item-return-item:last-child .icon-second-right {
    border-bottom: 1px solid transparent;
}

.item {
    margin-bottom: .2rem;
}
.item-name {
    width: calc(100% - 1rem);
    padding-bottom: .2rem;
    border-bottom: 1px solid #eee
}
.item-name-date {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
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

</style>